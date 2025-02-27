import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Activite } from "./activite.entity";

@Entity()
export class Jeu {
    @PrimaryGeneratedColumn("increment")
    id!: string;

    @Column()
    nom!: string;

    @Column({ nullable: true })
    description?: string;

    @Column()
    date!: Date;

    @ManyToOne(() => Activite)
    activite!: Activite;
}