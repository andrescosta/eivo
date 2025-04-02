import { Module } from '@nestjs/common';
import { GameService } from './GameService';
import { GameController } from './GameController';
import { gameProvider } from './GameProvider';
import { DatabaseModule } from '../../common/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [GameController],
  providers: [...gameProvider, GameService],
})
export class JeuxModule {}
