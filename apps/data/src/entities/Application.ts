import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Topic } from './Topic';

export enum ApplicationType {
  Humain = 'Humain',
  IA = 'IA',
}

@Entity()
export class Application {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  smallImage!: string;

  @Column()
  bigImage!: string;

  @ManyToMany(() => Topic, (topics) => topics.applications)
  topics!: Topic[];

  @Column({
    type: 'enum',
    enum: ApplicationType,
  })
  type!: ApplicationType;
}
