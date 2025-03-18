import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Prompt, LessonTemplate } from './LessonTemplate';

export class Learn {
  @Column()
  type!: string;
}

export class Description {
  @Column()
  short!: string;

  @Column()
  long!: string;
}
export class Cache {
  @Column('boolean', { nullable: true })
  enabled!: boolean;

  @Column({ nullable: true })
  id!: string;
}

@Entity()
export class ExerciseTemplate {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column()
  kind!: string;

  @Column()
  theme!: string;

  @Column()
  type!: string;

  @Column(() => Prompt)
  prompt!: Prompt;

  @Column(() => Description)
  descriptions!: Description;

  @Column('boolean')
  mix!: boolean;

  @Column(() => Learn)
  learn!: Learn;

  @Column('json')
  variations!: Array<Record<string, anyOf>>;

  @Column(() => Cache)
  cache!: Cache;

  @ManyToOne(() => LessonTemplate, (lesson) => lesson.exercises)
  lesson!: LessonTemplate;
}

type anyOf = Record<"anyOf",Array<string | number>>;