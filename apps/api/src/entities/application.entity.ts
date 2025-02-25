import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Topique } from "./topique.entity";

export enum ApplicationType {
    Humain = "Humain",
    IA = "IA"
}

@Entity()
export class Application {
    @PrimaryGeneratedColumn("increment")
    id!: string;

    @Column()
    nom!: string;

    @Column()
    description!: string;

    @Column()
    petiteImage!: string;

    @Column()
    grandeImage!: string;

    @ManyToMany(() => Topique, topique => topique.applications)
    topiques!: Topique[];

    @Column({
        type: "enum",
        enum: ApplicationType
    })
    type!: ApplicationType;
}

