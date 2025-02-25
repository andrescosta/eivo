import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Membre } from "./membre.entity";

@Entity()
export class Historique {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    date!: Date;

    @ManyToOne(() => Membre, membre => membre.historiques)
    membre!: Membre;
}