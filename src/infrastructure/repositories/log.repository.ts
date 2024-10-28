import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { LogRepository } from '../../domain/repository/log.repository';

export class LogRepositoryImpl implements LogRepository {
  saveLog(log: LogEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getLogs(severityLevel: LogSeverityLevel): Promise<Array<LogEntity>> {
    throw new Error('Method not implemented.');
  }
}
