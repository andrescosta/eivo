import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, type Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Topique } from '../entities/topique.entity';
import { LvTopique } from '@lingv/contracts';

@Injectable()
export class TopiqueProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper: Mapper) => {
            createMap(mapper, Topique, LvTopique);
            createMap(mapper, LvTopique, Topique);
        };
    }
}
