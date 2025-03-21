import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LearningTemplate } from '../entities/Application.entity';
import { EntityNotFoundError } from '../entities/EntityNotFoundError.entity';
import { LessonTemplate } from '../entities/LessonTemplate.entity';

@Injectable()
export class ApplicationService {
  constructor(
    @Inject('APPLICATION_REPOSITORY')
    private readonly applicationRepository: Repository<LearningTemplate>,
  ) {}

  async create(application: LearningTemplate): Promise<LearningTemplate> {
    // Fixing an issue with the foreign keys inserted as null for second level relationships(exercise and lesson) during cascade.
    // application.lessons?.forEach((l) => {
    //   l.application = application;
    //   l.exercises?.forEach((e) => {
    //     e.lesson = l;
    //   });
    // });
    return this.applicationRepository.save(application);
  }

  async findAll(): Promise<LearningTemplate[]> {
    const apps = await this.applicationRepository.find();
    return apps;
  }

  async findOne(id: number): Promise<LearningTemplate | null> {
    return await this.applicationRepository.findOne({
      where: { id },
    });
  }
  async findWithLessonsExercises(id: number): Promise<LearningTemplate | null> {
    return await this.applicationRepository.findOne({
      where: {
        id: id,
      },
      relations: [
        'lessons',
        'lessons.exercises',
        'lessons.exercises.lesson',
        'lessons.exercises.lesson.application',
        'lessons.application',
      ],
    });
  }

  async findWithExercises(
    id: number,
    lesId: number,
  ): Promise<LearningTemplate | null> {
    return await this.applicationRepository.findOne({
      where: {
        id: id,
        lessons: {
          id: lesId,
        },
      },
      relations: [
        'lessons',
        'lessons.exercises',
        'lessons.exercises.lesson',
        'lessons.exercises.lesson.application',
        'lessons.application',
      ],
    });
  }

  async findExercise(
    id: number,
    lesId: number,
    exId: number,
  ): Promise<LearningTemplate | null> {
    return await this.applicationRepository.findOne({
      where: {
        id: id,
        lessons: {
          id: lesId,
          exercises: {
            id: exId,
          },
        },
      },
      relations: [
        'lessons',
        'lessons.exercises',
        'lessons.exercises.lesson',
        'lessons.exercises.lesson.application',
        'lessons.application',
      ],
    });
  }

  async update(id: number, application: LearningTemplate): Promise<LearningTemplate> {
    const res = await this.applicationRepository.update(id, application);
    if (res.affected == 0) {
      throw new EntityNotFoundError('Domain');
    }
    return application;
  }

  async remove(id: number): Promise<void> {
    const res = await this.applicationRepository.delete(id);
    if (res.affected == 0) {
      throw new EntityNotFoundError('Domain');
    }
  }
}
