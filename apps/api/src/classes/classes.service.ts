import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Classe } from '../entities/classe.entity';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Classe)
    private readonly classeRepository: Repository<Classe>,
  ) {}

  async create(classe: Classe): Promise<Classe> {
    return this.classeRepository.save(classe);
  }

  async findAll(): Promise<Classe[]> {
    return this.classeRepository.find();
  }

  async findOne(id: string): Promise<Classe | null> {
    return this.classeRepository.findOne({ where: { id } });
  }

  async update(id: string, classe: Partial<Classe>): Promise<void> {
    await this.classeRepository.update(id, classe);
  }

  async remove(id: string): Promise<void> {
    await this.classeRepository.delete(id);
  }
}
