import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { EntityNotFoundError } from '../../common/entity/entity-not-found.error';


@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    const res = await this.userRepository.delete(id);
    if (res.affected == 0){
      throw(new EntityNotFoundError("User"))
    }
  }
}
