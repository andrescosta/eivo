import * as yaml from 'js-yaml';
import { MakerSpec, SchemaSpec, SpecBase } from './Specs';


export function parse(specString: string): [MakerSpec, Map<string, SchemaSpec>] {
  try {
    const specs = new SpecsForMaking();
    yaml.loadAll(specString, (p) => {
      specs.push(p);
    });
    return specs.get();
  } catch (error) {
    console.error('YAML deserialization error:', error);
    throw error;
  }
}

class SpecsForMaking {
  private schemas = new Map<string, SchemaSpec>();
  private maker?: MakerSpec | null;
  private static CLASS_MAP: { [key: string]: new (data: any) => SpecBase } = {
    schema: SchemaSpec,
    maker: MakerSpec,
  };
  
  push(obj: any) {
    const spec = SpecsForMaking.newSpec(obj);
    if (spec.kind == 'maker') {
      if (this.maker == null) {
        this.maker = spec as MakerSpec;
      } else {
        throw new Error('More than one maker');
      }
    } else {
      this.schemas.set(spec.name,spec as SchemaSpec);
    }
  }

  get(): [MakerSpec, Map<string, SchemaSpec>] {
    if (this.maker == null) {
      throw new Error('No maker present');
    }
    return [this.maker, this.schemas];
  }

  private static newSpec(data: any): SpecBase {
    if (!data.kind) {
      throw new Error('Object must have a "kind" property');
    }
    const kind = (data.kind as string).toLowerCase();
    const ClassConstructor = SpecsForMaking.CLASS_MAP[kind];
    if (!ClassConstructor) {
      throw new Error(`Unknown kind: ${kind}`);
    }
  
    return new ClassConstructor(data);
  }
}
