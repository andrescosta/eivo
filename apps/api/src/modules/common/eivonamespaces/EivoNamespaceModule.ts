import { Module } from '@nestjs/common';
import { EivoNamespaceService } from './EivoNamespaceService';
import { eivoNamespaceProvider } from './EivoNamespaceProvider';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...eivoNamespaceProvider, EivoNamespaceService],
})
export class EivoNamespaceModule {}
