import {
  notExists,
  mkdirs,
  writeFile,
  exists,
  readFile,
  readdir,
} from '../lib/better-fs';
import { join, parse } from 'path';
import { ROOT } from '../constants';
import { searchProblem } from '../api/baekjoon';
import { prompt } from '../vendors/inquirer';
import { Logger, chalk } from '../util/console';
import { getProblem, ProblemMeta } from '../lib/problem';
import { Duration, permastate } from '../cache';
import { searchLanguage, Language } from '../util/language';
import { filter } from 'fuzzy';
import { Command, flags } from '@oclif/command';
import { formatDate } from '../util/date';

const [order, setOrder] = permastate(
  () => 1,
  () => 'order',
  Duration.of({ hour: 24 }),
  {
    useAbsoluteDate: true,
  },
);

export default class InitCommand extends Command {
  public static description = 'Initialize problem';

  public static flags = {
    id: flags.integer({
      description: 'The id of problem',
      helpValue: '1000',
    }),
  };
  async run() {
    let id =
      this.parse(InitCommand).flags.id ||
      (
        await prompt({
          type: 'autocomplete',
          name: 'id',
          message: 'Search BOJ Problem',
          source: (_, query) => searchProblem(query || ''),
        })
      ).id;

    const base = new Logger('init');
    const { create, warning } = base.labeled({
      create: chalk.green,
      warning: chalk.yellow,
    });
    const problemPath = join(ROOT, id.toString());
    if (await notExists(problemPath)) {
      await mkdirs(problemPath);
      create(`Folder for ${id}`);
    }
    if (await notExists(join(problemPath, 'meta.json'))) {
      const now = new Date();

      const meta: ProblemMeta = {
        createDate: formatDate(now),
        status: 'in-progress',
        type: 'daily-boj',
        order: await order(),
      };

      await writeFile(
        join(problemPath, 'meta.json'),
        JSON.stringify(meta, null, '  '),
      );

      await setOrder((await order()) + 1);
    }
    const problem = (await getProblem(id))!;
    const solutions = await problem.getSolutionList();
    if (solutions.length === 0) {
      const { language } = await prompt<{ language?: Language }>({
        type: 'autocomplete',
        name: 'language',
        message: 'Language',
        source: async (_, query) =>
          [
            {
              name: 'Select it later',
              value: undefined,
            },
          ].concat(searchLanguage(query || '')),
      });
      if (language) {
        let source = '';
        let sourceType = 'empty';
        const templateDirectory = join(ROOT, 'template', language.id);
        if (await exists(templateDirectory)) {
          const files = (await readdir(templateDirectory))
            .map((it) => parse(it))
            .filter((it) => it.ext === language.fileExtension);
          const main = 'main' + language.fileExtension;
          const { templateToUse } = await prompt<{ templateToUse: string[] }>({
            type: 'checkbox-plus',
            name: 'templateToUse',
            message: 'Templates',
            default: files.some((it) => it.base === main) ? [main] : [],
            source: async (_, query) =>
              filter(query || '', files, {
                extract: ({ base }) => base,
              }).map(({ original }) => ({
                name: original.name,
                value: original.base,
                short: original.name,
              })),
            highlight: true,
            searchable: true,
          });
          const concatenated = await Promise.all(
            templateToUse
              .filter((it) => it !== main)
              .map((it) =>
                readFile(join(templateDirectory, it), { encoding: 'utf-8' }),
              ),
          );
          source =
            concatenated
              .map((it) => it.trim())
              .concat(
                templateToUse.some((it) => it === main)
                  ? [
                      (
                        await readFile(join(templateDirectory, main), {
                          encoding: 'utf-8',
                        })
                      ).trim(),
                    ]
                  : [],
              )
              .join('\n\n') + '\n';
          sourceType = 'template';
        }
        await writeFile(
          join(problemPath, 'solution' + language.fileExtension),
          source,
        );
        create(`Solution file for ${id} (${sourceType})`);
      }
    }
    if (await notExists(problem.noteFile)) {
      const { shouldCreate } = !problem.isSolved
        ? await prompt({
            type: 'confirm',
            name: 'shouldCreate',
            message: 'Would you create note file?',
          })
        : { shouldCreate: true };
      if (shouldCreate) {
        const templatePath = join(ROOT, 'template', 'Note.template.md');
        const template = (await exists(templatePath))
          ? await readFile(templatePath, { encoding: 'utf-8' })
          : '';
        await writeFile(problem.noteFile, template);
        if (template.length === 0) {
          warning('Note.md generated as an empty file.');
        }
        create(`Note.md file for ${id}`);
      }
    }
  }
}
