import { LogEntity, LogSeverityLevel } from './log.entity';

describe('logEntity', () => {
  const dataObj = {
    origin: 'log.entity.test.ts',
    level: LogSeverityLevel.high,
    message: 'test-message'
  };

  it('creates a LogEntity instance', () => {
    const log = new LogEntity(dataObj);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(dataObj.message);
    expect(log.level).toBe(dataObj.level);
    expect(log.origin).toBe(dataObj.origin);
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  it('creates a LogEntity instance fromJson', () => {
    const json = `{"level":"low","message":"Service https://google.com working","origin":"use-cases.checks.check-service-multiple.ts","createdAt":"2024-11-04T04:03:40.497Z"}`;

    const log = LogEntity.fromJson(json);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe('Service https://google.com working');
    expect(log.level).toBe('low');
    expect(log.origin).toBe('use-cases.checks.check-service-multiple.ts');
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  it('creates an LogEntity instance fromObject', () => {
    const log = LogEntity.fromObject(dataObj);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(dataObj.message);
    expect(log.level).toBe(dataObj.level);
    expect(log.origin).toBe(dataObj.origin);
    expect(log.createdAt).toBeInstanceOf(Date);
  });
});
