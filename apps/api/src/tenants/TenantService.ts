import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Tenant } from '../entities/Tenant.entity';
import { EntityNotFoundError } from '../entities/EntityNotFoundError';

@Injectable()
export class TenantService {
  constructor(
    @Inject('TENANT_REPOSITORY')
    private readonly tenantRepository: Repository<Tenant>,
  ) {}

  create(tenant: Tenant): Tenant {
    // tenant.curriculums[0].tenant = tenant;
    // tenant.schemas[0].tenant = tenant;
    return this.tenantRepository.create(tenant);
  }
  async save(tenant: Tenant): Promise<Tenant> {
    return await this.tenantRepository.save(tenant);
  }

  async findAll(): Promise<Tenant[]> {
    return this.tenantRepository.find();
  }

  async findOne(id: number): Promise<Tenant | null> {
    return this.tenantRepository.findOne({ where: { id } });
  }

  async update(id: string, tenant: Partial<Tenant>): Promise<void> {
    const res = await this.tenantRepository.update(id, tenant);
    if (res.affected == 0) {
      throw new EntityNotFoundError('Tenant');
    }
  }

  async remove(id: string): Promise<void> {
    const res = await this.tenantRepository.delete(id);
    if (res.affected == 0) {
      throw new EntityNotFoundError('Tenant');
    }
  }
}
