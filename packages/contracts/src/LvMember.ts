import { LvClass } from "./LvClass";
import { LvUser } from "./LvUser";

export class LvMember {
    user!: LvUser;
    myclass!:LvClass;
    role!: LvRole;
}

export enum LvRole {
    ETUDIANT = "ETUDIANT",
    PROFESSEUR = "PROFESSEUR",
    ADMIN = "ADMIN"
}