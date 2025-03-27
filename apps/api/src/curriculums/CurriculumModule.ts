import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { curriculumProvider } from './CurriculumProvider';

@Module({
  imports: [DatabaseModule],
  // controllers: [ApplicationController],
  providers: [...curriculumProvider], //, ApplicationService, ApplicationProfile],
  exports: [...curriculumProvider],
})
export class CurriculumModule {}
