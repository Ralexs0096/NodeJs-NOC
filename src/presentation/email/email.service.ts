import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

interface Attachment {
  filename: string;
  pathname: string;
}

interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Array<Attachment>;
}

export class EmailService {
  constructor(private readonly logRepository: LogRepository) {}

  private transporter = nodemailer.createTransport({
    service: envs.EMAIL_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY
    }
  });

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { htmlBody, subject, to, attachments = [] } = options;
    try {
      await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments
      });

      const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: 'email sent',
        origin: 'email.service.ts'
      });
      this.logRepository.saveLog(log);

      return true;
    } catch (error) {
      const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: 'email not sent',
        origin: 'email.service.ts'
      });
      this.logRepository.saveLog(log);

      return false;
    }
  }

  async sendEmailWithFileSystemLogs(to: string | Array<string>) {
    const subject = 'Sever Logs';
    const htmlBody = `
    <h3>System Logs - NOC</h3>
  `;
    const attachments: Array<Attachment> = [
      {
        filename: 'log-low.log',
        pathname: '../../../logs/log-low.log'
      },
      {
        filename: 'log-medium.log',
        pathname: '../../../logs/log-medium.log'
      },
      {
        filename: 'log-high.log',
        pathname: '../../../logs/log-high.log'
      }
    ];

    return this.sendEmail({
      to,
      subject,
      htmlBody,
      attachments
    });
  }
}
