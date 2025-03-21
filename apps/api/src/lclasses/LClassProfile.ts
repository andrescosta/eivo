import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, type Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Curriculum } from '../entities/Curriculum.entity';
import { LvClass } from '@lingv/contracts';

@Injectable()
export class LClassProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper: Mapper) => {
            createMap(mapper, Curriculum, LvClass);
            createMap(mapper, LvClass, Curriculum);
        };
    }
}
