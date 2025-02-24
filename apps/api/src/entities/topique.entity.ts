import { Locataire } from "./locataire.entity";

export class Topique {
    public id?: string;
    public description!: string; 
    public locataire!: Locataire; 
}