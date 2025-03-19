import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LClass } from '../entities/LClass.entity';
import { EntityNotFoundError } from '../entities/EntityNotFoundError.entity';

@Injectable()
export class LClassService {
  constructor(
    @Inject('LCLASS_REPOSITORY')
    private readonly classeRepository: Repository<LClass>,
  ) {}

  async create(classe: LClass): Promise<LClass> {
    return this.classeRepository.save(classe);
  }

  async findAll(): Promise<LClass[]> {
    return this.classeRepository.find();
  }

  async findOne(id: number): Promise<LClass | null> {
    return this.classeRepository.findOne({ where: { id } });
  }

  async update(id: number, classe: Partial<LClass>): Promise<void> {
    const res = await this.classeRepository.update(id, classe);
    if (res.affected == 0) {
      throw new EntityNotFoundError('Tenant');
    }
  }

  async remove(id: number): Promise<void> {
    const res = await this.classeRepository.delete(id);
    if (res.affected == 0) {
      throw new EntityNotFoundError('Tenant');
    }
  }
}
