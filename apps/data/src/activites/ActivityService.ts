import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Activity } from '../entities/Activity.entity';
import { EntityNotFoundError } from '../entities/EntityNotFoundError.entity';

@Injectable()
export class ActivityService {
  constructor(
    @Inject('ACTIVITY_REPOSITORY')
    private readonly activityRepository: Repository<Activity>,
  ) {}

  async create(activity: Activity): Promise<Activity> {
    return this.activityRepository.save(activity);
  }

  async findAll(): Promise<Activity[]> {
    return this.activityRepository.find();
  }

  async findOne(id: number): Promise<Activity | null> {
    return this.activityRepository.findOne({ where: { id } });
  }

  async update(id: number, activity: Activity): Promise<Activity> {
    const res = await this.activityRepository.update(id, activity);
    if (res.affected == 0) {
      throw new EntityNotFoundError('Domain');
    }
    return activity;
  }

  async remove(id: number): Promise<void> {
    const res = await this.activityRepository.delete(id);
    if (res.affected == 0) {
      throw new EntityNotFoundError('Domain');
    }
  }
}
