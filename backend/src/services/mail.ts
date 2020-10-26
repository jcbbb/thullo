import nodemailer from 'nodemailer';
import config from '../config';
import { Options } from 'nodemailer/lib/smtp-transport';
import { templates, TemplateKey } from '../utils/emails';

type VariableName = string | number;
type VariableValue = string | number;

type Vars = {
  [key in VariableName]: VariableValue;
};

const smtp = nodemailer.createTransport({
  smtp: {
    host: config.smtp_server,
    port: 465,
  },
  auth: {
    user: config.smtp_username,
    pass: config.smtp_password,
  },
} as Options);

const Mail = (() => {
  const send = async (to: string, template: string, vars: Vars) => {
    const res = await smtp.sendMail({
      to,
      from: config.smtp_username,
      subject: templates[template as TemplateKey].subject(`Your auth code is`),
      html: templates[template as TemplateKey].render(vars as never),
    });
    return res;
  };

  return { send };
})();

export default Mail;
