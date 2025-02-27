import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Utilisateur } from '../entities/utilisateur.entity';

@Injectable()
export class UtilisateursService {
  constructor(
    @Inject('UTILISATEUR_REPOSITORY')
    private readonly utilisateurRepository: Repository<Utilisateur>,
  ) {}

  async create(utilisateur: Utilisateur): Promise<Utilisateur> {
    return this.utilisateurRepository.save(utilisateur);
  }

  async findAll(): Promise<Utilisateur[]> {
    return this.utilisateurRepository.find();
  }

  async findOne(id: number): Promise<Utilisateur | null> {
    return this.utilisateurRepository.findOne({ where: { id } });
  }

  async update(id: number, utilisateur: Partial<Utilisateur>): Promise<void> {
    await this.utilisateurRepository.update(id, utilisateur);
  }

  async remove(id: number): Promise<void> {
    await this.utilisateurRepository.delete(id);
  }
}
