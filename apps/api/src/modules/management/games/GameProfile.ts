import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, type Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Game } from '../entities/Game.entity';
import { GameData } from '@eivo/contracts';

@Injectable()
export class GameProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper: Mapper) => {
            createMap(mapper, Game, GameData);
            createMap(mapper, GameData, Game);
        };
    }
}
