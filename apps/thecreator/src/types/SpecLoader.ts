import * as yaml from 'js-yaml';
import {
  Aggregate,
  Pipeline,
  Prompt,
  Schema,
  Spec,
  PipelineTask,
  Loop,
} from './Specs';

export function load(specString: string): Map<string, Spec> {
  try {
    const specs = new SpecDic();
    yaml.loadAll(specString, (p) => {
      specs.push(p);
    });
    return specs.get();
  } catch (error) {
    console.error('YAML deserialization error:', error);
    throw error;
  }
}

export class SpecDic {
  private specs = new Map<string, Spec>();
  push(obj: any) {
    const spec = SpecFactory.build(obj);
    this.specs.set(spec.metadata.name, spec as Spec);
  }
  get(): Map<string, Spec> {
    return this.specs;
  }
}

export class SpecFactory {
  private static CLASS_MAP: {
    [key: string]: new (data: Partial<any>) => Spec;
  } = {
    prompt: Prompt,
    schema: Schema,
    pipeline: Pipeline,
    aggregate: Aggregate,
    loop: Loop,
  };
  public static build(data: any): Spec {
    if (!data.kind) {
      throw new Error('Object must have a "kind" property');
    }
    const kind = (data.kind as string).toLowerCase();
    const ClassConstructor = SpecFactory.CLASS_MAP[kind];
    if (!ClassConstructor) {
      throw new Error(`Unknown kind: ${kind}`);
    }
    const res = new ClassConstructor(data);
    if (res.specKind() == 'pipeline' || res.specKind() == 'loop') {
      const tasks = new Array<PipelineTask>();
      for (const t of (res as Pipeline).def.tasks) {
        const s = this.build(t);
        if (s instanceof Prompt || s instanceof Pipeline || s instanceof Loop) {
          tasks.push(s);
        } else {
          throw new Error(`Illegal kind for a Pipeline: ${kind}`);
        }
      }
      (res as Pipeline).def.tasks = tasks;
    }
    return res;
  }
}
