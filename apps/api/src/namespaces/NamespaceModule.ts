import { Module } from '@nestjs/common';
import { NamespaceService } from './NamespaceService';
import { namespaceProvider } from './NamespaceProvider';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...namespaceProvider, NamespaceService],
})
export class NamespaceModule {}
