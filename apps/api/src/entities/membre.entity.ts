import { Entity, ManyToOne, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Classe } from "./classe.entity";
import { Utilisateur } from "./utilisateur.entity";
import { Historique } from "./historique.entity";

export enum Role {
    ETUDIANT = "ETUDIANT",
    PROFESSEUR = "PROFESSEUR",
    ADMIN = "ADMIN"
}

@Entity()
export class Membre {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Utilisateur, utilisateur => utilisateur.membres)
    utilisateur!: Utilisateur;

    @ManyToOne(() => Classe, classe => classe.membres)
    myclass!: Classe;

    @OneToMany(()=> Historique, historique => historique.membre)
    historiques!: Historique[];

    @Column({
        type: "enum",
        enum: Role
    })
    role!: Role;
}

