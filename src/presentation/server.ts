import { SendEmailLogs } from './../domain/use-cases/email/send-email-logs';
import { CheckService } from '../domain/use-cases/checks/check-service';
import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email.service';
import { MongoLogDatasource } from '../infrastructure/datasources/mongo-log.datasource';

const logRepository = new LogRepositoryImpl(
  // new FileSystemDataSource()
  new MongoLogDatasource()
);
const emailService = new EmailService();

export class Server {
  public static start() {
    console.log('Server running...');

    // new SendEmailLogs(emailService, fileSystemLogRepository).execute(
    //   'xiopito2@gmail.com'
    // );

    CronService.createJob('*/5 * * * * *', () => {
      const url = 'https://google.com';

      new CheckService(
        logRepository,
        () => console.log(`${url} is OK`),
        (error) => console.log(error)
      ).execute(url);
    });
  }
}
