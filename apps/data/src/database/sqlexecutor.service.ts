import { Injectable, Logger } from '@nestjs/common';
import { Client, ClientConfig } from 'pg';
import * as fs from 'fs/promises';
import { SQLCommandError } from './sqlcommand.error';

@Injectable()
export class SQLExecutorService {
  async execute(script: string, uri: string): Promise<void> {
    const commands = (await fs.readFile(script, 'utf8'))
      .split(';')
      .map((command) => command.trim())
      .filter((command) => command != '');

    console.log(`Executing ${script}`);
    await this.executeCommands(commands, uri);
    console.log(`${script} was executed successfully`);
  }

  async executeCommands(commands: Array<string>, uri: string): Promise<void> {
    let client = new Client(uri);
    try {
      await client.connect();
      for (const command of commands) {
        try {
          if (command.startsWith('\\c ')) {
            const cCmd = command.split(' ');
            if (cCmd.length < 2) {
              throw new Error('With command \c database name is required.');
            }
            const db = cCmd[1];
            console.log('Switching to database:', db);
            client.end();
            const newuri = this.uriForDB(uri, db);
            client = new Client(newuri);
            client.connect();
            console.log('Switched to database:', db);
          } else {
            await client.query(command + ';');
          }
        } catch (error) {
          throw new SQLCommandError(command, error);
        }
      }
    } finally {
      await client.end();
    }
  }
  uriForDB(uri:string, db:string):string{
    // format: postgres://<user>:<password>@<host>:<port>/<database>?<query>
    return uri.replace(/(postgres:\/\/[^\/]+\/)[^?]+/, `$1${db}`);
 }
}
