import { ClassifiedRuleset, UnknownRule } from './rule';
import { parsePgfm } from './parse';
import { SyntaxNode } from './node';
import { Print } from '../util/console';
import highlight from 'cli-highlight';

async function processRule(
  file: string,
  warning: Print,
  rule: UnknownRule | undefined,
  context: any,
  node: SyntaxNode,
): Promise<string> {
  try {
    const data = node.data ?? {};
    if (!rule) {
      throw new Error(`Unknown rule: ${node.name}`);
    }
    rule.schema && (await rule.schema.validate(data));
    return await rule.execute(data, context);
  } catch (e) {
    warning(
      `${e.message} on preprocessing ${file}\n${highlight(node.origin.trim(), {
        language: 'js',
      })}`,
    );
    return node.origin;
  }
}

export async function preprocess(
  file: string,
  warning: Print,
  source: string,
  context: object,
  ruleset: ClassifiedRuleset,
): Promise<string> {
  const result = [];
  for (const node of parsePgfm(file, warning, source)) {
    switch (node.type) {
      case 'string': {
        result.push(node.data);
        break;
      }
      case 'pgfm-block': {
        const rule = ruleset.block[node.name];
        result.push(
          '\n\n' +
            (await processRule(file, warning, rule, context, node)) +
            '\n\n',
        );
        break;
      }
      case 'pgfm-inline': {
        const rule = ruleset.inline[node.name];
        result.push(await processRule(file, warning, rule, context, node));
        break;
      }
    }
  }
  return result.join('');
}
