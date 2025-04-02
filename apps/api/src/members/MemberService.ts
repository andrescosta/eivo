import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Member } from '../entities/Member.entity';
import { EntityNotFoundError } from '../entities/EntityNotFoundError';


@Injectable()
export class MemberService {
  constructor(
    @Inject('MEMBER_REPOSITORY')
    private readonly membreRepository: Repository<Member>,
  ) {}

  async save(membre: Member): Promise<Member> {
    return this.membreRepository.save(membre);
  }

  async findAll(): Promise<Member[]> {
    return this.membreRepository.find();
  }

  async findOne(id: number): Promise<Member | null> {
    return this.membreRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    const res = await this.membreRepository.delete(id);
    if (res.affected == 0) {
      throw new EntityNotFoundError('Namespace');
    }
  }
}
