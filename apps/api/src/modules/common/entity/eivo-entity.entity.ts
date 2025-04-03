import { PrimaryGeneratedColumn } from 'typeorm';

export type ID = number;

export class EivoEntity {
  @PrimaryGeneratedColumn('increment')
  public id!: ID;
}