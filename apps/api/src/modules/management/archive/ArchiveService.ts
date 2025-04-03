// import { Injectable, Inject } from '@nestjs/common';
// import { Repository } from 'typeorm';
// import { ArchiveEntry } from '../../entities/ArchiveEntry.entity';
// import { EntityNotFoundError } from '../../entities/EntityNotFoundError.entity';

// @Injectable()
// export class ArchiveService {
//   constructor(
//     @Inject('ARCHIVE_REPOSITORY')
//     private readonly historiqueRepository: Repository<ArchiveEntry>,
//   ) {}

//   async create(historique: ArchiveEntry): Promise<ArchiveEntry> {
//     return this.historiqueRepository.save(historique);
//   }

//   async findAll(): Promise<ArchiveEntry[]> {
//     return this.historiqueRepository.find();
//   }

//   async findOne(id: number): Promise<ArchiveEntry | null> {
//     return this.historiqueRepository.findOne({ where: { id } });
//   }

//   async update(id: number, archiveEntry: ArchiveEntry): Promise<ArchiveEntry> {
//     const res = await this.historiqueRepository.update(id, archiveEntry);
//     if (res.affected == 0) {
//       throw new EntityNotFoundError('Game');
//     }
//     return archiveEntry;
//   }

//   async remove(id: number): Promise<void> {
//     const res = await this.historiqueRepository.delete(id);
//     if (res.affected == 0) {
//       throw new EntityNotFoundError('Game');
//     }
//   }
// }
