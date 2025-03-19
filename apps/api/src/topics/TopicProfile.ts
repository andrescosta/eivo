import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, type Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Topic } from '../entities/Topic.entity';
import { LvTopic } from '@lingv/contracts';

@Injectable()
export class TopicProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper: Mapper) => {
            createMap(mapper, Topic, LvTopic);
            createMap(mapper, LvTopic, Topic);
        };
    }
}
