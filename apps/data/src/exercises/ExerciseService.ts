import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Application } from '../entities/Application';
import { EntityNotFoundError } from '../entities/EntityNotFoundError';

@Injectable()
export class ApplicationService {
  constructor(
    @Inject('APPLICATION_REPOSITORY')
    private readonly applicationRepository: Repository<Application>,
  ) {}

  async create(application: Application): Promise<Application> {
    return this.applicationRepository.save(application);
  }

  async findAll(): Promise<Application[]> {
    return this.applicationRepository.find();
  }

  async findOne(id: number): Promise<Application | null> {
    return this.applicationRepository.findOne({ where: { id } });
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
