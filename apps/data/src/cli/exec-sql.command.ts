import { Command, CommandRunner, Option } from 'nest-commander';
import { SQLExecutorService } from '../database/sqlexecutor.service';


@Command({
  name: 'exec-sql',
  arguments: '<script>',
  description: 'Execute the provided SQL script.',
  options: { isDefault: true },
})
export class ExecSqlCommand extends CommandRunner {
  constructor(private readonly executorService: SQLExecutorService) {
    super();
  }
  async run(params: string[], options: Record<string, string>): Promise<void> {
    const uri = options['uri'] ?? this.getUri('postgres');
    this.executorService.execute(params[0], uri);
  }

  //postgres://postgres:postgres@db.jobico.local:5432/postgres?ssl=true&sslmode=no-verify

  @Option({
    flags: '-u, --uri <uri>',
    description: 'Connection URI. Format: pg-connection-string',
  })
  parseConnectionURI(val: string) {
    return val;
  }

  getUri(db: string): string {
    let newuri = `postgres://${process.env.DB_USER}:${process.env.DB_USER_PWD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${db}?1=1`;
    if (process.env.DB_SSL != null) {
      newuri += '&ssl=true';
    }
    Object.keys(process.env)
      .filter((key) => key.startsWith('DB_URI_Q_'))
      .forEach((key) => {
        newuri += '&' + process.env[key];
      });
    return newuri;
  }
}
