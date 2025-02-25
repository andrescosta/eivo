import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, type Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Domaine } from '../entities/domain.entity';
import { LvDomaine } from '@lingv/contracts';

@Injectable()
export class DomaineProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper: Mapper) => {
            createMap(mapper, Domaine, LvDomaine);
            createMap(mapper, LvDomaine, Domaine);
        };
    }
}
