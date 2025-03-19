import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/User.entity';
import { EntityNotFoundError as EntityNotFoundError } from '../entities/EntityNotFoundError.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async create(utilisateur: User): Promise<User> {
    return this.userRepository.save(utilisateur);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async update(id: number, user: User): Promise<User> {
    const res = await this.userRepository.update(id, user);
    if (res.affected == 0) {
      throw(new EntityNotFoundError("User"))
    }
    return user;
  }

  async remove(id: number): Promise<void> {
    const res = await this.userRepository.delete(id);
    if (res.affected == 0){
      throw(new EntityNotFoundError("User"))
    }
  }
}
