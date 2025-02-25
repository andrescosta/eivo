import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Domaine } from "./domain.entity";
import { Topique } from "./topique.entity";

@Entity()
export class TopiqueByDomain {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Domaine, domaine => domaine.topiques)
    domain?: Domaine;

    @ManyToOne(() => Topique, topique => topique.topiquesByDomain)
    topique?: Topique;
}