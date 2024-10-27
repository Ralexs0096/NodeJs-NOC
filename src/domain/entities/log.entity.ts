export enum LogSeverityLevel {
  low = 'low',
  medium = 'medium',
  high = 'high'
}

export class LogEntity {
  public level: LogSeverityLevel;
  public message: string;
  public createdAt: Date;

  constructor(message: string, level: LogSeverityLevel) {
    this.level = level;
    this.message = message;
    this.createdAt = new Date();
  }

  static fromJson = (json: string): LogEntity => {
    const { message, level, createdAt } = JSON.parse(json);
    [message, level, createdAt].forEach((value) => {
      if (!value) throw new Error(`${value} is required`);
    });

    const log = new LogEntity(message, level);
    log.createdAt = new Date(createdAt);

    return log;
  };
}
