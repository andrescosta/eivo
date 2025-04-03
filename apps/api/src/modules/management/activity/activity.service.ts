import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Activity } from '../entity/activity.entity';
import { EntityNotFoundError } from '../../common/entity/entity-not-found.error';


@Injectable()
export class ActivityService {
  constructor(
    @Inject('ACTIVITY_REPOSITORY')
    private readonly activityRepository: Repository<Activity>,
  ) {}

  async save(activity: Activity): Promise<Activity> {
    return this.activityRepository.save(activity);
  }

  async findAll(): Promise<Activity[]> {
    return this.activityRepository.find();
  }

  async findOne(id: number): Promise<Activity | null> {
    return this.activityRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    const res = await this.activityRepository.delete(id);
    if (res.affected == 0) {
      throw new EntityNotFoundError('Domain');
    }
  }
}
