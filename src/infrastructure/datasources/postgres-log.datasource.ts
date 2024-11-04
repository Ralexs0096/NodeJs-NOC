import { PrismaClient, SeverityLevel } from '@prisma/client';
import { LogDataSource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

const prismaClient = new PrismaClient();

export class PostgresLogDatasource implements LogDataSource {
  async saveLog(log: LogEntity): Promise<void> {
    const level = log.level.toUpperCase() as SeverityLevel;
    await prismaClient.logModel.create({
      data: {
        ...log,
        level
      }
    });
    console.log('Log created on Postgres');
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<Array<LogEntity>> {
    const logs = await prismaClient.logModel.findMany();

    return logs.map(LogEntity.fromObject);
  }
}
