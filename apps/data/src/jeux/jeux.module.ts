import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JeuxService } from './jeux.service';
import { JeuxController } from './jeux.controller';
import { Jeu } from '../entities/jeu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Jeu])],
  controllers: [JeuxController],
  providers: [JeuxService],
})
export class JeuxModule {}
