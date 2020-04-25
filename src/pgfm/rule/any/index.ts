import { PirimRule } from './pirim';
import { MathRule } from './math';
import { classifyRules } from '..';

export const AnyRuleset = classifyRules([PirimRule, MathRule]);
