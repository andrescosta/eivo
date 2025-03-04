import { Module } from '@nestjs/common';
import { TopicService } from './TopicService';
import { TopicController } from './TopicController';
import { TopicProfile } from './TopicProfile';
import { DatabaseModule } from '../database/database.module';
import { topicProviders } from './TopicProvider';

@Module({
  controllers: [TopicController],
  imports: [DatabaseModule],
  providers: [...topicProviders,TopicService, TopicProfile],
})
export class TopicModule {}
