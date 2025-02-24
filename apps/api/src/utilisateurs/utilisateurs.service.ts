import { Injectable } from '@nestjs/common';
import { Utilisateur  } from '../entities/utilisateur.entity';

@Injectable()
export class UtilisateursService {
  create(utilisateur: Utilisateur) {
    return 'This action adds a new utilisateur';
  }

  findAll() {
    return `This action returns all utilisateurs`;
  }

  findOne(id: number) {
    const u  = new Utilisateur();
    u.id = 1;
    u.nom = 'toto';
    return u;
  }

  update(id: number, utilisateur: Utilisateur) {
    return `This action updates a #${id} utilisateur`;
  }

  remove(id: number) {
    return `This action removes a #${id} utilisateur`;
  }
}
