import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { EivoNamespace } from '../entities/EivoNamespace.entity';
import { EntityNotFoundError } from '../entities/EntityNotFoundError';

@Injectable()
export class EivoNamespaceService {
  constructor(
    @Inject('NAMESPACE_REPOSITORY')
    private readonly namespaceRepository: Repository<EivoNamespace>,
  ) {}

  async save(eivoNamespace: EivoNamespace): Promise<EivoNamespace> {
    return await this.namespaceRepository.save(eivoNamespace);
  }

  async findAll(): Promise<EivoNamespace[]> {
    return this.namespaceRepository.find();
  }

  async findOne(id: number): Promise<EivoNamespace | null> {
    return this.namespaceRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    const res = await this.namespaceRepository.delete(id);
    if (res.affected == 0) {
      throw new EntityNotFoundError('Namespace');
    }
  }
}
