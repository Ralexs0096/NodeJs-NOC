import { LogEntity, LogSeverityLevel } from '../entities/log.entity';
import { LogDataSource } from './log.datasource';

describe('log.datasource.ts', () => {
  const newLog = new LogEntity({
    origin: 'log.datasource.test.ts',
    level: LogSeverityLevel.high,
    message: 'test-message'
  });

  class MockLogDatasource implements LogDataSource {
    async saveLog(log: LogEntity): Promise<void> {
      return;
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<Array<LogEntity>> {
      return [newLog];
    }
  }

  it('tests the abstract class', async () => {
    const mockLogDatasource = new MockLogDatasource();

    expect(mockLogDatasource).toBeInstanceOf(MockLogDatasource);
    expect(typeof mockLogDatasource.getLogs).toBe('function');
    expect(typeof mockLogDatasource.saveLog).toBe('function');

    await mockLogDatasource.saveLog(newLog);

    const logs = await mockLogDatasource.getLogs(LogSeverityLevel.high);
    expect(logs).toHaveLength(1);
    expect(logs[0]).toBeInstanceOf(LogEntity);
  });
});
