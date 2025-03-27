import { CommandFactory } from 'nest-commander';
import { DbCommandModule } from './commands/db/db.cmd.module';

const bootstrap = async () => {
  try {
    console.log('Running command...', __dirname);
    await CommandFactory.run(DbCommandModule);
  } catch (error) {
    console.log(error);
  }
};

bootstrap();
