import { Column } from 'typeorm';
import { EivoEntity, ID } from './EntityBase.entity';

export const DEFAULT_CULTURE = 'us';

// The i18n code is based on the same solution as https://github.com/vendure-ecommerce/vendure

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

// mmmmm
export function copyTranslationProperties(obj: any) {
  if (obj != null && typeof obj === 'object') {
    if (obj['translations'] != null) {
      const transObj = obj['translations'] as any[];
      if (transObj != null && transObj.length == 1) {
        for (const [key, value] of Object.entries(transObj[0])) {
          if (
            key !== 'base' &&
            key !== 'id' &&
            key !== 'createdAt' &&
            key !== 'updatedAt' &&
            key !== 'languageCode'
          ) {
            obj[key] = value ?? '';
          }
        }
      }
    }
    for (const [key, value] of Object.entries(obj)) {
      if (value != null) {
        if (Array.isArray(value)) {
          for (const v of value) {
            copyTranslationProperties(v);
          }
        } else {
          copyTranslationProperties(value);
        }
      }
    }
  }
}

export function copyNamedObjectPropertiesToTranslations(obj: any) {
  if (obj != null && typeof obj === 'object') {
    if (Array.isArray(obj['translations']) && obj['translations'].length == 1) {
      if (obj['name'] != null) {
        obj['translations'][0]['name'] = obj['name'];
      }
      if (obj['description'] != null) {
        obj['translations'][0]['description'] = obj['description'];
      }
    }
    for (const [key, value] of Object.entries(obj)) {
      if (value != null) {
        if (Array.isArray(value)) {
          for (const v of value) {
            copyNamedObjectPropertiesToTranslations(v);
          }
        } else {
          copyNamedObjectPropertiesToTranslations(value);
        }
      }
    }
  }
}

export type Queryable<T, U = Omit<T, 'base'>> = {
  [K in keyof U as U[K] extends EivoEntity | EivoEntity[]
    ? K
    : never]?: U[K] extends EivoEntity
    ? Queryable<U[K]>
    : U[K] extends EivoEntity[]
      ? Queryable<U[K][number]>
      : never;
} & (U extends EivoNamedEntityTranslation
  ? { languageCode: string }
  : U extends EivoEntity
    ? { id?: number }
    : never);