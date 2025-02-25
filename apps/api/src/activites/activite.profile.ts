import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, type Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Activite } from '../entities/activite.entity';
import { LvActivite } from '@lingv/contracts';

@Injectable()
export class ActiviteProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper: Mapper) => {
            createMap(mapper, Activite, LvActivite);
        };
    }
}
