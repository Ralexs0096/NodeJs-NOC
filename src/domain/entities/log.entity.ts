export enum LogSeverityLevel {
  low = 'low',
  medium = 'medium',
  high = 'high'
}

export interface LogEntityOptions {
  level: LogSeverityLevel;
  message: string;
  origin: string;
  createdAt?: Date;
}

export class LogEntity {
  public level: LogSeverityLevel;
  public message: string;
  public createdAt: Date;
  public origin: string;

  constructor(options: LogEntityOptions) {
    const { level, message, origin, createdAt = new Date() } = options;
    this.level = level;
    this.message = message;
    this.origin = origin;
    this.createdAt = new Date();
  }

  static fromJson = (json: string): LogEntity => {
    const { message, level, createdAt, origin } = JSON.parse(json);
    [message, level, createdAt].forEach((value) => {
      if (!value) throw new Error(`${value} is required`);
    });

    const log = new LogEntity({
      message,
      level,
      origin,
      createdAt: new Date(createdAt)
    });

    return log;
  };

  static fromObject = (objectToConvert: { [key: string]: any }): LogEntity => {
    const { message, level, createdAt, origin } = objectToConvert;

    const log = new LogEntity({
      level,
      message,
      origin,
      createdAt
    });

    return log;
  };
}
