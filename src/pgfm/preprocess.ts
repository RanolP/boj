import { ClassifiedRuleset } from './rule';
import { parsePgfm } from './parse';

export async function preprocess(
  source: string,
  context: object,
  ruleset: ClassifiedRuleset
): Promise<string> {
  const result = [];
  for (const node of parsePgfm(source)) {
    switch (node.type) {
      case 'string': {
        result.push(node.data);
        break;
      }
      case 'pgfm-block': {
        const rule = ruleset.block[node.name];
        result.push(
          '\n\n' +
            (rule ? await rule.execute(node.data, context) : node.origin) +
            '\n\n'
        );
        break;
      }
      case 'pgfm-inline': {
        const rule = ruleset.inline[node.name];
        result.push(
          rule ? await rule.execute(node.data, context) : node.origin
        );
        break;
      }
    }
  }
  return result.join('');
}
