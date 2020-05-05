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
  forceRuntime: string;
}>;

type RequireFilter<T, Keys extends keyof T = never> = {
  [K in Keys]-?: T[K];
} &
  {
    [K in Exclude<keyof T, Keys>]?: T[K];
  };

const browser = yup
  .string()
  .oneOf(['firefox', 'chromium', 'webkit']) as yup.StringSchema<Browser>;

export type Configuration = {
  browser: Browser;
  runtimeOverrides: Record<LanguageId, RuntimeOverride>;
};

const ArrayTreater: yup.TransformFunction<yup.ArraySchema<string>> = (
  val: any,
  original: any,
): any[] => {
  if (Array.isArray(val)) {
    return val;
  }
  return original === null ? original : [].concat(original);
};

export const FullOptionalMode: yup.ObjectSchema<RequireFilter<
  Configuration
>> = yup
  .object({
    browser: browser.clone().notRequired(),
    runtimeOverrides: new MapSchema(
      yup.string().oneOf(Object.values(LanguageId)) as yup.StringSchema<
        LanguageId
      >,
      yup.object<RuntimeOverride>({
        compile: yup.array(yup.string()).transform(ArrayTreater).notRequired(),
        execute: yup.array(yup.string()).transform(ArrayTreater).notRequired(),
        forceRuntime: yup.string().notRequired(),
      }),
    ).notRequired(),
  })
  .default({});

export const BrowserMode: yup.ObjectSchema<RequireFilter<
  Configuration,
  'browser'
>> = yup
  .object({
    browser: browser.clone().required(),
    runtimeOverrides: new MapSchema(
      yup.string().oneOf(Object.values(LanguageId)) as yup.StringSchema<
        LanguageId
      >,
      yup.object<RuntimeOverride>({
        compile: yup.array(yup.string()).ensure().notRequired(),
        execute: yup.array(yup.string()).ensure().notRequired(),
        forceRuntime: yup.string().notRequired(),
      }),
    ).notRequired(),
  })
  .default({});

export async function getConfig<T extends yup.ObjectSchema>(
  validator: T,
  printError?: Print,
): Promise<yup.InferType<T> | undefined> {
  const configPath = join(ROOT, 'boj.config.json');
  if (await notExists(configPath)) {
    if (printError) {
      printError(
        'Config file does not exists, have you created `boj.config.json`?',
      );
    }
    return undefined;
  }
  const content = await readFile(configPath, { encoding: 'utf-8' });
  let jsonContent: object;
  try {
    jsonContent = JSON.parse(content);
  } catch (e) {
    if (printError) {
      printError('Config file is not valid json format: ' + e.message);
    }
    return undefined;
  }
  try {
    return (await validator.validate(jsonContent)) as yup.InferType<T>;
  } catch (e) {
    if (printError) {
      console.log(e);
      printError(`${e.message} in a config file. (key=${e.key})`);
    }
    return undefined;
  }
}
