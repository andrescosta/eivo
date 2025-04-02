import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { AppService } from './app.service';
import { EivoNamespaceModule } from './modules/common/eivonamespaces/EivoNamespaceModule';
import { CurriculumModule } from './modules/catalog/curriculums/CurriculumModule';

@Module({
  imports: [
    // UserModule,
    // MemberModule,
    // ActivityModule,
    // JeuxModule,
    EivoNamespaceModule,
    CurriculumModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
