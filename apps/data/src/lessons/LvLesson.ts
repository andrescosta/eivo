export class LvLesson {
    id!:number;
    description!:string;
    exercises!:Array<LvExercise>;
}

export class LvExercise{
    id!:number;
    kind!:string;
    shortDescription!:string;
    longDescription!:string;
    variations?: Record<string, string | number | object>;
}