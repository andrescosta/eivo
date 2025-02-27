import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Topique } from "./topique.entity";

@Entity()
export class Locataire {
    @PrimaryGeneratedColumn("increment")
    public id?: string;

    @Column()
    public nom!: string;

    @Column({ nullable: true })
    public description?: string;

    @OneToMany(() => Topique, topique => topique.locataire)
    public topiques!: Topique[];
}