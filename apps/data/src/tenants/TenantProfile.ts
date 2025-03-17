import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, type Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Tenant } from '../entities/Tenant';
import { LvTenant } from '@lingv/contracts';

@Injectable()
export class TenantProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper: Mapper) => {
            createMap(mapper, Tenant, LvTenant);
        };
    }
}
