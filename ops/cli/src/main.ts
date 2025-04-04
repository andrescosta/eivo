import { CommandFactory } from 'nest-commander';
import { DbCommandModule } from './commands/db/db.cmd.module';
import { AppCommandModule } from './commands/app/app.cmd.module';
import { NestFactory } from '@nestjs/core';

const bootstrap = async () => {
  try {
    console.log('Running command...', __dirname);
    // const app = await NestFactory.create(CliAppModule);
    
    // not ideal hack but ...
    if (contains(process.argv, 'db:')) {
      await CommandFactory.run(DbCommandModule);
    } else {
      const app = await NestFactory.create(AppCommandModule);
      await CommandFactory.run(AppCommandModule);
    }
  } catch (error) {
    console.log(error);
  }
};

const contains = (args: string[], preffix: string): Boolean => {
  for (const a of args) {
    if (a.startsWith(preffix)) {
      return true;
    }
  }
  return false;
};
bootstrap();