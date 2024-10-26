import { CronService } from './cron/cron-service';

export class Server {
  public static start() {
    console.log('Server running...');

    CronService.createJob('*/5 * * * * *', () => {
      console.log('5 Seconds');
    });
  }
}
