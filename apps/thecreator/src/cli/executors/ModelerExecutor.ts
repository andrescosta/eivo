import { google } from '@ai-sdk/google';
import { generateObject, LanguageModel } from 'ai';
import { render } from 'mustache';
import { dezerialize } from 'zodex';
import { SpecFactory } from '../../types/SpecLoader';
import { Aggregate, Modeler, PromptDef, Schema, Spec } from '../../types/Specs';
export type model = 'google_gemini' | 'openapi';
const SYSTEM_PROMPT = 'system_prompt';
type VartType = Spec | Spec[];
type ContextType = Spec | Spec[] | string;

export class ModelerExecutor {
  public async execute(
    modeler: Modeler,
    specs: Map<string, Spec>,
  ): Promise<VartType | null> {
    const context = new Map<string, ContextType>();
    // if (objectSpec.def.prompt) {
    //   context.set(SYSTEM_PROMPT, objectSpec.def.prompt.text);
    // }
    return await this.executeModeler(modeler, specs, context);
  }

  protected async executeModeler(
    modeler: Modeler,
    specs: Map<string, Spec>,
    context: Map<string, ContextType>,
  ): Promise<VartType | null> {
    const resultPrompt = await this.executePrompt(
      modeler.def.prompt,
      specs,
      context,
    );
    if (!Array.isArray(resultPrompt)) {
      const newcontext = new Map(context);
      if (resultPrompt != null) {
        newcontext.set(modeler.metadata.name, resultPrompt);
      }
      for (const child of modeler.def.children ?? []) {
        const resModeler = await this.executeModeler(child, specs, newcontext);
        if (resultPrompt instanceof Aggregate && resModeler) {
          resultPrompt.def = Array.isArray(resModeler)
            ? resModeler
            : [resModeler];
        }
      }
    } else {
      for (const resp of resultPrompt) {
        const newcontext = new Map(context).set(
          `${modeler.metadata.name}[]`,
          resp,
        );
        for (const children of modeler.def.children ?? []) {
          const resModeler = await this.executeModeler(
            children,
            specs,
            newcontext,
          );
          if (resp instanceof Aggregate && resModeler) {
            resp.def = Array.isArray(resModeler) ? resModeler : [resModeler];
          }
        }
      }
    }
    return resultPrompt;
  }
  protected async executePrompt(
    prompt: PromptDef,
    specs: Map<string, Spec>,
    context: Map<string, ContextType>,
  ): Promise<VartType | null> {
    try {
      const schema = specs.get(prompt.schema) as Schema;
      if (!schema) {
        throw new Error(`The schema ${prompt.schema} does not exist.`);
      }

      const systemPrompt = context.get(SYSTEM_PROMPT) as string;

      const zodSchema = dezerialize(
        JSON.parse(JSON.stringify(schema.def, null, 2)),
      );

      const promptRendered = render(prompt.text, Object.fromEntries(context));

      const { object } = await generateObject({
        model: this.getLanguageModel(),
        schema: zodSchema,
        system: systemPrompt,
        prompt: promptRendered,
      });

      return Array.isArray(object)
        ? object.map((p) => SpecFactory.build(p))
        : SpecFactory.build(object);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  private getLanguageModel(mdl?: model): LanguageModel {
    switch (mdl) {
      case 'google_gemini':
        return google('gemini-1.5-flash');
      default:
        return google('gemini-1.5-flash');
    }
  }
}
