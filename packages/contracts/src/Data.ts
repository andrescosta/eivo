export type ID = string;
export class Data {
  id!: ID;
}
export class LabeledData extends Data {
  name?: string;
  description?: LvDescription;
}
export class LvDescription {
  short?: string;
  long?: string;
}
