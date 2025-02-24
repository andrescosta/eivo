import { Classe } from "./classe.entity";
import { Utilisateur } from "./utilisateur.entity";

export class Membre {
    utilisateur!: Utilisateur;
    myclass!:Classe;
    role!: Role;
}

export enum Role {
    ETUDIANT = "ETUDIANT",
    PROFESSEUR = "PROFESSEUR",
    ADMIN = "ADMIN"
}