import { Activite } from "./activite.entity";
import { Membre } from "./membre.entity";

export class Jeu {
    id!: string;
    nom!: string;
    description?: string;
    membres!: Membre[];
    date!: Date;
    activite!: Activite;
}