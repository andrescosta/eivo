import { Module } from '@nestjs/common';
import { ApplicationService } from './ExerciseService';
import { ExerciseController } from './ExerciseController';
import { ApplicationProfile } from './ExerciseProfile';
import { applicationProvider } from './ExerciseProvider';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ExerciseController],
  providers: [...applicationProvider, ApplicationService, ApplicationProfile],
  exports: [...applicationProvider, ApplicationService, ApplicationProfile],
})
export class ExerciseModule {}
