import { EivoEntity } from "./eivo-entity.entity";
import { LocaleString, Translation } from "./i18n";

export abstract class EivoLabeledEntity<T extends EivoEntity> extends EivoEntity {
  title?: LocaleString;
  overview?: LocaleString;
  details?: LocaleString;
  abstract translations: Array<Translation<T>>;
}
