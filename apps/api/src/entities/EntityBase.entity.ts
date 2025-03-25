import { Column, PrimaryGeneratedColumn } from 'typeorm';

export type ID = number;

export const DEFAULT_CULTURE = 'us';

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

export function translateAll(tt: any) {
  if (tt != null && typeof tt === 'object') {
    if (tt['translations'] != null) {
      const trans = tt['translations'] as any[];
      if (trans != null && trans.length == 1) {
        for (const [key, value] of Object.entries(trans[0])) {
          if (
            key !== 'base' &&
            key !== 'id' &&
            key !== 'createdAt' &&
            key !== 'updatedAt' &&
            key !== 'languageCode'
          ) {
            tt[key] = value ?? '';
          }
        }
      }
    }
    for (const [key, value] of Object.entries(tt)) {
      if (value != null) {
        if (Array.isArray(value)) {
          for (const ki of value) {
            translateAll(ki);
          }
        } else {
          translateAll(value);
        }
      }
    }
  }
}

export function copyToTranslations(tt: any) {
  if (tt != null && typeof tt === 'object') {
    if (Array.isArray(tt['translations']) && tt['translations'].length == 1) {
      if (tt['name'] != null) {
        tt['translations'][0]['name'] = tt['name'];
      }
      if (tt['description'] != null) {
        tt['translations'][0]['description'] = tt['description'];
      }
    }
    for (const [key, value] of Object.entries(tt)) {
      if (value != null) {
        if (Array.isArray(value)) {
          for (const ki of value) {
            copyToTranslations(ki);
          }
        } else {
          copyToTranslations(value);
        }
      }
    }
  }
}