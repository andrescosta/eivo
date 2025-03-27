// import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, NotFoundException } from '@nestjs/common';
// import { ArchiveService } from './ArchiveService';
// import { ArchiveEntry } from '../entities/ArchiveEntry.entity';
// import { LvArchiveEntry } from '@eivo/contracts';
// import { MapInterceptor } from '@automapper/nestjs';
// import { ApiBody, ApiResponse } from '@nestjs/swagger';
// import { EntityNotFoundError } from '../entities/EntityNotFoundError.entity';

// @Controller('archive')
// export class ArchiveController {
//   constructor(private readonly archiveService: ArchiveService) {}

//   @Post()
//   @UseInterceptors(MapInterceptor(ArchiveEntry, LvArchiveEntry))
//   @UseInterceptors(MapInterceptor(LvArchiveEntry, ArchiveEntry))
//   @ApiResponse({ type: LvArchiveEntry })
//   @ApiBody({ type: LvArchiveEntry })
//   async create(@Body() domain: ArchiveEntry): Promise<ArchiveEntry> {
//     return await this.archiveService.create(domain);
//   }

//   @Get()
//   @ApiResponse({ type: LvArchiveEntry, isArray: true })
//   @UseInterceptors(
//     MapInterceptor(ArchiveEntry, LvArchiveEntry, { isArray: true }),
//   )
//   async findAll(): Promise<ArchiveEntry[]> {
//     return this.archiveService.findAll();
//   }

//   @Get(':id')
//   @UseInterceptors(MapInterceptor(ArchiveEntry, LvArchiveEntry))
//   @ApiResponse({ type: LvArchiveEntry, isArray: false })
//   async findOne(@Param('id') id: string): Promise<ArchiveEntry | null> {
//     return this.archiveService.findOne(+id);
//   }

//   @Patch(':id')
//   @UseInterceptors(MapInterceptor(LvArchiveEntry, ArchiveEntry))
//   @ApiBody({ type: LvArchiveEntry })
//   async update(
//     @Param('id') id: string,
//     @Body() utilisateur: ArchiveEntry,
//   ): Promise<ArchiveEntry> {
//     try {
//       return this.archiveService.update(+id, utilisateur);
//     } catch (error) {
//       if (error instanceof EntityNotFoundError) {
//         throw new NotFoundException(error.message);
//       }
//       throw error;
//     }
//   }

//   @Delete(':id')
//   async remove(@Param('id') id: string): Promise<void> {
//     try {
//       this.archiveService.remove(+id);
//     } catch (error) {
//       if (error instanceof EntityNotFoundError) {
//         throw new NotFoundException(error.message);
//       }
//       throw error;
//     }
//   }
// }
