import { LvTopique } from "./lv.topique.data"

export class LvApplication {
    id!: string 
    nom!:string
    description!:string
    petiteImage!:string
    grandeImage!:string
    topiques!:LvTopique[]
    type!:LvApplicationType  
}

export enum LvApplicationType {
    Humain = "Humain",
    IA="IA"
}