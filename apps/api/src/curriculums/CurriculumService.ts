import { Injectable, Inject } from '@nestjs/common';
import { Any, Equal, IsNull, Or, Repository } from 'typeorm';
import { EntityNotFoundError } from '../entities/EntityNotFoundError';
import {
  Curriculum,
  CurriculumTranslation,
} from '../entities/Curriculum.entity';
import {
  DEFAULT_CULTURE,
  EivoEntity,
  LanguageCode,
  translateAll,
} from '../entities/EntityBase.entity';

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
  async findComplete(
    curriculum: number,
    tenant: number,
    findculture?: LanguageCode,
  ): Promise<Curriculum | null> {
    const culture = findculture ?? DEFAULT_CULTURE;
    return await this.curriculumRepository
      .findOne({
        where: {
          id: curriculum,
          tenant: {
            id: tenant,
          },
          translations: {
            languageCode: Or(Equal(culture), IsNull()),
          },
          subjects: {
            translations: {
              languageCode: Or(Equal(culture), IsNull()),
            },
            units: {
              translations: {
                languageCode: Or(Equal(culture), IsNull()),
              },
              lessonTemplates: {
                translations: {
                  languageCode: Or(Equal(culture), IsNull()),
                },
                exerciseTemplates: {
                  translations: {
                    languageCode: Or(Equal(culture), IsNull()),
                  },
                },
                materialTemplates: {
                  translations: {
                    languageCode: Or(Equal(culture), IsNull()),
                  },
                },
              },
            },
          },
        },
        relations: [
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
        ],
      })
      .then((p) => {
        translateAll(p);
        return p;
      });
  }

  // async findSubjectComplete(
  //   curriculum: number,
  //   subject: number,
  //   culture: LanguageCode,
  //   tenant: number,
  // ): Promise<Curriculum | null> {
  //   return await this.curriculumRepository.findOne({
  //     where: {
  //       id: curriculum,
  //       tenant: {
  //         id: tenant,
  //       },
  //       subjects: {
  //         id: subject,
  //         translations: {
  //           languageCode: culture,
  //         },
  //         units: {
  //           translations: {
  //             languageCode: culture,
  //           },
  //           lessonTemplates: {
  //             translations: {
  //               languageCode: culture,
  //             },
  //             exercises: {
  //               translations: {
  //                 languageCode: culture,
  //               },
  //             },
  //             material: {
  //               translations: {
  //                 languageCode: culture,
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //     relations: [
  //       'curriculums',
  //       'curriculums.subjects',
  //       'curriculums.subjects.units',
  //       'curriculums.subjects.units.lessonTemplates',
  //       'curriculums.subjects.units.lessonTemplates.exercises',
  //       'curriculums.subjects.units.lessonTemplates.material',
  //       //
  //       // 'curriculums.subjects.units.curriculum',
  //     ],
  //   });
  // }

  // async findUnitComplete(
  //   curriculum: number,
  //   subject: number,
  //   unit: number,
  //   culture: LanguageCode,
  //   tenant: number,
  // ): Promise<Curriculum | null> {
  //   return await this.curriculumRepository.findOne({
  //     where: {
  //       id: curriculum,
  //       tenant: {
  //         id: tenant,
  //       },
  //       subjects: {
  //         id: subject,
  //         translations: {
  //           languageCode: culture,
  //         },
  //         units: {
  //           id: unit,
  //           translations: {
  //             languageCode: culture,
  //           },
  //           lessonTemplates: {
  //             translations: {
  //               languageCode: culture,
  //             },
  //             exercises: {
  //               translations: {
  //                 languageCode: culture,
  //               },
  //             },
  //             material: {
  //               translations: {
  //                 languageCode: culture,
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //     relations: [
  //       'curriculums',
  //       'curriculums.subjects',
  //       'curriculums.subjects.units',
  //       'curriculums.subjects.units.lessonTemplates',
  //       'curriculums.subjects.units.lessonTemplates.exercises',
  //       'curriculums.subjects.units.lessonTemplates.material',
  //       //
  //       // 'curriculums.subjects.units.curriculum',
  //     ],
  //   });
  // }

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
}
