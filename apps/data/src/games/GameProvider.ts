import { DataSource } from 'typeorm';
import { Game } from '../entities/Game.entity';

export const gameProvider = [
    {
        provide: 'GAME_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Game),
        inject: ['DATA_SOURCE'],
    },
];
