import { LvLocataire } from "./lv.locataire.data";

export class LvTopique {
    public id?: string;
    public description!: string; 
    public locataire!: LvLocataire; 
}