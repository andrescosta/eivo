import { Injectable, Logger } from '@nestjs/common';
import { Client } from 'pg';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class DatabaseInitService {
  private readonly logger = new Logger(DatabaseInitService.name);

  async initializeDatabase(): Promise<void> {
    const config = {
      host: process.env.DB_HOST || 'db.jobico.local',
      port: parseInt(process.env.DB_PORT || '5432'),
      user: 'postgres',
      database: 'postgres',
      password: 'postgres',
      ssl: {
        rejectUnauthorized: false,
        // ca: fs.readFileSync('/path/to/server-certificates/root.crt').toString(),
        // key: fs.readFileSync('/path/to/client-key/postgresql.key').toString(),
        // cert: fs.readFileSync('/path/to/client-certificates/postgresql.crt').toString(),
      },
    };
    let superClient = new Client(config);

    try {
      await superClient.connect();
      const scriptPath = path.join(
        __dirname,
        '../../../../../_infra/bd/creds.sql',
      );
      const sqlScript = await fs.readFile(scriptPath, 'utf8');
      const commands = sqlScript.split(';');
      for (let command of commands) {
        command = command.trim();
        if (command != '') {
          try {
            if (command.startsWith('\\connect')) {
              if (command.split(' ').length < 2) {
                throw new Error('Database name is required');
              }
              superClient.end();
              const db = command.split(' ')[1];
              console.log('Connecting to database:', db);
              superClient = new Client({ ...config, database: db });
              superClient.connect();
              console.log('Connected to database:', db);
              continue;
            } else {
              await superClient.query(command + ';');
            }
          } catch (error) {
            console.log('Command -->>>', command.trim());
            throw error;
          }
        }
      }
      // this.logger.log('Database initialization completed successfully');
      console.log('Database initialization completed successfully');
    } catch (error) {
      // this.logger.error('Failed to initialize database:', error);
      console.log('Failed to initialize database:', error);
      throw error;
    } finally {
      await superClient.end();
    }
  }
}
