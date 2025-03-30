export type AnyDef = Map<string, Record<string, string | number | object>>;

export abstract class Spec {
  protected abstract kind: string;
  public metadata!: Metadata;
  constructor(data: Partial<Spec>) {
    Object.assign(this, data);
  }
  public specKind() {
    return this.kind;
  }
}
export abstract class SpecWithLabels extends Spec {
  public labels!: Array<Label>;
  constructor(data: Partial<SpecWithLabels>) {
    super(data);
    Object.assign(this, data);
  }
}

export class Metadata {
  public name!: string;
  public namespace?: string;
  public learn?: Learn;
  public cache?: Cache;
  public entity?: string;
  public output?:boolean;
}
export class Cache {
  public enabled!: boolean;
}
export class Learn {
  public objective!: string;
}

export class Label {
  public culture!: string;
  public title?: string;
  public overview?: string;
  public details?: string;
}

export class Namespace extends Spec {
  protected kind = 'namespace';
  constructor(data: Partial<Namespace>) {
    super(data);
    Object.assign(this, data);
  }
}
export class Schema extends Spec {
  protected kind = 'schema';
  def!: AnyDef;
  constructor(data: Partial<Schema>) {
    super(data);
    Object.assign(this, data);
  }
}

export class Prompt extends Spec {
  protected kind = 'prompt';
  def!: PromptBody;
  constructor(data: Partial<Prompt>) {
    super(data);
    Object.assign(this, data);
  }
}
export class PromptBody {
  prompt!: string;
  schema!: string;
  context?: AnyDef;
}
export class Pipeline extends Spec {
  protected kind = 'pipeline';
  declare public def: PipelineBody;
  constructor(data: Partial<Pipeline>) {
    super(data);
    Object.assign(this, data);
  }
}
export class Loop extends Pipeline {
  protected kind = 'loop';
  declare public def: LoopBody;
  constructor(data: Partial<Pipeline>) {
    super(data);
    Object.assign(this, data);
  }
}
export class PipelineBody {
  context?: AnyDef;
  prompt?: Prompt;
  tasks!: PipelineTask[];
}
export class LoopBody extends PipelineBody {
  param!: string;
}

export type PipelineTask = Pipeline | Prompt;

export class Aggregate extends SpecWithLabels {
  protected kind = 'aggregate';
  def!: AggregateBody;
  constructor(data: Partial<Aggregate>) {
    super(data);
    Object.assign(this, data);
  }
}
export type AggregateBody = Prompt[] | Aggregate[];

// export class MakerSpec extends SpecBase {
//   type?: string;
//   prompt!: string;
//   steps!: Step[];
//   constructor(data: Partial<MakerSpec>) {
//     super(data);
//     Object.assign(this, data);
//   }
// }
// export type Step = ForEachStep | SimpleStep;
// export class SimpleStep {
//   name?: string;
//   prompt!: string;
//   schema!: string;
// }

// export class ForEachStep {
//   name?: string;
//   forEach!: ForEach;
// }

// export class ForEach {
//   col!: string;
//   steps!: Step[];
// }
// export class SchemaSpec extends SpecBase {
//   def!: Map<string, Record<string, string | number | object>>;
//   constructor(data: Partial<SchemaSpec>) {
//     super(data);
//     Object.assign(this, data);
//   }
// }
