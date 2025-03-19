import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, type Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { ArchiveEntry } from '../entities/ArchiveEntry.entity';
import { LvArchiveEntry } from '@lingv/contracts';

@Injectable()
export class ArchiveProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper: Mapper) => {
            createMap(mapper, ArchiveEntry, LvArchiveEntry);
        };
    }
}
