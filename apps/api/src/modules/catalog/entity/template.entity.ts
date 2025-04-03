import { Column } from 'typeorm';

export class Learn {
  @Column()
  type!: string;
}

export class ResultsCache {
  @Column('boolean', { nullable: true })
  enabled!: boolean;

  @Column({ nullable: true })
  id!: string;
}
export type Data = Record<string, string | number | object>;

export type AnyOf = Record<'anyOf', Array<string | number>>;
