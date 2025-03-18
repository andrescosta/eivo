import { LvExercise } from "./LvExercise.data";

export class LvLesson {
    id!:number;
    description!:string;
    exercises!:Array<LvExercise>;
}

