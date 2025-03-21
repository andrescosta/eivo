import { Column } from 'typeorm';

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
export type Data = Record<string, string | number | object>;

export class Prompt {
  @Column({ nullable: true })
  prompt?: string;

  @Column({ nullable: true })
  level?: string;
}

export type AnyOf = Record<'anyOf', Array<string | number>>;
