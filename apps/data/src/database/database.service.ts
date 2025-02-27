import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import * as fs from 'fs/promises';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';

export const getDatabaseConfig = (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get('DB_HOST', 'localhost'),
    port: configService.get('DB_PORT', 5432),
    username: configService.get('DB_USER', 'lingv_service'),
    password: configService.get('DB_PASSWORD', 'lingv_service_2024'),
    database: configService.get('DB_NAME', 'lingv'),
    schema: configService.get('DB_SCHEMA', 'app')
  });

@Injectable()
export class DatabaseService {
  private readonly pool: Pool;

  constructor(private readonly configService: ConfigService) {
    this.pool = new Pool(getDatabaseConfig(configService));
  }

  async executeSqlFile(filePath: string): Promise<void> {
    try {
      const sql = await fs.readFile(filePath, 'utf8');
      const client = await this.pool.connect();
      
      try {
        await client.query('BEGIN');
        await client.query(sql);
        await client.query('COMMIT');
      } catch (error) {
        await client.query('ROLLBACK');
        throw error;
      } finally {
        client.release();
      }
    } catch (error) {
        if (error instanceof Error) {
      throw new Error(`Error executing SQL file: ${error.message}`);
        }
    }
  }
}