import { google } from '@ai-sdk/google';
import { generateObject, LanguageModel } from 'ai';
import { render } from 'mustache';
import { dezerialize } from 'zodex';
import {
  Aggregate,
  AnyData,
  Modeler,
  Prompt,
  PromptDef,
  Schema,
  Spec,
} from '../types/Specs';
import { SpecFactory } from '../types/SpecFactory';
import { model } from './LlmGenerator';

export type ContextType = Spec | Spec[] | AnyData;

const SYSTEM_PROMPT = 'system_prompt';
type Executable = Modeler | Prompt;

export class DefaultExecutor {
  private specs!: ReadonlyMap<string, Spec>;
  constructor(specs: ReadonlyMap<string, Spec>) {
    this.specs = specs;
  }
  public async execute(
    modeler: Executable,
    systemPrompt?: string,
    proContext?: Map<string, ContextType>,
  ): Promise<Spec | Spec[]> {
    const context = new Map(proContext);
    if (systemPrompt) {
      const prompt = this.specs.get(systemPrompt) as Prompt;
      if (prompt) {
        context.set(SYSTEM_PROMPT, prompt);
      } else console.error(`Warning: System prompt not found.`);
    }
    return await this.doExecute(modeler, context);
  }

  protected async doExecute(
    modeler: Executable,
    context: Map<string, ContextType>,
  ): Promise<Spec | Spec[]> {
    const resultPrompt = await this.executePrompt(modeler.def.prompt, context);
    if (modeler instanceof Modeler) {
      if (!Array.isArray(resultPrompt)) {
        const newcontext = new Map(context);
        if (resultPrompt != null) {
          newcontext.set(modeler.metadata.name, resultPrompt);
        }
        for (const child of modeler.def.children ?? []) {
          const resModeler = await this.doExecute(child, newcontext);
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
            const resModeler = await this.doExecute(children, newcontext);
            if (resp instanceof Aggregate && resModeler) {
              resp.def = Array.isArray(resModeler) ? resModeler : [resModeler];
            }
          }
        }
      }
    }
    return resultPrompt;
  }

  protected async executePrompt(
    prompt: PromptDef,
    context: Map<string, ContextType>,
    system?: PromptDef,
  ): Promise<Spec | Spec[]> {
    if (!prompt.schema) return [];
    const schema =
      prompt.schema instanceof Schema
        ? prompt.schema
        : (this.specs.get(prompt.schema) as Schema);
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
