import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Member } from '../entities/Member';
import { EntityNotFoundError } from '../entities/EntityNotFoundError';

@Injectable()
export class MemberService {
  constructor(
    @Inject('MEMBER_REPOSITORY')
    private readonly membreRepository: Repository<Member>,
  ) {}

  async create(membre: Member): Promise<Member> {
    return this.membreRepository.save(membre);
  }

  async findAll(): Promise<Member[]> {
    return this.membreRepository.find();
  }

  async findOne(id: number): Promise<Member | null> {
    return this.membreRepository.findOne({ where: { id } });
  }

  async update(id: number, membre: Partial<Member>): Promise<void> {
    const res = await this.membreRepository.update(id, membre);
    if (res.affected == 0) {
      throw new EntityNotFoundError('Tenant');
    }
  }

  async remove(id: number): Promise<void> {
    const res = await this.membreRepository.delete(id);
    if (res.affected == 0) {
      throw new EntityNotFoundError('Tenant');
    }
  }
}
