import { ROOT } from './constants';
import { notExists, readFile } from './lib/better-fs';
import { join } from 'path';
import { Print } from './util/console';
import * as yup from 'yup';
import { MapSchema } from './vendors/yup';
import { LanguageId } from './lib/language/id';

export type Browser = 'firefox' | 'chromium' | 'webkit';

export type RuntimeOverride = Partial<{
  compile: string[];
  execute: string[];
}>;

export interface Configuration {
  browser: Browser;
  runtimeOverrides: Record<LanguageId, RuntimeOverride>;
}

const validator = yup.object<Configuration>({
  browser: yup
    .string()
    .required()
    .oneOf(['firefox', 'chromium', 'webkit']) as yup.StringSchema<Browser>,
  runtimeOverrides: new MapSchema(
    yup.string().oneOf(Object.values(LanguageId)) as yup.StringSchema<
      LanguageId
    >,
    yup.object<RuntimeOverride>({
      compile: yup.array(yup.string()).ensure().notRequired(),
      execute: yup.array(yup.string()).ensure().notRequired(),
    }),
  ),
});

export async function getConfig(
  printError?: Print,
): Promise<Configuration | null> {
  const configPath = join(ROOT, 'boj.config.json');
  if (await notExists(configPath)) {
    if (printError) {
      printError(
        'Config file does not exists, have you created `boj.config.json`?',
      );
    }
    return null;
  }
  const content = await readFile(configPath, { encoding: 'utf-8' });
  let jsonContent: object;
  try {
    jsonContent = JSON.parse(content);
  } catch (e) {
    if (printError) {
      printError('Config file is not valid json format: ' + e.message);
    }
    return null;
  }
  try {
    return await validator.validate(jsonContent);
  } catch (e) {
    if (printError) {
      printError(e.message + ' in a config file.');
    }
    return null;
  }
}
