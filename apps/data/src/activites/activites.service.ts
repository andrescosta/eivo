import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activite } from '../entities/activite.entity';

@Injectable()
export class ActivitesService {
  constructor(
    @InjectRepository(Activite)
    private readonly activiteRepository: Repository<Activite>,
  ) {}

  async create(activite: Activite): Promise<Activite> {
    return this.activiteRepository.save(activite);
  }

  async findAll(): Promise<Activite[]> {
    return this.activiteRepository.find();
  }

  async findOne(id: string): Promise<Activite | null> {
    return this.activiteRepository.findOne({ where: { id } });
  }

  async update(id: string, activite: Partial<Activite>): Promise<void> {
    await this.activiteRepository.update(id, activite);
  }

  async remove(id: string): Promise<void> {
    await this.activiteRepository.delete(id);
  }
}
