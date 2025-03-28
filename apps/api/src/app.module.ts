import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { AppService } from './app.service';
import { TenantModule } from './tenants/TenantModule';
import { CurriculumModule } from './curriculums/CurriculumModule';

@Module({
  imports: [
    // UserModule,
    // MemberModule,
    // ActivityModule,
    // JeuxModule,
    TenantModule,
    CurriculumModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
