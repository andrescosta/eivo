import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Game } from '../entities/Game.entity';
import { EntityNotFoundError } from '../../common/entities/EntityNotFoundError';


@Injectable()
export class GameService {
  constructor(
    @Inject('GAME_REPOSITORY')
    private readonly gameRepository: Repository<Game>,
  ) {}

  async save(game: Game): Promise<Game> {
    return this.gameRepository.save(game);
  }

  async findAll(): Promise<Game[]> {
    return this.gameRepository.find();
  }

  async findOne(id: number): Promise<Game | null> {
    return this.gameRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    const res = await this.gameRepository.delete(id);
    if (res.affected == 0) {
      throw new EntityNotFoundError('Game');
    }
  }
}
