import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Namespace } from '../entities/Namespace.entity';
import { EntityNotFoundError } from '../entities/EntityNotFoundError';

@Injectable()
export class NamespaceService {
  constructor(
    @Inject('NAMESPACE_REPOSITORY')
    private readonly namespaceRepository: Repository<Namespace>,
  ) {}

  create(namespace: Namespace): Namespace {
    return this.namespaceRepository.create(namespace);
  }
  async save(namespace: Namespace): Promise<Namespace> {
    return await this.namespaceRepository.save(namespace);
  }

  async findAll(): Promise<Namespace[]> {
    return this.namespaceRepository.find();
  }

  async findOne(id: number): Promise<Namespace | null> {
    return this.namespaceRepository.findOne({ where: { id } });
  }

  async update(id: string, namespace: Partial<Namespace>): Promise<void> {
    const res = await this.namespaceRepository.update(id, namespace);
    if (res.affected == 0) {
      throw new EntityNotFoundError('Namespace');
    }
  }

  async remove(id: string): Promise<void> {
    const res = await this.namespaceRepository.delete(id);
    if (res.affected == 0) {
      throw new EntityNotFoundError('Namespace');
    }
  }
}
