import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, type Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Classe } from '../entities/classe.entity';
import { LvClasse } from '@lingv/contracts';

@Injectable()
export class ClasseProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper: Mapper) => {
            createMap(mapper, Classe, LvClasse);
            createMap(mapper, LvClasse, Classe);
        };
    }
}
