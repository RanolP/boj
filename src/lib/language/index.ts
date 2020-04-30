import { DistinctChoice, ChoiceOptions } from 'inquirer';
import { filter } from 'fuzzy';
import CppLanguage from './cpp';
import PythonLanguage from './python';
import KotlinLanguage from './kotlin';
import RustLanguage from './rust';
import TextLanguage from './text';
import JavaLanguage from './java';
import CLanguage from './c';
import RubyLanguage from './ruby';
import { NativeRun, time, memory } from './util';
import { LanguageId } from './id';

export interface VersionFetcher {
  command: string;
  parse: (output: string) => string;
}

export interface LimitModification<Unit> {
  stringified: string;
  evaluate(base: number): number;
}

type TimeLimitModification = LimitModification<'초'>;
type MemoryLimitModification = LimitModification<'MB'>;

export interface Runtime {
  name: string;
  compileCommand?: string | string[];
  executeCommand: string | string[];
  fetchVersion?: VersionFetcher;
  version?: string;
  limitModifications?:
    | [TimeLimitModification]
    | [MemoryLimitModification]
    | [TimeLimitModification, MemoryLimitModification]
    | [MemoryLimitModification, TimeLimitModification];
}

export interface Language {
  id: LanguageId;
  name: string;
  fileExtension: string;
  bojRuntimes: Runtime[];
}

