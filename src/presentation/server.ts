import { CheckService } from '../domain/use-cases/checks/check-service';
import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository';
import { CronService } from './cron/cron-service';

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDataSource()
);

export class Server {
  public static start() {
    console.log('Server running...');

    CronService.createJob('*/5 * * * * *', () => {
      const url = 'https://google.com';
      // const url = 'https://localhost:3000';

      new CheckService(
        fileSystemLogRepository,
        () => console.log(`${url} is OK`),
        (error) => console.log(error)
      ).execute(url);
    });
  }
}
