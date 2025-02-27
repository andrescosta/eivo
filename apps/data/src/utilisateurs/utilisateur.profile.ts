import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, type Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Utilisateur } from '../entities/utilisateur.entity';
import { LvUtilisateur } from '@lingv/contracts';

@Injectable()
export class UtilisateurProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper: Mapper) => {
            createMap(mapper, Utilisateur, LvUtilisateur);
            createMap(mapper, LvUtilisateur, Utilisateur);
        };
    }
}