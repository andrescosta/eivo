import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Application } from './Application';

type Data = Record<string, string | number | object>;

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
  @Column('boolean')
  enabled!: boolean;

  @Column()
  id!: string;
}
export class Prompt {
  @Column()
  system!: string;

  @Column()
  level!: string;
}

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  description!: string;

  @Column(() => Prompt)
  prompt?: Prompt;

  @OneToMany(() => Exercise, () => {})
  exercises!: Exercise[];

  @OneToMany(
    () => Application,
    (application) => {
      application.lessons;
    },
  )
  application!: Application;
}

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  kind!: string;

  @Column()
  theme!: string;

  @Column()
  type!: string;

  @Column(() => Prompt)
  prompt?: Prompt;

  @Column(() => Description)
  descriptions!: Description;

  @Column('boolean')
  mix!: boolean;

  @Column(() => Learn)
  learn!: Learn;

  @Column('json')
  data!: Data;

  @Column(() => Cache)
  cache!: Cache;
}

