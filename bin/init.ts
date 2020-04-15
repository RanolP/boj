import {
  notExists,
  mkdirs,
  writeFile,
  exists,
  readFile,
  readdir,
} from '../src/better-fs';
import { join, parse } from 'path';
import { ROOT } from '../src/constants';
import { searchProblem } from '../src/api/baekjoon';
import {
  prompt,
  registerPrompt,
  DistinctChoice,
  ChoiceOptions,
} from 'inquirer';
import AutoCompletePrompt from 'inquirer-autocomplete-prompt';
import CheckboxPlusPrompt from 'inquirer-checkbox-plus-prompt';
import { Logger, chalk } from '../src/util/console';
import { getProblem } from '../src/problem';
import { Duration, permastate } from '../src/cache';
import minimist from 'minimist';
import { searchLanguage, Language } from '../src/util/language';
import { filter } from 'fuzzy';

registerPrompt('autocomplete', AutoCompletePrompt);
registerPrompt('checkbox-plus', CheckboxPlusPrompt);

const [order, setOrder] = permastate(
  () => 1,
  () => 'order',
  Duration.of({ hour: 24 }),
  {
    useAbsoluteDate: true,
  }
);

declare module 'inquirer' {
  interface AutoCompleteQuestion<T> extends Question<T> {
    type: 'autocomplete';
    suggestOnly?: boolean;
    source: (
      previousAnswers: string[],
      searchTerm: string | undefined
    ) => Promise<Array<DistinctChoice<ChoiceOptions>>>;
  }

  interface CheckboxPlusQuestion<T> extends Question<T> {
    type: 'checkbox-plus';
    highlight?: boolean;
    searchable?: boolean;
    source: (
      previousAnswers: string[],
      searchTerm: string | undefined
    ) => Promise<Array<DistinctChoice<ChoiceOptions>>>;
  }

  interface QuestionMap<T extends Answers = Answers> {
    autocomplete: AutoCompleteQuestion<T>;
    'checkbox-plus': CheckboxPlusQuestion<T>;
  }
}

(async () => {
  let { id } = minimist(process.argv.slice(2));
  if (!id) {
    id = (
      await prompt({
        type: 'autocomplete',
        name: 'id',
        message: 'Search BOJ Problem',
        source: (_, query) => searchProblem(query || ''),
      })
    ).id;
  }
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
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');

    const { problemDifficulty } = await prompt([
      {
        type: 'list',
        name: 'extension',
        message: 'Problem Difficulty',
        choices: ['A', 'B', 'C'],
      },
    ]);

    await writeFile(
      join(problemPath, 'meta.json'),
      JSON.stringify(
        {
          date: `${year}-${month}-${day}`,
          lastUpdate: `${year}-${month}-${day}`,
          status: 'in-progress',
          type: 'daily-boj',
          order: await order(),
          love: undefined,
          problemDifficulty,
        },
        null,
        '  '
      )
    );

    await setOrder((await order()) + 1);
  }
  const problem = await getProblem(id);
  const solutions = await problem.getSolutions();
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
              readFile(join(templateDirectory, it), { encoding: 'utf-8' })
            )
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
                : []
            )
            .join('\n\n') + '\n';
        sourceType = 'template';
      }
      await writeFile(
        join(problemPath, 'solution' + language.fileExtension),
        source
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
})();
