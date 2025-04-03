import { Aggregate, Modeler, Prompt, Schema, Spec } from "./specs";

export class SpecFactory {
  private static SPECS_MAP: {
    [key: string]: new (data: Partial<any>) => Spec;
  } = {
    [(new Prompt()).specKind()]: Prompt,
    [(new Schema()).specKind()]: Schema,
    [(new Modeler()).specKind()]: Modeler,
    [(new Aggregate()).specKind()]: Aggregate,
  };

  public static build(data: any): Spec {
    const kind = (data.kind as string)?.toLowerCase();
    if (!kind) {
      throw new Error('Object must have a "kind" property');
    }
    const ClassConstructor = SpecFactory.SPECS_MAP[kind];
    if (!ClassConstructor) {
      throw new Error(`Unknown kind: ${kind}`);
    }
    const res = new ClassConstructor(data);
    return res;
  }
}