import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Membre } from "./membre.entity";

@Entity()
export class Utilisateur {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column()
    public nom!: string;

    @OneToMany(() => Membre, membre => membre.utilisateur)
    public membres!: Membre[];
}
