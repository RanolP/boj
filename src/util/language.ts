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

export interface Runtime {
  name: string;
  compileCommand?: string;
  executeCommand?: string;
  version?: string;
}

export interface Language {
  id: LanguageId;
  name: string;
  fileExtension: string;
  bojRuntimes: Runtime[];
}

export const Languages: Language[] = [
  {
    id: LanguageId.CPP,
    name: 'C++',
    fileExtension: '.cc',
    bojRuntimes: [
      { name: 'C++2a' },
      { name: 'C++17' },
      { name: 'C++14' },
      { name: 'C++11' },
      { name: 'C++' },
      { name: 'C++ (Clang)' },
      { name: 'C++11 (Clang)' },
      { name: 'C++14 (Clang)' },
      { name: 'C++17 (Clang)' },
      { name: 'C++2a (Clang)' },
    ],
  },
  {
    id: LanguageId.Python,
    name: 'Python',
    fileExtension: '.py',
    bojRuntimes: [
      { name: 'Python 3' },
      { name: 'PyPy3' },
      { name: 'Python 2' },
      { name: 'PyPy2' },
    ],
  },
  {
    id: LanguageId.Kotlin,
    name: 'Kotlin',
    fileExtension: '.kt',
    bojRuntimes: [{ name: 'Kotlin (JVM)' }, { name: 'Kotlin (Native)' }],
  },
  {
    id: LanguageId.Rust,
    name: 'Rust',
    fileExtension: '.rs',
    bojRuntimes: [{ name: 'Rust 2018' }, { name: 'Rust' }],
  },
  {
    id: LanguageId.Text,
    name: 'Text',
    fileExtension: '.txt',
    bojRuntimes: [{ name: 'Text' }],
  },
  {
    id: LanguageId.Java,
    name: 'Java',
    fileExtension: '.java',
    bojRuntimes: [
      { name: 'Java' },
      { name: 'Java (OpenJDK)' },
      { name: 'Java 11' },
    ],
  },
  {
    id: LanguageId.C,
    name: 'C',
    fileExtension: '.c',
    bojRuntimes: [
      { name: 'C11' },
      { name: 'C' },
      { name: 'C (Clang)' },
      { name: 'C11 (Clang)' },
    ],
  },
  {
    id: LanguageId.Ruby,
    name: 'Ruby',
    fileExtension: '.rb',
    bojRuntimes: [{ name: 'Ruby 2.7' }],
  },
  {
    id: LanguageId.Swift,
    name: 'Swift',
    fileExtension: '.swift',
    bojRuntimes: [{ name: 'Swift' }],
  },
  {
    id: LanguageId.CSharp,
    name: 'C#',
    fileExtension: '.cs',
    bojRuntimes: [{ name: 'C# 6.0' }],
  },
  {
    id: LanguageId.Nodejs,
    name: 'Node.js',
    fileExtension: '.js',
    bojRuntimes: [{ name: 'node.js' }, { name: 'Rhino' }],
  },
  {
    id: LanguageId.Go,
    name: 'Go',
    fileExtension: '.go',
    bojRuntimes: [{ name: 'Go' }],
  },
  {
    id: LanguageId.D,
    name: 'D',
    fileExtension: '.d',
    bojRuntimes: [{ name: 'D' }],
  },
  {
    id: LanguageId.FSharp,
    name: 'F#',
    fileExtension: '.fs',
    bojRuntimes: [{ name: 'F#' }],
  },
  {
    id: LanguageId.PHP,
    name: 'PHP',
    fileExtension: '.php',
    bojRuntimes: [{ name: 'PHP' }],
  },
  {
    id: LanguageId.Pascal,
    name: 'Pascal',
    fileExtension: '.pas',
    bojRuntimes: [{ name: 'Pascal' }],
  },
  {
    id: LanguageId.Lua,
    name: 'Lua',
    fileExtension: '.lua',
    bojRuntimes: [{ name: 'Lua' }],
  },
  {
    id: LanguageId.Perl,
    name: 'Perl',
    fileExtension: '.pl',
    bojRuntimes: [{ name: 'Perl' }],
  },
  {
    id: LanguageId.R,
    name: 'R',
    fileExtension: '.R',
    bojRuntimes: [{ name: 'R' }],
  },
  {
    id: LanguageId.ObjectiveC,
    name: 'Objective-C',
    fileExtension: '.m',
    bojRuntimes: [{ name: 'Objective-C' }],
  },
  {
    id: LanguageId.ObjectiveCpp,
    name: 'Objective-C++',
    fileExtension: '.mm',
    bojRuntimes: [{ name: 'Objective-C++' }],
  },
  {
    id: LanguageId.GolfScript,
    name: 'GolfScript',
    fileExtension: '.gs',
    bojRuntimes: [{ name: 'Golfscript' }],
  },
  {
    id: LanguageId.Assembly,
    name: 'Assembly',
    fileExtension: '.asm',
    bojRuntimes: [{ name: 'Assembly (32bit)' }, { name: 'Assembly (64bit)' }],
  },
  {
    id: LanguageId.VBNet,
    name: 'VB.NET',
    fileExtension: '.vb',
    bojRuntimes: [],
  },
  {
    id: LanguageId.Bash,
    name: 'Bash',
    fileExtension: '.sh',
    bojRuntimes: [{ name: 'VB.NET 4.0' }],
  },
  {
    id: LanguageId.Fortran,
    name: 'Fortran',
    fileExtension: '.f95',
    bojRuntimes: [{ name: 'Fortran' }],
  },
  {
    id: LanguageId.Scheme,
    name: 'Scheme',
    fileExtension: '.scm',
    bojRuntimes: [{ name: 'Scheme' }],
  },
  {
    id: LanguageId.Ada,
    name: 'Ada',
    fileExtension: '.ada',
    bojRuntimes: [{ name: 'Ada' }],
  },
  {
    id: LanguageId.Awk,
    name: 'Awk',
    fileExtension: '.awk',
    bojRuntimes: [{ name: 'awk' }],
  },
  {
    id: LanguageId.OCaml,
    name: 'OCaml',
    fileExtension: '.ml',
    bojRuntimes: [{ name: 'OCaml' }],
  },
  {
    id: LanguageId.BrainFuck,
    name: 'Brainf**k',
    fileExtension: '.bf',
    bojRuntimes: [{ name: 'Brainf**k' }],
  },
  {
    id: LanguageId.Whitespace,
    name: 'Whitespace',
    fileExtension: '.ws',
    bojRuntimes: [{ name: 'Whitespace' }],
  },
  {
    id: LanguageId.Tcl,
    name: 'Tcl',
    fileExtension: '.tcl',
    bojRuntimes: [{ name: 'Tcl' }],
  },
  {
    id: LanguageId.Cobol,
    name: 'Cobol',
    fileExtension: '.cob',
    bojRuntimes: [{ name: 'Cobol' }],
  },
  {
    id: LanguageId.Pike,
    name: 'Pike',
    fileExtension: '.pike',
    bojRuntimes: [{ name: 'Pike' }],
  },
  {
    id: LanguageId.sed,
    name: 'sed',
    fileExtension: '.sed',
    bojRuntimes: [{ name: 'sed' }],
  },
  {
    id: LanguageId.Boo,
    name: 'Boo',
    fileExtension: '.boo',
    bojRuntimes: [{ name: 'Boo' }],
  },
  {
    id: LanguageId.Intercal,
    name: 'INTERCAL',
    fileExtension: '.i',
    bojRuntimes: [{ name: 'INTERCAL' }],
  },
  {
    id: LanguageId.bc,
    name: 'bc',
    fileExtension: '.bc',
    bojRuntimes: [{ name: 'bc' }],
  },
  {
    id: LanguageId.Nemerle,
    name: 'Nemerle',
    fileExtension: '.n',
    bojRuntimes: [
      {
        name: 'Nemerle',
      },
    ],
  },
  {
    id: LanguageId.Cobra,
    name: 'Cobra',
    fileExtension: '.cobra',
    bojRuntimes: [
      {
        name: 'Cobra',
      },
    ],
  },
  {
    id: LanguageId.Algol68,
    name: 'Algol 68',
    fileExtension: '.a68',
    bojRuntimes: [
      {
        name: 'Algol 68',
      },
    ],
  },
  {
    id: LanguageId.Befunge,
    name: 'Befunge',
    fileExtension: '.bf',
    bojRuntimes: [
      {
        name: 'Befunge',
      },
    ],
  },
  {
    id: LanguageId.Haxe,
    name: 'Haxe',
    fileExtension: '.hx',
    bojRuntimes: [
      {
        name: 'Haxe',
      },
    ],
  },
  {
    id: LanguageId.LolCode,
    name: 'LOLCODE',
    fileExtension: '.lol',
    bojRuntimes: [
      {
        name: 'LOLCODE',
      },
    ],
  },
  {
    id: LanguageId.Aheui,
    name: '아희',
    fileExtension: '.aheui',
    bojRuntimes: [
      {
        name: '아희',
      },
    ],
  },
];

export const KeyedLanguages: Record<string, Language> = Object.fromEntries(
  Languages.map((language) => [language.id, language] as const),
);

export const ExtensionLanguagesMap: Record<
  string,
  Language[]
> = Languages.reduce(
  (acc, language) => ({
    ...acc,
    [language.fileExtension]:
      language.fileExtension in acc
        ? acc[language.fileExtension].concat(language)
        : [language],
  }),
  {} as Record<string, Language[]>,
);

export const RuntimeBelongsToMap: Record<string, Language> = Object.fromEntries(
  Languages.flatMap((language) =>
    language.bojRuntimes.map((runtime) => [runtime.name, language]),
  ),
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
