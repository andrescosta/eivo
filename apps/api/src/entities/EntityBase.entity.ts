import { PrimaryGeneratedColumn } from 'typeorm';
import { LocaleString } from './i18n';

export type ID = number;


export class EivoEntity {
  @PrimaryGeneratedColumn('increment')
  id!: ID;
}

export class EivoNamedEntity extends EivoEntity {
  name?: LocaleString;
  description?: Description;
}

export class Description {
  short?: LocaleString;
  long?: LocaleString;
}
