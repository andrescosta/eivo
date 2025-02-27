import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Domaine } from '../entities/domain.entity';

@Injectable()
export class DomainesService {
  constructor(
    @InjectRepository(Domaine)
    private readonly domaineRepository: Repository<Domaine>,
  ) {}

  async create(domaine: Domaine): Promise<Domaine> {
    return this.domaineRepository.save(domaine);
  }

  async findAll(): Promise<Domaine[]> {
    return this.domaineRepository.find();
  }

  async findOne(id: string): Promise<Domaine | null> {
    return this.domaineRepository.findOne({ where: { id } });
  }

  async update(id: string, domaine: Partial<Domaine>): Promise<void> {
    await this.domaineRepository.update(id, domaine);
  }

  async remove(id: string): Promise<void> {
    await this.domaineRepository.delete(id);
  }
}
