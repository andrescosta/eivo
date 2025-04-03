import { DataSource } from 'typeorm';
import { Game } from '../entity/game.entity';

export const gameProvider = [
    {
        provide: 'GAME_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Game),
        inject: ['DATA_SOURCE'],
    },
];
