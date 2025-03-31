import { google } from '@ai-sdk/google';
import { generateObject, LanguageModel } from 'ai';
import { render } from 'mustache';
import { dezerialize } from 'zodex';
import {
  Aggregate,
  Modeler,
  Prompt,
  PromptDef,
  Schema,
  Spec,
} from '../../types/Specs';
import { SpecFactory } from '../../types/SpecFactory';
export type model = 'google_gemini' | 'openapi';
const SYSTEM_PROMPT = 'system_prompt';
type ResultType = Spec | Spec[];
type ContextType = Spec | Spec[];

export class ModelerExecutor {
  public async execute(
    modeler: Modeler,
    specs: Map<string, Spec>,
    systemPrompt?: string,
  ): Promise<ResultType> {
    const context = new Map<string, ContextType>();
    if (systemPrompt) {
      const prompt = specs.get(systemPrompt) as Prompt;
      if (prompt) {
        context.set(SYSTEM_PROMPT, prompt);
      } else {
        console.error(`Warning: System prompt not found.`);
      }
    }
    return await this.executeModeler(modeler, specs, context);
  }

  protected async executeModeler(
    modeler: Modeler,
    specs: Map<string, Spec>,
    context: Map<string, ContextType>,
  ): Promise<ResultType> {
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
    system?: PromptDef,
  ): Promise<ResultType> {
    if (!prompt.schema) return [];
    const schema =
      prompt.schema instanceof Schema
        ? prompt.schema
        : (specs.get(prompt.schema) as Schema);
    if (!schema) {
      throw new Error(`The schema ${prompt.schema} does not exist.`);
    }

    const systemPrompt =
      (context.get(SYSTEM_PROMPT) as Prompt)?.def.prompt.text ?? system?.text;
    const systemPromptRendered = systemPrompt
      ? render(systemPrompt, Object.fromEntries(context))
      : '';
    const promptRendered = render(prompt.text, Object.fromEntries(context));

    const zodSchema = dezerialize(JSON.parse(JSON.stringify(schema.def)));
    const { object } = await generateObject({
      model: this.getLanguageModel(),
      schema: zodSchema,
      system: systemPromptRendered,
      prompt: promptRendered,
    });

    return Array.isArray(object)
      ? object.map((o) => SpecFactory.build(o))
      : SpecFactory.build(object);
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
