import fs from 'fs';
import { LogDataSource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

export class FileSystemDataSource implements LogDataSource {
  private readonly logPath = 'logs/';
  private readonly allLogsPath = 'logs/log-low.log';
  private readonly mediumLogsPath = 'logs/log-medium.log';
  private readonly highLogsPath = 'logs/log-high.log';

  constructor() {
    this.createLogsFiles();
  }

  private createLogsFiles = () => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }

    [this.allLogsPath, this.mediumLogsPath, this.highLogsPath].forEach(
      (path) => {
        if (fs.existsSync(path)) return;
        fs.writeFileSync(path, '');
      }
    );
  };

  saveLog(log: LogEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getLogs(severityLevel: LogSeverityLevel): Promise<Array<LogEntity>> {
    throw new Error('Method not implemented.');
  }
}
