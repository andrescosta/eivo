import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Tenant } from '../entities/Tenant';
import { EntityNotFoundError } from '../entities/EntityNotFoundError';

@Injectable()
export class TenantService {
  constructor(
    @Inject('LOCATAIRE_REPOSITORY')
    private readonly tenantRepository: Repository<Tenant>,
  ) {}

  async create(tenant: Tenant): Promise<Tenant> {
    return this.tenantRepository.save(tenant);
  }

  async findAll(): Promise<Tenant[]> {
    return this.tenantRepository.find();
  }

  async findOne(id: string): Promise<Tenant | null> {
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
