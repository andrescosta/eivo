import { Command, CommandRunner } from 'nest-commander';
import { DatabaseInitService } from '../database/init-database.service';

@Command({ name: 'init-db', description: 'Initialize database and users' })
export class InitDbCommand extends CommandRunner {
  constructor(private readonly databaseInitService:DatabaseInitService) {
    super();
  }

  async run(): Promise<void> {
    try {
      console.log('Initializing database...');
      this.databaseInitService.initializeDatabase();
    } catch (error) {
      console.error('Database initialization failed:', error);
      process.exit(1);
    }
  }
}