export type ID = string;
export class Data {
  id!: ID;
}
export class LabeledData extends Data {
  title!: string;
  overview?: string;
  details?: string;
}
