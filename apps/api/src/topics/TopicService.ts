import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Topic } from '../entities/Topic.entity';
import { EntityNotFoundError } from '../entities/EntityNotFoundError.entity';

@Injectable()
export class TopicService {
  constructor(
    @Inject('TOPIC_REPOSITORY')
    private readonly topicRepository: Repository<Topic>,
  ) {}

  async create(topic: Topic): Promise<Topic> {
    return this.topicRepository.save(topic);
  }

  async findAll(): Promise<Topic[]> {
    return this.topicRepository.find();
  }

  async findOne(id: string): Promise<Topic | null> {
    return this.topicRepository.findOne({ where: { id } });
  }

  async update(id: string, topic: Partial<Topic>): Promise<void> {
    const res = await this.topicRepository.update(id, topic);
    if (res.affected == 0) {
      throw new EntityNotFoundError('Topic');
    }
  }

  async remove(id: string): Promise<void> {
    const res = await this.topicRepository.delete(id);
    if (res.affected == 0) {
      throw new EntityNotFoundError('Topic');
    }
  }
}
