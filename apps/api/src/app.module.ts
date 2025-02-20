import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UtilisateursModule } from './utilisateurs/utilisateurs.module';

@Module({
  imports: [UtilisateursModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
