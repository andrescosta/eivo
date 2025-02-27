import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, type Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Historique } from '../entities/historique.entity';
import { LvHistorique } from '@lingv/contracts';

@Injectable()
export class HistoriqueProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper: Mapper) => {
            createMap(mapper, Historique, LvHistorique);
        };
    }
}
