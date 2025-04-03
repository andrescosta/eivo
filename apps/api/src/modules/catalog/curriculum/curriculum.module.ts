import { Module } from '@nestjs/common';
import { curriculumProvider } from './curriculum.provider';
import { DatabaseModule } from '../../common/database/database.module';

@Module({
  imports: [DatabaseModule],
  // controllers: [ApplicationController],
  providers: [...curriculumProvider], //, ApplicationService, ApplicationProfile],
  exports: [...curriculumProvider],
})
export class CurriculumModule {}
