import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, type Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Jeu } from '../entities/jeu.entity';
import { LvJeu } from '@lingv/contracts';

@Injectable()
export class JeuProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper: Mapper) => {
            createMap(mapper, Jeu, LvJeu);
            createMap(mapper, LvJeu, Jeu);
        };
    }
}
