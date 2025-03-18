import { Module } from '@nestjs/common';
import { ApplicationModule } from '../applications/ApplicationModule';
import { LessonController } from './LessonController';
import { ApplicationService } from '../applications/ApplicationService';

@Module({
  imports: [ApplicationModule],
  controllers: [LessonController],
  providers: [ApplicationService],
})
export class LessonModule {}
