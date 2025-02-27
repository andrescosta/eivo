import { Module } from '@nestjs/common';
import { JeuxService } from './jeux.service';
import { JeuxController } from './jeux.controller';
import { jeuProviders } from './jeu.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [JeuxController],
  providers: [...jeuProviders, JeuxService],
})
export class JeuxModule {}
