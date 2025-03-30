import { google } from '@ai-sdk/google';
import { EivoEntity } from '@eivo/api';
import { generateObject, LanguageModel } from 'ai';
import { dezerialize } from 'zodex';
import { SpecDic, SpecFactory } from '../../types/SpecLoader';
import {
  Aggregate,
  Loop,
  Pipeline,
  Prompt,
  Schema,
  Spec,
} from '../../types/Specs';
import { render } from 'mustache';
export type model = 'google_gemini' | 'openapi';
type VartType = Spec | Spec[];
type DefType = Loop | Pipeline | Prompt;

const SYSTEM_PROMPT = 'system_prompt';

export class PipelineExecutor {
  public async start(
    pipeline: Pipeline,
    specs: Map<string, Spec>,
  ): Promise<VartType | null> {
    const context = new Map<string, VartType>();
    if (pipeline.def.prompt) {
      context.set(SYSTEM_PROMPT, pipeline.def.prompt);
    }
    return await this.executePipeline(pipeline, specs, context);
  }

  protected async execute(
    s: DefType,
    specs: Map<string, Spec>,
    context: Map<string, VartType>,
  ): Promise<VartType | null> {
    switch (true) {
      case s instanceof Loop:
        return await this.executeLoop(s, specs, context);
      case s instanceof Pipeline:
        return await this.executePipeline(s, specs, context);
      case s instanceof Prompt:
        return await this.executePrompt(s, specs, context);
      default:
        throw new Error();
    }
  }

  protected async executePipeline(
    pipeline: Pipeline,
    specs: Map<string, Spec>,
    context: Map<string, VartType>,
  ): Promise<VartType | null> {
    const newcontext = new Map<string, VartType>([...context]);
    const results: Spec[] = [];
    for (const s of pipeline.def.tasks) {
      const res = await this.execute(s, specs, newcontext);
      if (pipeline.metadata.output && res) {
        if (Array.isArray(res)) {
          results.push(...res);
        } else {
          results.push(res);
        }
      }
    }
    return results;
  }
  protected async executeLoop(
    loop: Loop,
    specs: Map<string, Spec>,
    context: Map<string, VartType>,
  ): Promise<VartType | null> {
    const p = context.get(loop.def.param);
    if (!p) {
      throw new Error(`${loop.def.param} does not exists.`);
    }
    if (!Array.isArray(p)) {
      throw new Error(`${loop.def.param} is not an array.`);
    }
    const newcontext = new Map<string, VartType>([...context]);
    for (const e of p) {
      newcontext.set(`${loop.def.param}[]`, e);
      const newnewcontext = new Map<string, VartType>([...newcontext]);
      for (const s of loop.def.tasks) {
        await this.execute(s, specs, newnewcontext);
      }
    }
    return null;
  }
  protected async executePrompt(
    prompt: Prompt,
    specs: Map<string, Spec>,
    context: Map<string, VartType>,
  ): Promise<VartType | null> {
    try {
      const schema = specs.get(prompt.def.schema) as Schema;
      if (!schema) {
        throw new Error(`The schema ${prompt.def.schema} does not exist.`);
      }
      const systemPrompt = context.get(SYSTEM_PROMPT) as Prompt;
      const zodSchema = dezerialize(
        JSON.parse(JSON.stringify(schema.def, null, 2)),
      );
      const promptRendered = render(
        prompt.def.prompt,
        Object.fromEntries(context),
      );

      const { object } = await generateObject({
        model: this.getLanguageModel(),
        schema: zodSchema,
        system: systemPrompt?.def.prompt,
        prompt: promptRendered,
      });

      if (!Array.isArray(object)) {
        const res = SpecFactory.build(object);
        context.set(prompt.metadata.name, res);
        return res;
      } else {
        const ress: Spec[] = [];
        for (const o of object) {
          ress.push(SpecFactory.build(o));
        }
        context.set(prompt.metadata.name, ress);
        return ress;
      }
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
