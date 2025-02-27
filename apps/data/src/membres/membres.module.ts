import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembresService } from './membres.service';
import { MembresController } from './membres.controller';
import { Membre } from '../entities/membre.entity';
import { MembreProfile } from './membre.profile';

@Module({
  imports: [TypeOrmModule.forFeature([Membre])],
  controllers: [MembresController],
  providers: [MembresService, MembreProfile],
})
export class MembresModule {}
