import { Language } from '.';
import { LanguageId } from './id';
import { memory, time } from './util';

const RubyLanguage: Language = {
  id: LanguageId.Ruby,
  name: 'Ruby',
  fileExtension: '.rb',
  color: '#701516',
  bojRuntimes: [
    {
      name: 'Ruby 2.7',
      compileCommand: `ruby -c Main.rb`,
      executeCommand: `ruby Main.rb`,
      version: `ruby 2.7.1p83 (2020-03-31 revision a0c7c23c9c) [x86_64-linux]`,
      limitModifications: [time({ add: 5 }), memory({ add: 512 })],
    },
  ],
};

export default RubyLanguage;
