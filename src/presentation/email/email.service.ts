import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';

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

      return true;
    } catch (error) {
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
