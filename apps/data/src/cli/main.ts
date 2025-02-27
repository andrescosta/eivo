import { CommandFactory } from 'nest-commander';
import { AppModule } from './app.module';

const bootstrap = async () => {
  console.log('Running command...');
  await CommandFactory.run(AppModule, {
    errorHandler: (err) => {
      console.log('An error occurred');
      console.log(err.message);
      process.exit(0);
    },
  });
};

bootstrap();