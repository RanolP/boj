import { Language } from '.';
import { LanguageId } from './id';
import { memory } from './util';

const AwkLanguage: Language = {
  id: LanguageId.Awk,
  name: 'Awk',
  fileExtension: '.awk',
  color: '#cccccc',
  bojRuntimes: [
    {
      name: 'awk',
      compileCommand:
        'gawk --source "BEGIN { exit(0) } END { exit(0) }" --file Main.awk',
      executeCommand: 'gawk --file Main.awk',
      version: `GNU Awk 4.2.1, API: 2.0`,
      limitModifications: [memory({ add: 16 })],
    },
  ],
};

export default AwkLanguage;
