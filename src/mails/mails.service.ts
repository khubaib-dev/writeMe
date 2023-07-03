import { Injectable } from '@nestjs/common'
import * as nodemailer from 'nodemailer'
import { Verification } from '../verification/entities/verification.entity'

@Injectable()
export class MailsService {
    private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_SENDER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendMail(to: string, subject: string, message: string): Promise<void> {
    const mailOptions: nodemailer.SendMailOptions = {
      from: process.env.EMAIL_SENDER,
      to,
      subject,
      text: message,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
