import { LvTopic } from "./LvTopic"

export class LvApplication {
    id!: string 
    name!:string
    description!:string
    smallImage!:string
    bigImage!:string
    topics!:LvTopic[]
    type!:LvApplicationType  
}

export enum LvApplicationType {
    Human = "Human",
    IA="IA"
}