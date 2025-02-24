import { LvClasse } from "./lv.classe.data";
import { LvUtilisateur } from "./lv.utilisateur.data";

export class LvMembre {
    utilisateur!: LvUtilisateur;
    myclass!:LvClasse;
    role!: LvRole;
}

export enum LvRole {
    ETUDIANT = "ETUDIANT",
    PROFESSEUR = "PROFESSEUR",
    ADMIN = "ADMIN"
}