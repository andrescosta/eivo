import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Membre } from '../entities/membre.entity';

@Injectable()
export class MembresService {
  constructor(
    @Inject('MEMBRE_REPOSITORY')
    private readonly membreRepository: Repository<Membre>,
  ) {}

  async create(membre: Membre): Promise<Membre> {
    return this.membreRepository.save(membre);
  }

  async findAll(): Promise<Membre[]> {
    return this.membreRepository.find();
  }

  async findOne(id: number): Promise<Membre | null> {
    return this.membreRepository.findOne({ where: { id } });
  }

  async update(id: number, membre: Partial<Membre>): Promise<void> {
    await this.membreRepository.update(id, membre);
  }

  async remove(id: number): Promise<void> {
    await this.membreRepository.delete(id);
  }
}
