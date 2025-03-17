import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Domain } from '../entities/Domain';
import { EntityNotFoundError } from '../entities/EntityNotFoundError';

@Injectable()
export class DomainService {
  constructor(
    @Inject('DOMAIN_REPOSITORY')
    private readonly domainRepository: Repository<Domain>,
  ) {}

  async create(domaine: Domain): Promise<Domain> {
    return this.domainRepository.save(domaine);
  }

  async findAll(): Promise<Domain[]> {
    return this.domainRepository.find();
  }

  async findOne(id: number): Promise<Domain | null> {
    return this.domainRepository.findOne({ where: { id } });
  }

  async update(id: number, domain: Domain): Promise<Domain> {
    const res = await this.domainRepository.update(id, domain);
    if (res.affected == 0) {
      throw new EntityNotFoundError('Domain');
    }
    return domain;
  }

  async remove(id: number): Promise<void> {
    const res = await this.domainRepository.delete(id);
    if (res.affected == 0) {
      throw new EntityNotFoundError('Domain');
    }
  }
}
