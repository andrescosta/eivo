import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, type Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Domain } from '../entities/Domain.entity';
import { LvDomain } from '@lingv/contracts';

@Injectable()
export class DomainProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper: Mapper) => {
            createMap(mapper, Domain, LvDomain);
            createMap(mapper, LvDomain, Domain);
        };
    }
}
