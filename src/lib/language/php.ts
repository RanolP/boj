import { Language } from '.';
import { LanguageId } from './id';
import { memory } from './util';
const PHPLanguage: Language = {
  id: LanguageId.PHP,
  name: 'PHP',
  fileExtension: '.php',
  color: '#4F5D95',
  bojRuntimes: [
    {
      name: 'PHP',
      compileCommand: `php -l Main.php`,
      executeCommand: `php Main.php`,
      version: `PHP 7.4.4`,
      limitModifications: [memory({ add: 512 })],
    },
  ],
};

export default PHPLanguage;
