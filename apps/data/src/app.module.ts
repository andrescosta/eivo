import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/UserModule';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { TenantModule } from './tenants/TenantModule';
import { DomainModule } from './domains/DomainModule';
import { LClassModule } from './lclasses/LClassModule';
import { MemberModule } from './members/MemberModule';
import { ArchiveModule } from './archive/ArchiveModule';
import { ActivityModule } from './activites/ActivityModule';
import { TopicModule } from './topics/TopicModule';
import { ApplicationModule } from './applications/ApplicationModule';
import { JeuxModule } from './games/GameModule';
import { ExerciseModule } from './exercises/ExerciseModule';
import { LessonModule } from './lessons/LessonModule';

@Module({
  imports: [
    UserModule,
    TenantModule,
    UserModule,
    DomainModule,
    LClassModule,
    MemberModule,
    ArchiveModule,
    ActivityModule,
    TopicModule,
    ApplicationModule,
    JeuxModule,
    ExerciseModule,
    LessonModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
