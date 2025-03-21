import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Curriculum } from '../entities/Curriculum.entity';
import { EntityNotFoundError } from '../entities/EntityNotFoundError.entity';

@Injectable()
export class LClassService {
  constructor(
    @Inject('LCLASS_REPOSITORY')
    private readonly classeRepository: Repository<Curriculum>,
  ) {}

  async create(classe: Curriculum): Promise<Curriculum> {
    return this.classeRepository.save(classe);
  }

  async findAll(): Promise<Curriculum[]> {
    return this.classeRepository.find();
  }

  async findOne(id: number): Promise<Curriculum | null> {
    return this.classeRepository.findOne({ where: { id } });
  }

  async update(id: number, classe: Partial<Curriculum>): Promise<void> {
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
