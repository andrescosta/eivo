import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  NotFoundException,
} from '@nestjs/common';
import { TenantService } from './TenantService';
import { Tenant } from '../entities/Tenant.entity';
import { LvTenant } from '@lingv/contracts';
import { MapInterceptor } from '@automapper/nestjs';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { EntityNotFoundError } from '../entities/EntityNotFoundError.entity';

@Controller('tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post()
  @UseInterceptors(MapInterceptor(Tenant, LvTenant))
  @UseInterceptors(MapInterceptor(LvTenant, Tenant))
  @ApiResponse({ type: LvTenant })
  @ApiBody({ type: LvTenant })
  async create(@Body() tenant: Tenant): Promise<Tenant> {
    return this.tenantService.create(tenant);
  }

  @Get()
  @ApiResponse({ type: LvTenant, isArray: true })
  @UseInterceptors(MapInterceptor(Tenant, LvTenant, { isArray: true }))
  async findAll(): Promise<Tenant[]> {
    return this.tenantService.findAll();
  }

  @Get(':id')
  @UseInterceptors(MapInterceptor(Tenant, LvTenant))
  @ApiResponse({ type: LvTenant, isArray: false })
  async findOne(@Param('id') id: string): Promise<Tenant | null> {
    return this.tenantService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(MapInterceptor(LvTenant, Tenant))
  @ApiBody({ type: LvTenant })
  async update(
    @Param('id') id: string,
    @Body() locataire: Tenant,
  ): Promise<void> {
    try {
      return this.tenantService.update(id, locataire);
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
      return this.tenantService.remove(id);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
