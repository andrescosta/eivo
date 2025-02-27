import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Locataire } from '../entities/locataire.entity';

@Injectable()
export class LocatairesService {
  constructor(
    @InjectRepository(Locataire)
    private readonly locataireRepository: Repository<Locataire>,
  ) {}

  async create(locataire: Locataire): Promise<Locataire> {
    return this.locataireRepository.save(locataire);
  }

  async findAll(): Promise<Locataire[]> {
    return this.locataireRepository.find();
  }

  async findOne(id: string): Promise<Locataire | null> {
    return this.locataireRepository.findOne({ where: { id } });
  }

  async update(id: string, locataire: Partial<Locataire>): Promise<void> {
    await this.locataireRepository.update(id, locataire);
  }

  async remove(id: string): Promise<void> {
    await this.locataireRepository.delete(id);
  }
}
