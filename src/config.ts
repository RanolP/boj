import { ROOT } from './constants';
import { notExists, readFile } from './lib/better-fs';
import { join } from 'path';
import { Print } from './util/console';
import * as yup from 'yup';

export type Browser = 'firefox' | 'chromium' | 'webkit';

export interface Settings {
  browser: Browser;
}

const validator = yup.object<Settings>({
  browser: yup
    .string()
    .required()
    .oneOf(['firefox', 'chromium', 'webkit']) as yup.StringSchema<Browser>,
});

export async function getSettings(error: Print): Promise<Settings | null> {
  const configPath = join(ROOT, 'boj.config.json');
  if (await notExists(configPath)) {
    error('Config file does not exists, have you created `boj.config.json`?');
    return null;
  }
  const content = await readFile(configPath, { encoding: 'utf-8' });
  let jsonContent: object;
  try {
    jsonContent = JSON.parse(content);
  } catch (e) {
    error(
      'Config file is not valid json format:' +
        e.toString().replace('SyntaxError: JSON.parse: ', ''),
    );
    return null;
  }
  try {
    return await validator.validate(jsonContent);
  } catch (e) {
    error(e.message + ' in a config file.');
    return null;
  }
}
