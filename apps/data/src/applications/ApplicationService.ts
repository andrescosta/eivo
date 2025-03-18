import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Application } from '../entities/Application';
import { EntityNotFoundError } from '../entities/EntityNotFoundError';
import { LessonTemplate } from '../entities/LessonTemplate';

@Injectable()
export class ApplicationService {
  constructor(
    @Inject('APPLICATION_REPOSITORY')
    private readonly applicationRepository: Repository<Application>,
  ) {}

  async create(application: Application): Promise<Application> {
    // Fixing an issue with the foreign keys inserted as null for second level relationships(exercise and lesson) during cascade.
    // application.lessons?.forEach((l) => {
    //   l.application = application;
    //   l.exercises?.forEach((e) => {
    //     e.lesson = l;
    //   });
    // });
    return this.applicationRepository.save(application);
  }

  async findAll(): Promise<Application[]> {
    return this.applicationRepository.find();
  }

  async findOne(id: number): Promise<Application | null> {
    return await this.applicationRepository.findOne({
      where: { id },
    });
  }

  async findWithExercises(id: number): Promise<Application | null> {
    return await this.applicationRepository.findOne({
      where: { id },
      relations: [
        'lessons',
        'lessons.exercises',
        'lessons.exercises.lesson',
        'lessons.exercises.lesson.application',
        'lessons.application',
      ],
    });
  }

  async findExercise(id: number, lesId:number, exId:number): Promise<Application | null> {
    return await this.applicationRepository.findOne({
      where: { id: id,
        lessons: {
          id: lesId,
          exercises: {
            id:exId
          }
        }
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


  async update(id: number, application: Application): Promise<Application> {
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
