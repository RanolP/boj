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
import SwiftLanguage from './swift';
import AdaLanguage from './ada';
import BooLanguage from './boo';
import BrainFuckLanguage from './brainfuck';
import CSharpLanguage from './csharp';
import DLanguage from './d';
import FSharpLanguage from './fsharp';
import FortranLanguage from './fortran';
import GoLanguage from './go';
import HaxeLanguage from './haxe';
import ECMAScriptLanguage from './ecmascript';
import LolCodeLanguage from './lolcode';
import LuaLanguage from './lua';
import NemerleLanguage from './nemerle';
import ObjectiveCLanguage from './objective-c';
import ObjectiveCppLanguage from './objective-cpp';
import PHPLanguage from './php';
import PascalLanguage from './pascal';
import PerlLanguage from './perl';
import PikeLanguage from './pike';
import RLanguage from './r';
import AssemblyLanguage from './assembly';
import VBNetLanguage from './vb-net';
import BashLanguage from './bash';
import SchemeLanguage from './scheme';
import OCamlLanguage from './ocaml';
import TclLanguage from './tcl';
import SedLanguage from './sed';
import WhitespaceLanguage from './whitespace';
import AheuiLanguage from './aheui';
import AwkLanguage from './awk';
import CobolLanguage from './cobol';
import Algol68Language from './algol68';
import BcLanguage from './bc';
import BefungeLanguage from './befunge';
import GolfScriptLanguage from './golfscript';
import CobraLanguage from './cobra';
import IntercalLanguage from './intercal';
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
  color: string;
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
  SwiftLanguage,
  CSharpLanguage,
  ECMAScriptLanguage,
  GoLanguage,
  DLanguage,
  FSharpLanguage,
  PHPLanguage,
  PascalLanguage,
  LuaLanguage,
  PerlLanguage,
  RLanguage,
  ObjectiveCLanguage,
  ObjectiveCppLanguage,
  GolfScriptLanguage,
  AssemblyLanguage,
  VBNetLanguage,
  BashLanguage,
  FortranLanguage,
  SchemeLanguage,
  AdaLanguage,
  AwkLanguage,
  OCamlLanguage,
  BrainFuckLanguage,
  WhitespaceLanguage,
  TclLanguage,
  CobolLanguage,
  PikeLanguage,
  SedLanguage,
  BooLanguage,
  IntercalLanguage,
  BcLanguage,
  NemerleLanguage,
  CobraLanguage,
  Algol68Language,
  BefungeLanguage,
  HaxeLanguage,
  LolCodeLanguage,
  AheuiLanguage,
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
