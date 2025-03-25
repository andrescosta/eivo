import {
  Column,
  PrimaryGeneratedColumn
} from 'typeorm';

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

export class EivoEntityTranslation extends EivoEntity {
  @Column()
  languageCode!: LanguageCode;
}

export class DescriptionTranslation {
  @Column({ nullable: true })
  short?: string;

  @Column({ nullable: true })
  long?: string;
}
export class EivoNamedEntityTranslation extends EivoEntityTranslation {
  @Column({ nullable: true })
  name?: string;

  @Column(() => DescriptionTranslation)
  description?: DescriptionTranslation;
}

export type LanguageCode = string;
//   af = 'af',
//   ak = 'ak',
//   am = 'am',
//   ar = 'ar',
//   as = 'as',
//   az = 'az',
//   be = 'be',
//   bg = 'bg',
//   bm = 'bm',
//   bn = 'bn',
//   bo = 'bo',
//   br = 'br',
//   bs = 'bs',
//   us = 'us',
// }

export type LocaleString = string & { __localeString: never };

export interface Translatable {
  translations: Array<Translation<EivoEntity>>;
}

export type Translation<T> = {
  id: ID;
  languageCode: LanguageCode;
  base: T;
} & { [K in TranslatableKeys<T>]: string };

export type TranslatableKeys<T, U = Omit<T, 'translations'>> = {
  [K in keyof U]: U[K] extends LocaleString ? K : never;
}[keyof U];
