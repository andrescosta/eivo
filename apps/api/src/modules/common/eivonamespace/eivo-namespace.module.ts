import { Module } from '@nestjs/common';
import { EivoNamespaceService } from './eivo-namespace.service';
import { eivoNamespaceProvider } from './eivo-namespace.provider';
import { DatabaseModule } from '../../common/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...eivoNamespaceProvider, EivoNamespaceService],
})
export class EivoNamespaceModule {}
