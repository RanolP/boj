import { DistinctChoice, ChoiceOptions } from 'inquirer';
import { filter } from 'fuzzy';

export enum LanguageId {
  CPP = 'cpp',
  Python = 'python',
  Kotlin = 'kotlin',
  Rust = 'rust',
  Text = 'text',
  Java = 'java',
  C = 'c',
  Ruby = 'ruby',
  Swift = 'swift',
  CSharp = 'csharp',
  Nodejs = 'nodejs',
  Go = 'go',
  D = 'd',
  FSharp = 'fsharp',
  PHP = 'php',
  Pascal = 'pascal',
  Lua = 'lua',
  Perl = 'perl',
  R = 'r',
  ObjectiveC = 'objectivec',
  ObjectiveCpp = 'objectivecpp',
  GolfScript = 'golfscript',
  Assembly = 'assembly',
  VBNet = 'vbnet',
  Bash = 'bash',
  Fortran = 'fortran',
  Scheme = 'scheme',
  Ada = 'ada',
  Awk = 'awk',
  OCaml = 'ocaml',
  BrainFuck = 'brainfuck',
  Whitespace = 'whitespace',
  Tcl = 'tcl',
  Cobol = 'cobol',
  Pike = 'pike',
  sed = 'sed',
  Boo = 'boo',
  Intercal = 'intercal',
  bc = 'bc',
  Nemerle = 'nemerle',
  Cobra = 'cobra',
  Algol68 = 'algol68',
  Befunge = 'befunge',
  Haxe = 'haxe',
  LolCode = 'lolcode',
  Aheui = 'aheui',
}

export interface Language {
  id: LanguageId;
  name: string;
  fileExtension: string;
}

export const Languages = [
  { id: LanguageId.CPP, name: 'C++', fileExtension: '.cc' },
  { id: LanguageId.Python, name: 'Python', fileExtension: '.py' },
  { id: LanguageId.Kotlin, name: 'Kotlin', fileExtension: '.kt' },
  { id: LanguageId.Rust, name: 'Rust', fileExtension: '.rs' },
  { id: LanguageId.Text, name: 'Text', fileExtension: '.txt' },
  { id: LanguageId.Java, name: 'Java', fileExtension: '.java' },
  { id: LanguageId.C, name: 'C', fileExtension: '.c' },
  { id: LanguageId.Ruby, name: 'Ruby', fileExtension: '.rb' },
  { id: LanguageId.Swift, name: 'Swift', fileExtension: '.swift' },
  { id: LanguageId.CSharp, name: 'C#', fileExtension: '.cs' },
  { id: LanguageId.Nodejs, name: 'Node.js', fileExtension: '.js' },
  { id: LanguageId.Go, name: 'Go', fileExtension: '.go' },
  { id: LanguageId.D, name: 'D', fileExtension: '.d' },
  { id: LanguageId.FSharp, name: 'F#', fileExtension: '.fs' },
  { id: LanguageId.PHP, name: 'PHP', fileExtension: '.php' },
  { id: LanguageId.Pascal, name: 'Pascal', fileExtension: '.pas' },
  { id: LanguageId.Lua, name: 'Lua', fileExtension: '.lua' },
  { id: LanguageId.Perl, name: 'Perl', fileExtension: '.pl' },
  { id: LanguageId.R, name: 'R', fileExtension: '.R' },
  { id: LanguageId.ObjectiveC, name: 'Objective-C', fileExtension: '.m' },
  { id: LanguageId.ObjectiveCpp, name: 'Objective-C++', fileExtension: '.mm' },
  { id: LanguageId.GolfScript, name: 'GolfScript', fileExtension: '.gs' },
  { id: LanguageId.Assembly, name: 'Assembly', fileExtension: '.asm' },
  { id: LanguageId.VBNet, name: 'VB.NET', fileExtension: '.vb' },
  { id: LanguageId.Bash, name: 'Bash', fileExtension: '.sh' },
  { id: LanguageId.Fortran, name: 'Fortran', fileExtension: '.f95' },
  { id: LanguageId.Scheme, name: 'Scheme', fileExtension: '.scm' },
  { id: LanguageId.Ada, name: 'Ada', fileExtension: '.ada' },
  { id: LanguageId.Awk, name: 'Awk', fileExtension: '.awk' },
  { id: LanguageId.OCaml, name: 'OCaml', fileExtension: '.ml' },
  { id: LanguageId.BrainFuck, name: 'Brainf**k', fileExtension: '.bf' },
  { id: LanguageId.Whitespace, name: 'Whitespace', fileExtension: '.ws' },
  { id: LanguageId.Tcl, name: 'Tcl', fileExtension: '.tcl' },
  { id: LanguageId.Cobol, name: 'Cobol', fileExtension: '.cob' },
  { id: LanguageId.Pike, name: 'Pike', fileExtension: '.pike' },
  { id: LanguageId.sed, name: 'sed', fileExtension: '.sed' },
  { id: LanguageId.Boo, name: 'Boo', fileExtension: '.boo' },
  { id: LanguageId.Intercal, name: 'INTERCAL', fileExtension: '.i' },
  { id: LanguageId.bc, name: 'bc', fileExtension: '.bc' },
  { id: LanguageId.Nemerle, name: 'Nemerle', fileExtension: '.n' },
  { id: LanguageId.Cobra, name: 'Cobra', fileExtension: '.cobra' },
  { id: LanguageId.Algol68, name: 'Algol 68', fileExtension: '.a68' },
  { id: LanguageId.Befunge, name: 'Befunge', fileExtension: '.bf' },
  { id: LanguageId.Haxe, name: 'Haxe', fileExtension: '.hx' },
  { id: LanguageId.LolCode, name: 'LOLCODE', fileExtension: '.lol' },
  { id: LanguageId.Aheui, name: '아희', fileExtension: '.aheui' },
];

export const KeyedLanguages: Record<string, Language> = Object.fromEntries(
  Languages.map((language) => [language.id, language] as const)
);

export function searchLanguage(query: string): DistinctChoice<ChoiceOptions> {
  return filter(query, Languages, {
    extract: ({ id, name, fileExtension }) => `${id} ${name} ${fileExtension}`,
  }).map(({ original }) => ({
    name: `${original.name} (${original.fileExtension})`,
    value: original,
    short: original.name,
  }));
}
