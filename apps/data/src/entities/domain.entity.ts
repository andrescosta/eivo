import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Locataire } from "./locataire.entity";
import { TopiqueByDomain } from "./topiquebydomain.entity";

@Entity()
export class Domaine {
    @PrimaryGeneratedColumn("increment")
    public id?: string;

    @Column()
    public nom!: string;

    @Column({ nullable: true })
    public description?: string;

    @ManyToOne(() => Locataire)
    public locataire?: Locataire;

    @OneToMany(() => TopiqueByDomain, topiqueByDomain => topiqueByDomain.domain)
    public topiques?: TopiqueByDomain[];

    @Column({ nullable: true })
    public type?: string;
}