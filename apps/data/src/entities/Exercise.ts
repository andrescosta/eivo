import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Prompt, Lesson } from './Lesson';

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
export class Exercise {
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
  data!: Record<string, string | number | object>;

  @Column(() => Cache)
  cache!: Cache;

  @ManyToOne(() => Lesson, (lesson) => lesson.exercises)
  lesson!: Lesson;
}
