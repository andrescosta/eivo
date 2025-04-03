import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { gameProvider } from './game.provider';
import { DatabaseModule } from '../../common/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [GameController],
  providers: [...gameProvider, GameService],
})
export class JeuxModule {}
