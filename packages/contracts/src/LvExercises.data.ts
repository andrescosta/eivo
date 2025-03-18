export class LvExercises {
  public Kind!: string;
  public Description!: string;
  public Collection?: Array<LvExercisee>;
}

export class LvExercisee {
  public Description!: string;
  public Items?: Array<LvExerciseItem>;
}

export class LvExerciseItem {
    Data!: Record<string, any>;
}

export class LvExerciseItemResponse {
    Data!: Record<string, any>;
}
