import { PrimaryGeneratedColumn } from 'typeorm';
import { LocaleString, Translation } from './i18n';

export type ID = number;

export class EivoEntity {
  @PrimaryGeneratedColumn('increment')
  id!: ID;
}

export abstract class EivoLabeledEntity<T extends EivoEntity> extends EivoEntity {
  title?: LocaleString;
  overview?: LocaleString;
  details?: LocaleString;
  abstract translations: Array<Translation<T>>;
}
