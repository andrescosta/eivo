import { LvDomaine } from "./lv.domaines.data";
import { LvTopique } from "./lv.topique.data";

export class LvClasse {
    id!:string;
    nom!:string;
    description?:string;
    domain?:LvDomaine;
    topiques?:LvTopique[];
}