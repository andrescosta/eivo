import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Jeu } from '../entities/jeu.entity';

@Injectable()
export class JeuxService {
  constructor(
    @InjectRepository(Jeu)
    private readonly jeuRepository: Repository<Jeu>,
  ) {}

  async create(jeu: Jeu): Promise<Jeu> {
    return this.jeuRepository.save(jeu);
  }

  async findAll(): Promise<Jeu[]> {
    return this.jeuRepository.find();
  }

  async findOne(id: string): Promise<Jeu | null> {
    return this.jeuRepository.findOne({ where: { id } });
  }

  async update(id: string, jeu: Partial<Jeu>): Promise<void> {
    await this.jeuRepository.update(id, jeu);
  }

  async remove(id: string): Promise<void> {
    await this.jeuRepository.delete(id);
  }
}
