import { ClassifiedRuleset } from './rule';
import { parsePgfm } from './parse';
import boxen from 'boxen';
import chalk from 'chalk';

export async function preprocess(
  source: string,
  context: object,
  ruleset: ClassifiedRuleset,
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
        let text: string;
        try {
          const data = node.data ?? {};
          if (!rule) {
            throw new Error(`Unknown rule: ${node.name}`);
          }
          rule.schema && (await rule.schema.validate(data));
          text = await rule.execute(data, context);
        } catch (e) {
          if (!('noMessage' in e)) {
            console.log(
              boxen(node.origin, { borderColor: 'gray', padding: 1 }),
            );
            console.log(chalk.red('error') + ' ' + e.message);
          }
          text = node.origin;
        }
        result.push('\n\n' + text + '\n\n');
        break;
      }
      case 'pgfm-inline': {
        const rule = ruleset.inline[node.name];
        let text: string;
        try {
          const data = node.data ?? {};
          if (!rule) {
            throw new Error(`Unknown rule: ${node.name}`);
          }
          rule.schema && (await rule.schema.validate(data));
          text = await rule.execute(data, context);
        } catch (e) {
          if (!('noMessage' in e)) {
            console.log(
              boxen(node.origin, { borderColor: 'gray', padding: 1 }),
            );
            console.log(chalk.red('error') + ' ' + e.message);
          }
          text = node.origin;
        }
        result.push(text);
        break;
      }
    }
  }
  return result.join('');
}
