export type AnyData = Record<string, unknown>;

export abstract class Spec {
  protected abstract kind: string;
  metadata!: Metadata;
  constructor(data?: Partial<Spec>) {
    Object.assign(this, data);
    this.metadata = this.metadata ?? ({ name: '', namespace: '' } as Metadata);
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
    this.labels = this.labels ?? [];
  }
}

export class Metadata<T extends AnyData = {}> {
  name!: string;
  namespace!: string;
  extra?: T;
  constructor(data: Partial<Metadata>) {
    const { name, namespace, ...extra } = data;
    this.name = name ?? '';
    this.namespace = namespace ?? '';
    this.extra = (extra ?? {}) as T;
  }
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
export class Schema<T extends AnyData = {}> extends Spec {
  protected kind = 'schema';
  def!: T;
  constructor(data?: Partial<Schema>) {
    super(data);
    Object.assign(this, data);
    this.def = this.def ?? ({} as T);
  }
}

export class Modeler extends Spec {
  protected kind = 'modeler';
  def!: ModelerBody;
  constructor(data?: Partial<Modeler>) {
    super(data);
    Object.assign(this, data);
    this.def = this.def ?? { prompt: { text: '' } as PromptDef, children: [] };
  }
}
export class ModelerBody<T extends AnyData = {}> {
  context?: T;
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
    this.def = this.def ?? { prompt: '' };
  }
}
export class PromptBody<T extends AnyData = {}> {
  prompt!: PromptDef;
  context?: T;
}
export class Aggregate extends SpecWithLabels {
  protected kind = 'aggregate';
  def!: AggregateBody;
  constructor(data?: Partial<Aggregate>) {
    super(data);
    Object.assign(this, data);
    this.def = this.def ?? [];
  }
}
export type AggregateBody = Spec[];
