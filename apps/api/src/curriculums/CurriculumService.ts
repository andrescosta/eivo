import { Inject, Injectable } from '@nestjs/common';
import { Equal, FindOptionsWhere, IsNull, Or, Repository } from 'typeorm';
import { Curriculum } from '../entities/Curriculum.entity';
import { EntityNotFoundError } from '../entities/EntityNotFoundError';
import {
  DEFAULT_CULTURE,
  CultureCode,
  Queryable,
  copyTranslationProperties,
} from '../entities/i18n';

@Injectable()
export class CurriculumService {
  constructor(
    @Inject('CURRICULUM_REPOSITORY')
    private readonly curriculumRepository: Repository<Curriculum>,
  ) {}

  async save(curriculum: Curriculum): Promise<Curriculum> {
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
    eivoNamespace: number,
    curriculum: number,
    findculture?: CultureCode,
  ): Promise<Curriculum | null> {
    const culture = findculture ?? DEFAULT_CULTURE;
    return await this.curriculumRepository
      .findOne({
        where: {
          ...this.commonWhere(culture, eivoNamespace, curriculum),
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
    eivoNamespace: number,
    curriculum: number,
    subject: number,
    findculture?: CultureCode,
  ): Promise<Curriculum | null> {
    const culture = findculture ?? DEFAULT_CULTURE;
    return await this.curriculumRepository
      .findOne({
        where: {
          ...this.commonWhere(culture, eivoNamespace, curriculum, subject),
        },
        relations: this.commonRelations(),
      })
      .then((currObj) => {
        copyTranslationProperties(currObj);
        return currObj;
      });
  }

  async remove(id: number): Promise<void> {
    const res = await this.curriculumRepository.delete(id);
    if (res.affected == 0) {
      throw new EntityNotFoundError('Domain');
    }
  }

  commonWhere(
    culture: string,
    eivoNamespace: number,
    curriculum?: number,
    subject?: number,
    unit?: number,
    lessonTemplate?: number,
    exerciseTemplate?: number,
    materialTemplate?: number,
  ): FindOptionsWhere<Curriculum> {
    const t = {
      eivoNamespace: {
        id: eivoNamespace,
      },
      ...this.getId(curriculum),
      translations: {
        culture: Or(Equal(culture), IsNull()),
      },
      subjects: {
        ...this.getId(subject),
        translations: {
          culture: Or(Equal(culture), IsNull()),
        },
        units: {
          ...this.getId(unit),
          translations: {
            culture: Or(Equal(culture), IsNull()),
          },
          lessonTemplates: {
            ...this.getId(lessonTemplate),
            translations: {
              culture: Or(Equal(culture), IsNull()),
            },
            exerciseTemplates: {
              ...this.getId(exerciseTemplate),
              translations: {
                culture: Or(Equal(culture), IsNull()),
              },
            },
            materialTemplates: {
              ...this.getId(materialTemplate),
              translations: {
                culture: Or(Equal(culture), IsNull()),
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
}
