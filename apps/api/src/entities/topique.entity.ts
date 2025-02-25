import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Application } from "./application.entity";
import { Domaine } from "./domain.entity";
import { Locataire } from "./locataire.entity";
import { TopiqueByDomain } from "./topiquebydomain.entity";

@Entity()
export class Topique {
    @PrimaryGeneratedColumn("increment")
    public id?: string;

    @Column()
    public description!: string;

    @ManyToOne(() => Locataire, locataire => locataire.topiques)
    public locataire!: Locataire;

    @ManyToOne(() => Domaine, domaine => domaine.topiques)
    public domaine!: Domaine;

    @ManyToMany(() => Application)
    @JoinTable()
    public applications!: Application[];

    @OneToMany(() => TopiqueByDomain, topiqueByDomain => topiqueByDomain.topique)
    public topiquesByDomain!: TopiqueByDomain[];
}