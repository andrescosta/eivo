import { CommandFactory } from 'nest-commander';
import { NestFactory } from '@nestjs/core';
import { AppCommandModule } from './commands/app.cmd.module';

const bootstrap = async () => {
  console.log('Running command...', __dirname);
  try {
    const app = await NestFactory.create(AppCommandModule);
    await CommandFactory.run(AppCommandModule);
  } catch (error) {
    console.error(error);
  }
};

bootstrap();
