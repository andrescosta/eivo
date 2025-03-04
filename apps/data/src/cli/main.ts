import { CommandFactory } from 'nest-commander';
import { AppModule } from './app.module';

const bootstrap = async () => {
  console.log('Running command...');
  await CommandFactory.run(AppModule);
};

bootstrap();
