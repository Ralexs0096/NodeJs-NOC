import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository';
import { CronService } from './cron/cron-service';
import { MongoLogDatasource } from '../infrastructure/datasources/mongo-log.datasource';
import { PostgresLogDatasource } from '../infrastructure/datasources/postgres-log.datasource';
import { CheckServiceMultiple } from '../domain/use-cases/checks/check-service-multiple';

const fsLogRepository = new LogRepositoryImpl(new FileSystemDataSource());
const mongoLogRepository = new LogRepositoryImpl(new MongoLogDatasource());
const postgresRepository = new LogRepositoryImpl(new PostgresLogDatasource());

export class Server {
  public static start() {
    console.log('Server running...');

    CronService.createJob('*/5 * * * * *', () => {
      const url = 'https://google.com';

      new CheckServiceMultiple(
        [fsLogRepository, mongoLogRepository, postgresRepository],
        () => console.log(`${url} is OK`),
        (error) => console.log(error)
      ).execute(url);
    });
  }
}