export const Languages: Language[] = [
  CppLanguage,
  PythonLanguage,
  KotlinLanguage,
  RustLanguage,
  TextLanguage,
  JavaLanguage,
  CLanguage,
  RubyLanguage,
  {
    id: LanguageId.Swift,
    name: 'Swift',
    fileExtension: '.swift',
    bojRuntimes: [
      {
        name: 'Swift',
        compileCommand: `swiftc Main.swift`,
        executeCommand: `./Main`,
        version: `Swift version 5.2.1 (swift-5.2.1-RELEASE)`,
        limitModifications: [memory({ add: 512 })],
      },
    ],
  },
  {
    id: LanguageId.CSharp,
    name: 'C#',
    fileExtension: '.cs',
    bojRuntimes: [
      {
        name: 'C# 6.0',
        compileCommand: `mcs -codepage:utf8 -warn:0 -optimize+ -checked+ -clscheck- -reference:System.Numerics.dll -out:Main.exe Main.cs`,
        executeCommand: `mono --optimize=all Main.exe`,
        version: `Mono C# compiler version 6.8.0.105`,
        limitModifications: [
          time({ add: 5 }),
          memory({ multiply: 2, add: 16 }),
        ],
      },
    ],
  },
  {
    id: LanguageId.Nodejs,
    name: 'Node.js',
    fileExtension: '.js',
    bojRuntimes: [
      {
        name: 'node.js',
        executeCommand: `node Main.js`,
        version: `v12.16.1`,
        limitModifications: [
          time({ multiply: 3, add: 2 }),
          memory({ multiply: 2 }),
        ],
      },
      {
        name: 'Rhino',
        compileCommand: 'uglifyjs -o Main_uglify.js Main.js',
        executeCommand: 'java -Xms128m -Xmx512m -Xss64m -jar rhino.jar Main.js',
        version: 'Rhino 1.7.8',
        limitModifications: [
          time({ multiply: 2, add: 1 }),
          memory({ multiply: 2, add: 16 }),
        ],
      },
    ],
  },
  {
    id: LanguageId.Go,
    name: 'Go',
    fileExtension: '.go',
    bojRuntimes: [
      {
        name: 'Go',
        compileCommand: `go build Main.go`,
        executeCommand: `./Main`,
        version: `go version go1.14.1 linux/amd64`,
        limitModifications: [time({ add: 2 }), memory({ add: 512 })],
      },
    ],
  },
  {
    id: LanguageId.D,
    name: 'D',
    fileExtension: '.d',
    bojRuntimes: [
      {
        name: 'D',
        compileCommand: `dmd -boundscheck=off -O -of=Main -fPIC -inline -release Main.d`,
        executeCommand: `./Main`,
        version: `DMD64 D Compiler v2.088.0`,
        limitModifications: [memory({ add: 16 })],
      },
    ],
  },
  {
    id: LanguageId.FSharp,
    name: 'F#',
    fileExtension: '.fs',
    bojRuntimes: [
      {
        name: 'F#',
        compileCommand: `fsharpc Main.fs`,
        executeCommand: `mono --optimize=all Main.exe`,
        version: `Microsoft (R) F# Compiler version 10.2.3 for F# 4.5`,
        limitModifications: [time({ add: 5 }), memory({ add: 512 })],
      },
    ],
  },
  {
    id: LanguageId.PHP,
    name: 'PHP',
    fileExtension: '.php',
    bojRuntimes: [
      {
        name: 'PHP',
        compileCommand: `php -l Main.php`,
        executeCommand: `php Main.php`,
        version: `PHP 7.4.4`,
        limitModifications: [memory({ add: 512 })],
      },
    ],
  },
  {
    id: LanguageId.Pascal,
    name: 'Pascal',
    fileExtension: '.pas',
    bojRuntimes: [
      {
        name: 'Pascal',
        compileCommand: `fpc Main.pas -O2 -Co -Ct -Ci`,
        executeCommand: `./Main`,
        version: `Free Pascal Compiler version 3.0.0+dfsg-2 [2016/01/28] for x86_64`,
      },
    ],
  },
  {
    id: LanguageId.Lua,
    name: 'Lua',
    fileExtension: '.lua',
    bojRuntimes: [
      {
        name: 'Lua',
        compileCommand: `luac -p Main.lua`,
        executeCommand: `lua Main.lua`,
        version: `Lua 5.3.5 Copyright (C) 1994-2018 Lua.org, PUC-Rio`,
        limitModifications: [time({ add: 5 }), memory({ add: 512 })],
      },
    ],
  },
  {
    id: LanguageId.Perl,
    name: 'Perl',
    fileExtension: '.pl',
    bojRuntimes: [
      {
        name: 'Perl',
        compileCommand: `perl -c Main.pl`,
        executeCommand: `perl Main.pl`,
        version: `Perl v5.30.0`,
        limitModifications: [memory({ add: 512 })],
      },
    ],
  },
  {
    id: LanguageId.R,
    name: 'R',
    fileExtension: '.R',
    bojRuntimes: [
      {
        name: 'R',
        executeCommand: `Rscript Main.R`,
        version: `R scripting front-end version 3.6.1 (2019-07-05)`,
        limitModifications: [time({ add: 2 }), memory({ add: 128 })],
      },
    ],
  },
  {
    id: LanguageId.ObjectiveC,
    name: 'Objective-C',
    fileExtension: '.m',
    bojRuntimes: [
      {
        name: 'Objective-C',
        compileCommand:
          'gcc Main.m -o Main `gnustep-config --objc-flags` `gnustep-config --base-libs` -O2 -DONLINE_JUDGE -DB',
        executeCommand: `./Main`,
        version: `gcc (Ubuntu 5.5.0-12ubuntu1~16.04) 5.5.0 20171010`,
      },
    ],
  },
  {
    id: LanguageId.ObjectiveCpp,
    name: 'Objective-C++',
    fileExtension: '.mm',
    bojRuntimes: [
      {
        name: 'Objective-C++',
        compileCommand:
          'g++ Main.mm -o Main `gnustep-config --objc-flags` `gnustep-config --base-libs` -O2 -DONLINE_JUDGE -DBOJ',
        executeCommand: `./Main`,
        version: `gcc (Ubuntu 5.5.0-12ubuntu1~16.04) 5.5.0 20171010`,
      },
    ],
  },
  {
    id: LanguageId.GolfScript,
    name: 'GolfScript',
    fileExtension: '.gs',
    bojRuntimes: [
      {
        name: 'Golfscript',
        executeCommand: `ruby golfscript.rb Main.gs`,
        version: `Golfscript (April 30, 2013)`,
        limitModifications: [time({ add: 2 }), memory({ add: 64 })],
      },
    ],
  },
  {
    id: LanguageId.Assembly,
    name: 'Assembly',
    fileExtension: '.asm',
    bojRuntimes: [
      {
        name: 'Assembly (32bit)',
        compileCommand: `nasm -f elf32 -o Main.o Main.asm && gcc -m32 -o Main Main.o`,
        ...NativeRun,
        version: `NASM version 2.14`,
      },
      {
        name: 'Assembly (64bit)',
        compileCommand: `nasm -f elf64 -o Main.o Main.asm && gcc -o Main Main.o`,
        ...NativeRun,
        version: `NASM version 2.14`,
      },
    ],
  },
  {
    id: LanguageId.VBNet,
    name: 'VB.NET',
    fileExtension: '.vb',
    bojRuntimes: [
      {
        name: 'VB.NET 4.0',
        compileCommand: 'vbnc -out:Main.exe Main.vb',
        executeCommand: 'mono --optimize=all Main.exe',
        version: `Visual Basic.Net Compiler version 0.0.0.5943 (Mono 4.7 - tarball)`,
        limitModifications: [time({ add: 5 }), memory({ add: 512 })],
      },
    ],
  },
  {
    id: LanguageId.Bash,
    name: 'Bash',
    fileExtension: '.sh',
    bojRuntimes: [
      {
        name: 'Bash',
        compileCommand: 'bash -n Main.sh',
        executeCommand: 'bash Main.sh',
        version: `GNU bash, version 5.0.0(1)-release (x86_64-pc-linux-gnu)`,
      },
    ],
  },
  {
    id: LanguageId.Fortran,
    name: 'Fortran',
    fileExtension: '.f95',
    bojRuntimes: [
      {
        name: 'Fortran',
        compileCommand:
          'gfortran Main.f95 -o Main -O2 -Wall -fmax-array-constructor=2097152',
        ...NativeRun,
        version: `GNU Fortran (Ubuntu 5.5.0-12ubuntu1~16.04) 5.5.0 20171010`,
        limitModifications: [memory({ add: 16 })],
      },
    ],
  },
  {
    id: LanguageId.Scheme,
    name: 'Scheme',
    fileExtension: '.scm',
    bojRuntimes: [
      {
        name: 'Scheme',
        compileCommand: 'csc -output-file Main -O5 Main.scm',
        ...NativeRun,
        version: `Chicken Version 5.1.0 (rev 8e62f718)`,
        limitModifications: [
          time({ multiply: 2, add: 1 }),
          memory({ multiply: 2, add: 16 }),
        ],
      },
    ],
  },
  {
    id: LanguageId.Ada,
    name: 'Ada',
    fileExtension: '.ada',
    bojRuntimes: [
      {
        name: 'Ada',
        compileCommand: 'gnatmake -o Main Main.ada',
        ...NativeRun,
        version: `GNATMAKE 5.5.0`,
      },
    ],
  },
  {
    id: LanguageId.Awk,
    name: 'Awk',
    fileExtension: '.awk',
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
  },
  {
    id: LanguageId.OCaml,
    name: 'OCaml',
    fileExtension: '.ml',
    bojRuntimes: [
      {
        name: 'OCaml',
        compileCommand: 'ocamlc -o Main Main.ml',
        ...NativeRun,
        version: `OCaml version 4.07.0`,
        limitModifications: [memory({ add: 32 })],
      },
    ],
  },
  {
    id: LanguageId.BrainFuck,
    name: 'Brainf**k',
    fileExtension: '.bf',
    bojRuntimes: [
      {
        name: 'Brainf**k',
        compileCommand: [
          './bfi -c Main.bf',
          'gcc Main.c -o Main -O2 -Wall -lm -static -std=c11 -DONLINE_JUDGE -DBOJ',
        ],
        ...NativeRun,
        version: `bfi: Version 1.1.0 dabe513 on Linux x64`,
        limitModifications: [time({ add: 1 })],
      },
    ],
  },
  {
    id: LanguageId.Whitespace,
    name: 'Whitespace',
    fileExtension: '.ws',
    bojRuntimes: [
      {
        name: 'Whitespace',
        executeCommand: 'whitespace Main.ws',
        version: 'Whitespace',
      },
    ],
  },
  {
    id: LanguageId.Tcl,
    name: 'Tcl',
    fileExtension: '.tcl',
    bojRuntimes: [
      {
        name: 'Tcl',
        executeCommand: 'tclsh Main.tcl',
        version: '8.6',
        limitModifications: [memory({ add: 512 })],
      },
    ],
  },
  {
    id: LanguageId.Cobol,
    name: 'Cobol',
    fileExtension: '.cob',
    bojRuntimes: [
      {
        name: 'Cobol',
        compileCommand: 'cobc -x -O2 -o Main Main.cob',
        ...NativeRun,
        version: 'cobc (GnuCOBOL) 2.2.0',
      },
    ],
  },
  {
    id: LanguageId.Pike,
    name: 'Pike',
    fileExtension: '.pike',
    bojRuntimes: [
      {
        name: 'Pike',
        compileCommand: 'pike -e compile_file(\\"Main.pike\\");',
        executeCommand: 'pike Main.pike',
        version: 'Pike v7.8 release 866',
        limitModifications: [time({ add: 5 }), memory({ add: 512 })],
      },
    ],
  },
  {
    id: LanguageId.sed,
    name: 'sed',
    fileExtension: '.sed',
    bojRuntimes: [
      {
        name: 'sed',
        compileCommand: 'fromdos Main.sed',
        executeCommand: 'sed -f Main.sed',
        version: 'sed (GNU sed) 4.7',
      },
    ],
  },
  {
    id: LanguageId.Boo,
    name: 'Boo',
    fileExtension: '.boo',
    bojRuntimes: [
      {
        name: 'Boo',
        compileCommand: 'booc.exe Main.boo',
        // TODO: It may not work.
        executeCommand: './Main.exe',
        version: 'Boo Compiler version 0.9.4.9',
        limitModifications: [time({ add: 5 }), memory({ add: 512 })],
      },
    ],
  },
  {
    id: LanguageId.Intercal,
    name: 'INTERCAL',
    fileExtension: '.i',
    bojRuntimes: [
      {
        name: 'INTERCAL',
        executeCommand: 'ick Main.i',
        version: 'C-INTERCAL 0.29',
      },
    ],
  },
  {
    id: LanguageId.bc,
    name: 'bc',
    fileExtension: '.bc',
    bojRuntimes: [
      {
        name: 'bc',
        compileCommand: 'from Main.bc',
        executeCommand: 'bc -q Main.bc',
        version: 'bc 1.06.95',
      },
    ],
  },
  {
    id: LanguageId.Nemerle,
    name: 'Nemerle',
    fileExtension: '.n',
    bojRuntimes: [
      {
        name: 'Nemerle',
        compileCommand: 'ncc.exe -o Main -O Main.n',
        // TODO: It may not work.
        executeCommand: './Main.exe',
        version: 'Nemerle Compiler (ncc) version 1.2.0.539',
        limitModifications: [time({ add: 5 }), memory({ add: 512 })],
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
        compileCommand: 'cobra -compile -o Main.cobra',
        ...NativeRun,
        version: 'The Cobra Programming Language 0.9.2',
        limitModifications: [time({ add: 5 }), memory({ add: 512 })],
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
        compileCommand: 'a68g --check Main.a68',
        executeCommand: 'a68g Main.a68',
        version: 'Algol 68 Genie 2.8',
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
        executeCommand: 'cfunge Main.bf',
        version: 'cfunge 0.9.0',
        limitModifications: [memory({ add: 32 })],
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
        compileCommand: 'haxe -main Main -python Main.py',
        executeCommand: 'python3 Main.py',
        version: 'Haxe 3.4.7',
        limitModifications: [
          time({ multiply: 3, add: 2 }),
          memory({ multiply: 2, add: 32 }),
        ],
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
        executeCommand: 'lci Main.lol',
        version: 'lci v0.10.5',
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
        executeCommand: 'rpaheui-c -O2 Main.aheui',
        version: 'rpaheui 1.2.2-24-gb66f488',
        limitModifications: [memory({ add: 32 })],
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
