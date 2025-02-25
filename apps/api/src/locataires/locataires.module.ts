import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocatairesService } from './locataires.service';
import { LocatairesController } from './locataires.controller';
import { Locataire } from '../entities/locataire.entity';
import { LocataireProfile } from './locataire.profile';

@Module({
  imports: [TypeOrmModule.forFeature([Locataire])],
  controllers: [LocatairesController],
  providers: [LocatairesService, LocataireProfile],
})
export class LocatairesModule {}
