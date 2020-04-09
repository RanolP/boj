import { exists, readFile, writeFile } from '../src/better-fs';
import { ROOT } from '../src/constants';
import { join } from 'path';
import { blue, underline, gray, red } from 'chalk';
import { preprocess } from '../src/pgfm';

(async () => {
  const label = (text: 'info' | 'error', color: (input: string) => string) =>
    gray('[update-readme] > ') +
    underline(color(text)) +
    ' '.repeat(5 - text.length + 1);
  console.log(
    label('info', blue) +
      ' Create README.md based on template/README.template.md...'
  );
  const templateFile = join(ROOT, 'template', 'README.template.md');
  if (!(await exists(templateFile))) {
    console.log(
      label('error', red) + ' File not found: template/README.template.md'
    );
  }
  const template = await readFile(templateFile, {
    encoding: 'utf-8',
  });

  const target = join(ROOT, 'README.md');
  const result = await preprocess(template);

  writeFile(target, result);
})();
