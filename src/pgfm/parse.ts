import { createStringNode, createSyntaxNode, Node } from './node';
import vm from 'vm';
import { Print } from '../util/console';
import { highlight } from 'cli-highlight';

const BLOCK_RULE = /~~~([a-zA-Z\-_]+)\s+((?:~~?(?!~)|[^~]+)*)~~~/;
const INLINE_RULE = /{@((?:(?!@)}|[^@}:]|@(?!}))+)(?::((?:(?!@)}|[^@}]|@(?!}))+))?@}/;

const REGEX_RULESET = [
  [BLOCK_RULE, 'pgfm-block'],
  [INLINE_RULE, 'pgfm-inline'],
] as const;

export function parsePgfm(
  file: string,
  warning: Print,
  source: string,
): Node[] {
  const result = [] as Node[];
  while (source.length > 0) {
    const [match, type] = REGEX_RULESET.map(
      ([rule, type]) => [rule.exec(source), type] as const,
    ).sort(
      ([a], [b]) => (a?.index ?? source.length) - (b?.index ?? source.length),
    )[0];
    if (match === null) {
      result.push(createStringNode(source));
      break;
    }
    const before = source.substring(0, match.index);
    if (before.length > 0) {
      result.push(createStringNode(before));
    }
    try {
      const context = vm.createContext({
        module: {
          exports: {},
        },
      });
      result.push(
        createSyntaxNode(
          type,
          match[1].trim(),
          match.input.substring(match.index, match.index + match[0].length),
          match[2]
            ? type === 'pgfm-block'
              ? vm.runInContext(match[2], context) ?? context.module.exports
              : match[2].trim()
            : undefined,
        ),
      );
    } catch (e) {
      warning(
        `${e.message} on parsing ${file}\n${highlight(match[0].trim(), {
          language: 'js',
        })}`,
      );
      result.push(createStringNode(match.input));
    }
    source = source.substring(match.index + match[0].length);
  }
  return result;
}
