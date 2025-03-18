type MyRecord = Record<string, string | number | object>;
export class LvExercise {
  id!: number;
  kind!: string;
  shortDescription!: string;
  longDescription!: string;

  variations?: MyRecord;
}
