import nodemailer from 'nodemailer';
import { Logger } from '../../core/Logger';
import { config } from '../../config';

class EmailService {
  private transporter: nodemailer.Transporter | null = null;

  constructor() {
    this.createTransporter();
  }

  private async createTransporter() {
    // If SMTP credentials are provided in Env, use them.
    // Otherwise, generate Ethereal test account.
    if (process.env.SMTP_HOST) {
        Logger.info(`Configuring SMTP with Host: ${process.env.SMTP_HOST}, User: ${process.env.SMTP_USER}`);
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    } else {
        Logger.info('SMTP Credentials not found. Creating Ethereal Test Account...');
        const testAccount = await nodemailer.createTestAccount();
        
        this.transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        });
        Logger.info(`Ethereal Account Created: ${testAccount.user}`);
    }

    // Verify connection
    if (this.transporter) {
        try {
            await this.transporter.verify();
            Logger.info('SMTP Connection Established Successfully');
        } catch (error) {
            Logger.error('SMTP Connection Failed:', error);
        }
    }
  }

  async sendEmail(to: string, subject: string, html: string) {
    if (!this.transporter) {
        await this.createTransporter();
    }

    const info = await this.transporter!.sendMail({
      from: '"EddyHub App" <no-reply@eddyhub.com>', // sender address
      to, 
      subject,
      html, 
    });

    Logger.info(`Message sent: ${info.messageId}`);
    
    // Preview only available when sending through an Ethereal account
    if (nodemailer.getTestMessageUrl(info)) {
        Logger.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    }

    return info;
  }
}

export const emailService = new EmailService();
