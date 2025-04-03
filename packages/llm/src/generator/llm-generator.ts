import fg from 'fast-glob';
import fs from 'fs';
import yaml from 'js-yaml';
import { Modeler, Prompt, Spec } from '../spec/specs';
import { SpecFactory } from '../spec/spec-factory';
import { ContextType, DefaultExecutor } from './default-executor';

export type model = 'google_gemini' | 'openapi';

export class LlmGenerator {
  private specs = new Map<string, Spec>();
  private constructor() {}

  public static async build(filePatterns: string[]): Promise<LlmGenerator> {
    const files = await fg.glob(filePatterns, {
      dot: true,
    });
    const exec = new LlmGenerator();
    files.forEach((file) => {
      const c = fs.readFileSync(file, 'utf8');
      yaml.loadAll(c, (content) => {
        const spec = SpecFactory.build(content);
        exec.specs.set(spec.metadata.name, spec);
      });
    });
    return exec;
  }

  public async generate(
    name: string,
    systemPrompt?: string,
    context?: Map<string, ContextType>,
  ): Promise<Spec | Spec[]> {
    if (!name) throw new Error('element required.');
    const spec = this.specs.get(name);
    if (!spec && name) {
      throw new Error(`Spec ${name} does not exist`);
    }
    if (!(spec instanceof Modeler || spec instanceof Prompt)) {
      throw new Error('The spec must a Modeler or Prompt.');
    }

    const res = await new DefaultExecutor(this.specs).execute(
      spec,
      systemPrompt,
      context,
    );
    return res;
  }
}
