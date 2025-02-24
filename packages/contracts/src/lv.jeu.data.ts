import { LvActivite } from "./lv.activite.data";
import { LvMembre } from "./lv.membre.data";

export class LvJeu {
    id!: string;
    nom!: string;
    description?: string;
    membres!: LvMembre[];
    date!: Date;
    activite!: LvActivite;
}