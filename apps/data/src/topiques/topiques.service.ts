import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Topique } from '../entities/topique.entity';

@Injectable()
export class TopiquesService {
  constructor(
    @Inject('TOPIQUE_REPOSITORY')
    private readonly topiqueRepository: Repository<Topique>,
  ) {}

  async create(topique: Topique): Promise<Topique> {
    return this.topiqueRepository.save(topique);
  }

  async findAll(): Promise<Topique[]> {
    return this.topiqueRepository.find();
  }

  async findOne(id: string): Promise<Topique | null> {
    return this.topiqueRepository.findOne({ where: { id } });
  }

  async update(id: string, topique: Partial<Topique>): Promise<void> {
    await this.topiqueRepository.update(id, topique);
  }

  async remove(id: string): Promise<void> {
    await this.topiqueRepository.delete(id);
  }
}
