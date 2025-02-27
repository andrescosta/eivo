import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { ClasseProfile } from './classe.profile';
import { Classe } from '../entities/classe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Classe])],
  controllers: [ClassesController],
  providers: [ClassesService, ClasseProfile],
})
export class ClassesModule {}
