import fs from 'fs';
import path from 'path';
import hbs from 'handlebars';

type Templates = typeof templates;
export type TemplateKey = keyof Templates;

export const buildTemplateRender = <T>(template: string) => {
  const file = path.join(__dirname, '../email-templates', `${template}.hbs`);
  const text = fs.readFileSync(file, 'utf-8');
  return hbs.compile<T>(text);
};

export const templates = {
  'auth-code': {
    render: buildTemplateRender<{
      authCode: string;
    }>('auth-code'),
    subject: 'Auth code for Thullo',
  },
};

