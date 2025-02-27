import { Module } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { ClasseProfile } from './classe.profile';
import { classeProviders } from './classe.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ClassesController],
  providers: [...classeProviders, ClassesService, ClasseProfile],
})
export class ClassesModule {}
