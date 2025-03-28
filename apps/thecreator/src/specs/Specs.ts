export class SpecBase {
  kind!: string;
  name!: string;
  constructor(data: Partial<SpecBase>) {
    Object.assign(this, data);
  }
}

export class MakerSpec extends SpecBase {
  type?: string;
  prompt!: string;
  steps!: Step[];
  constructor(data: Partial<MakerSpec>) {
    super(data);
    Object.assign(this, data);
  }
}
export type Step = ForEachStep | SimpleStep;
export class SimpleStep {
  name?: string;
  prompt!: string;
  schema!: string;
}

export class ForEachStep {
  name?: string;
  forEach!: ForEach;
}

export class ForEach {
  col!:string;
  steps!: Step[];
}
export class SchemaSpec extends SpecBase {
  spec!: Map<string, Record<string, string | number | object>>;
  constructor(data: Partial<SchemaSpec>) {
    super(data);
    Object.assign(this, data);
  }
}
