import { PirimRule } from './pirim';
import { MathRule } from './math';
import { DotRule } from './dot';
import { VarRule } from './var';
import { classifyRules } from '..';

export const AnyRuleset = classifyRules([
  PirimRule,
  MathRule,
  DotRule,
  VarRule,
]);
