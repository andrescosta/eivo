import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from 'typeorm';
import { Topic } from './Topic';
import { Lesson } from './Lesson';


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

  @Column({nullable: true})
  smallImage?: string;

  @Column({nullable: true})
  bigImage?: string;

  @ManyToMany(() => Topic, (topics) => topics.applications)
  topics?: Topic[];

  @OneToMany(() => Lesson, (lesson) => lesson.application)
  lessons?: Lesson[];

  @Column({
    type: 'enum',
    enum: ApplicationType,
  })
  type!: ApplicationType;
}
