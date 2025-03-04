import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, NotFoundException } from '@nestjs/common';
import { DomainService } from './DomainService';
import { Domain } from '../entities/Domain';
import { LvDomain } from '@lingv/contracts';
import { MapInterceptor } from '@automapper/nestjs';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { EntityNotFoundError } from '../entities/EntityNotFoundError';

@Controller('domains')
export class DomainController {
  constructor(private readonly domainService: DomainService) {}

  @Post()
  @UseInterceptors(MapInterceptor(Domain, LvDomain))
  @UseInterceptors(MapInterceptor(LvDomain, Domain))
  @ApiResponse({ type: LvDomain })
  @ApiBody({ type: LvDomain })
  async create(@Body() domain: Domain): Promise<Domain> {
    return await this.domainService.create(domain);
  }

  @Get()
  @ApiResponse({ type: LvDomain, isArray: true })
  @UseInterceptors(
    MapInterceptor(Domain, LvDomain, { isArray: true }),
  )
  async findAll(): Promise<Domain[]> {
    return this.domainService.findAll();
  }

  @Get(':id')
  @UseInterceptors(MapInterceptor(Domain, LvDomain))
  @ApiResponse({ type: LvDomain, isArray: false })
  async findOne(@Param('id') id: string): Promise<Domain | null> {
    return this.domainService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(MapInterceptor(LvDomain, Domain))
  @ApiBody({ type: LvDomain })
  async update(
    @Param('id') id: string,
    @Body() utilisateur: Domain,
  ): Promise<Domain> {
    try {
      return this.domainService.update(+id, utilisateur);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    try {
      this.domainService.remove(+id);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
