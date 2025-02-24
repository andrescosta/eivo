import { Topique } from "./topique.entity"

export class Application {
    id!: string 
    nom!:string
    description!:string
    petiteImage!:string
    grandeImage!:string
    topiques!:Topique[]
    type!:ApplicationType  
}

export enum ApplicationType {
    Humain = "Humain",
    IA="IA"
}