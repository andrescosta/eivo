import { Inject, Injectable } from '@nestjs/common';
import { Equal, FindOptionsWhere, IsNull, Or, Repository } from 'typeorm';
import { Curriculum } from '../entities/Curriculum.entity';
import { EntityNotFoundError } from '../entities/EntityNotFoundError';
import {
  DEFAULT_CULTURE,
  LanguageCode,
  Queryable,
  copyTranslationProperties,
} from '../entities/i18n';

@Injectable()
export class CurriculumService {
  constructor(
    @Inject('CURRICULUM_REPOSITORY')
    private readonly curriculumRepository: Repository<Curriculum>,
  ) {}

  async create(curriculum: Curriculum): Promise<Curriculum> {
    return this.curriculumRepository.save(curriculum);
  }

  async findAll(): Promise<Curriculum[]> {
    const currs = await this.curriculumRepository.find();
    return currs;
  }

  async findOne(id: number): Promise<Curriculum | null> {
    return await this.curriculumRepository.findOne({
      where: { id },
    });
  }

  async findFull(
    namespace: number,
    curriculum: number,
    findculture?: LanguageCode,
  ): Promise<Curriculum | null> {
    const culture = findculture ?? DEFAULT_CULTURE;
    return await this.curriculumRepository
      .findOne({
        where: {
          ...this.commonWhere(culture, namespace, curriculum),
        },
        relations: this.commonRelations(),
      })
      .then((currObj) => {
        copyTranslationProperties(currObj);
        return currObj;
      });
  }

  async find1(q: Queryable<Curriculum>): Promise<Curriculum | null> {
    return await this.curriculumRepository
      .findOne({
        where: {
          ...q,
        },
        relations: this.commonRelations(),
      })
      .then((currObj) => {
        copyTranslationProperties(currObj);
        return currObj;
      });
  }

  async findFullForSubject(
    namespace: number,
    curriculum: number,
    subject: number,
    findculture?: LanguageCode,
  ): Promise<Curriculum | null> {
    const culture = findculture ?? DEFAULT_CULTURE;
    return await this.curriculumRepository
      .findOne({
        where: {
          ...this.commonWhere(culture, namespace, curriculum, subject),
        },
        relations: this.commonRelations(),
      })
      .then((currObj) => {
        copyTranslationProperties(currObj);
        return currObj;
      });
  }

  async update(id: number, curriculum: Curriculum): Promise<Curriculum> {
    const res = await this.curriculumRepository.update(id, curriculum);
    if (res.affected == 0) {
      throw new EntityNotFoundError('Domain');
    }
    return curriculum;
  }

  async remove(id: number): Promise<void> {
    const res = await this.curriculumRepository.delete(id);
    if (res.affected == 0) {
      throw new EntityNotFoundError('Domain');
    }
  }

  commonWhere(
    culture: string,
    namespace: number,
    curriculum?: number,
    subject?: number,
    unit?: number,
    lessonTemplate?: number,
    exerciseTemplate?: number,
    materialTemplate?: number,
  ): FindOptionsWhere<Curriculum> {
    const t = {
      namespace: {
        id: namespace,
      },
      ...this.getId(curriculum),
      translations: {
        languageCode: Or(Equal(culture), IsNull()),
      },
      subjects: {
        ...this.getId(subject),
        translations: {
          languageCode: Or(Equal(culture), IsNull()),
        },
        units: {
          ...this.getId(unit),
          translations: {
            languageCode: Or(Equal(culture), IsNull()),
          },
          lessonTemplates: {
            ...this.getId(lessonTemplate),
            translations: {
              languageCode: Or(Equal(culture), IsNull()),
            },
            exerciseTemplates: {
              ...this.getId(exerciseTemplate),
              translations: {
                languageCode: Or(Equal(culture), IsNull()),
              },
            },
            materialTemplates: {
              ...this.getId(materialTemplate),
              translations: {
                languageCode: Or(Equal(culture), IsNull()),
              },
            },
          },
        },
      },
    };
    return t;
  }

  getId(idVal?: number) {
    if (idVal != undefined) {
      return {
        id: idVal,
      };
    }
    return null;
  }

  commonRelations() {
    return [
      'translations',
      'subjects',
      'subjects.translations',
      'subjects.units',
      'subjects.units.translations',
      'subjects.units.lessonTemplates',
      'subjects.units.lessonTemplates.translations',
      'subjects.units.lessonTemplates.exerciseTemplates',
      'subjects.units.lessonTemplates.exerciseTemplates.translations',
      'subjects.units.lessonTemplates.materialTemplates',
      'subjects.units.lessonTemplates.materialTemplates.translations',
    ];
  }

  commonWhere1(q: Queryable<Curriculum>): FindOptionsWhere<Curriculum> {
    const t = {
      namespace: {
        ...this.getId(q.namespace?.id),
      },
      ...this.getId(q.id),
      translations: {
        languageCode: Or(
          Equal(q.translations?.languageCode ?? DEFAULT_CULTURE),
          IsNull(),
        ),
      },
      subjects: {
        ...this.getId(q.subjects?.id),
        translations: {
          languageCode: Or(
            Equal(q.subjects?.translations?.languageCode ?? DEFAULT_CULTURE),
            IsNull(),
          ),
        },
        units: {
          ...this.getId(q.subjects?.units?.id),
          translations: {
            languageCode: Or(
              Equal(
                q.subjects?.units?.translations?.languageCode ??
                  DEFAULT_CULTURE,
              ),
              IsNull(),
            ),
          },
          lessonTemplates: {
            ...this.getId(q.subjects?.units?.lessonTemplates?.id),
            translations: {
              languageCode: Or(
                Equal(
                  q.subjects?.units?.lessonTemplates?.translations
                    ?.languageCode ?? DEFAULT_CULTURE,
                ),
                IsNull(),
              ),
            },
            exerciseTemplates: {
              ...this.getId(
                q.subjects?.units?.lessonTemplates?.exerciseTemplates?.id,
              ),
              translations: {
                languageCode: Or(
                  Equal(
                    q.subjects?.units?.lessonTemplates?.exerciseTemplates
                      ?.translations?.languageCode ?? DEFAULT_CULTURE,
                  ),
                  IsNull(),
                ),
              },
            },
            materialTemplates: {
              ...this.getId(
                q.subjects?.units?.lessonTemplates?.exerciseTemplates
                  ?.lessonTemplate?.materialTemplates?.id,
              ),
              translations: {
                languageCode: Or(
                  Equal(
                    q.subjects?.units?.lessonTemplates?.exerciseTemplates
                      ?.lessonTemplate?.materialTemplates?.translations
                      ?.languageCode ?? DEFAULT_CULTURE,
                  ),
                  IsNull(),
                ),
              },
            },
          },
        },
      },
    };
    return t;
  }
}
