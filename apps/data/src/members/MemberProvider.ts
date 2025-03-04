import { DataSource } from 'typeorm';
import { Member } from '../entities/Member';

export const memberProvider = [
    {
        provide: 'MEMBER_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Member),
        inject: ['DATA_SOURCE'],
    },
];
