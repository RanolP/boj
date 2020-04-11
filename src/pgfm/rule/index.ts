import { Problem } from '../../problem';

export interface Rule<T = {}, Context = {}> {
  name: string;
  type: 'root' | 'note' | 'any';
  isBlock: boolean;
  execute(data: T, context: Context): PromiseLike<string> | string;
}

export type UnknownRule = Rule<unknown>;
export type Ruleset = Record<string, UnknownRule>;

export type ClassifiedRuleset = {
  block: Ruleset;
  inline: Ruleset;
};

export type NoteContext = {
  problem: Problem;
};

export function classifyRules(rules: UnknownRule[]): ClassifiedRuleset {
  return rules.reduce(
    (acc, curr) => {
      if (curr.isBlock) {
        acc.block[curr.name] = curr;
      } else {
        acc.inline[curr.name] = curr;
      }
      return acc;
    },
    {
      block: {},
      inline: {},
    } as ClassifiedRuleset
  );
}

export function combineRuleset(
  ...ruleset: ClassifiedRuleset[]
): ClassifiedRuleset {
  return ruleset.reduce(
    (acc, curr) => ({
      block: {
        ...acc.block,
        ...curr.block,
      },
      inline: {
        ...acc.inline,
        ...curr.inline,
      },
    }),
    { block: {}, inline: {} } as ClassifiedRuleset
  );
}

export * from './root/';
export * from './note/';
