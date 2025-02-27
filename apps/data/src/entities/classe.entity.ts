import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { TopiqueByDomain as TopiqueByDomaine } from "./topiquebydomain.entity";
import { Domaine } from "./domain.entity";
import { Membre } from "./membre.entity";

@Entity()
export class Classe {
    @PrimaryGeneratedColumn("increment")
    id!: string;

    @Column()
    nom!: string;

    @Column({ nullable: true })
    description?: string;

    @ManyToOne(() => Domaine)
    domaine!: Domaine;

    @OneToMany(() => TopiqueByDomaine, topiqueByDomaine => topiqueByDomaine.topique)
    topiques?: TopiqueByDomaine[];

    @OneToMany(()=> Membre, membre => membre.myclass)
    membres!: Membre[];
}