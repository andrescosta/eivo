export type AnyDef = Map<string, Record<string, string | number | object>>;

export abstract class Spec {
  protected abstract kind: string;
  metadata!: Metadata;
  constructor(data?: Partial<Spec>) {
    Object.assign(this, data);
  }
  public specKind() {
    return this.kind;
  }
}
export abstract class SpecWithLabels extends Spec {
  labels!: Array<Label>;
  constructor(data?: Partial<SpecWithLabels>) {
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
  public output?: boolean;
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
  constructor(data?: Partial<Namespace>) {
    super(data);
    Object.assign(this, data);
  }
}
export class Schema extends Spec {
  protected kind = 'schema';
  def!: AnyDef;
  constructor(data?: Partial<Schema>) {
    super(data);
    Object.assign(this, data);
  }
}

export class Modeler extends Spec {
  protected kind = 'modeler';
  def!: ModelerBody;
  constructor(data?: Partial<Modeler>) {
    super(data);
    Object.assign(this, data);
  }
}
export class ModelerBody {
  context?: AnyDef;
  prompt!: PromptDef;
  system?: PromptDef;
  children!: Modeler[];
}
export class PromptDef {
  text!: string;
  schema?: string | Schema;
}

export class Prompt extends Spec {
  protected kind = 'prompt';
  def!: PromptBody;
  constructor(data?: Partial<Prompt>) {
    super(data);
    Object.assign(this, data);
  }
}
export class PromptBody {
  prompt!: PromptDef;
  context?: AnyDef;
}
export class Aggregate extends SpecWithLabels {
  protected kind = 'aggregate';
  def!: AggregateBody;
  constructor(data?: Partial<Aggregate>) {
    super(data);
    Object.assign(this, data);
  }
}
export type AggregateBody = Spec[];
