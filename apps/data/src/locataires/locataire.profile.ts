import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, type Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Locataire } from '../entities/locataire.entity';
import { LvLocataire } from '@lingv/contracts';

@Injectable()
export class LocataireProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper: Mapper) => {
            createMap(mapper, Locataire, LvLocataire);
        };
    }
}
