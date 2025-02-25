import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopiquesService } from './topiques.service';
import { TopiquesController } from './topiques.controller';
import { TopiqueProfile } from './topique.profile';
import { Topique } from '../entities/topique.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Topique])],
  controllers: [TopiquesController],
  providers: [TopiquesService, TopiqueProfile],
})
export class TopiquesModule {}
