import { LvLocataire } from "./lv.locataire.data";
import { LvTopique } from "./lv.topique.data";

export class LvDomaine {
    public id?: string;
    public nom!: string;
    public description?: string;
    public locataire?: LvLocataire;
    public topiques?: LvTopique[];
    public type?: string;
}