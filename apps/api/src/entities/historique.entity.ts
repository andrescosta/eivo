import { Membre } from "./membre.entity";

export class Historique {
    id!: number;
    date!: Date;
    membre!: Membre;
}