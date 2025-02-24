import { Domaine } from "./domaines.entity";
import { Topique } from "./topique.entity";

export class Classe {
    id!:string;
    nom!:string;
    description?:string;
    domain?:Domaine;
    topiques?:Topique[];
}