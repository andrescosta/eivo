import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Topic } from './Topic';
import { LessonTemplate } from './LessonTemplate';

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

  @Column({ nullable: true })
  smallImage?: string;

  @Column({ nullable: true })
  bigImage?: string;

  @ManyToMany(() => Topic, (topics) => topics.applications)
  topics?: Topic[];

  @OneToMany(() => LessonTemplate, (lesson) => lesson.application, {
    cascade: true,
  })
  lessons!: LessonTemplate[];

  @Column('json', { nullable: true })
  schema?: Record<string, string | number | object>;

  @Column({
    type: 'enum',
    enum: ApplicationType,
  })
  type!: ApplicationType;
}
