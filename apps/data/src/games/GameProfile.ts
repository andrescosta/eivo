import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, type Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Game } from '../entities/Game';
import { LvGame } from '@lingv/contracts';

@Injectable()
export class GameProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper: Mapper) => {
            createMap(mapper, Game, LvGame);
            createMap(mapper, LvGame, Game);
        };
    }
}
