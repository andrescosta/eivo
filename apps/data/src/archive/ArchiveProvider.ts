import { DataSource } from 'typeorm';
import { ArchiveEntry } from '../entities/ArchiveEntry';

export const archiveProvider = [
    {
        provide: 'ARCHIVE_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(ArchiveEntry),
        inject: ['DATA_SOURCE'],
    },
];
