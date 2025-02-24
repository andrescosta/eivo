import { Locataire } from "./locataire.entity";
import { Topique } from "./topique.entity";

export class Domaine {
    public id?: string;
    public nom!: string;
    public description?: string;
    public locataire?: Locataire;
    public topiques?: Topique[];
    public type?: string;
}