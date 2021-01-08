import nodemailer from 'nodemailer';
import config from '../config';
import { Options } from 'nodemailer/lib/smtp-transport';
import { templates, TemplateKey } from '../utils/emails';
import { MailError } from '../utils/errors';

type VariableName = string | number;
type VariableValue = string | number;

type Vars = {
  [key in VariableName]: VariableValue;
};

export interface IMailOptions {
  to: string;
  template: string;
  subject?: string;
  vars?: Vars;
}

const smtp = nodemailer.createTransport({
  host: config.smtp_server,
  port: 465,
  secure: true,
  connectionTimeout: 1000 * 10,
  auth: {
    user: config.smtp_username,
    pass: config.smtp_password,
  },
} as Options);

export const send = async ({ to, template, subject, vars }: IMailOptions) => {
  try {
    await smtp.sendMail({
      to,
      from: 'Thullo <verify@thullo.com>',
      subject: subject || templates[template as TemplateKey].subject,
      html: templates[template as TemplateKey].render(vars as never),
    });
  } catch (err) {
    throw new MailError('Something went wrong with email delivery. Maybe timeout?');
  }
};
