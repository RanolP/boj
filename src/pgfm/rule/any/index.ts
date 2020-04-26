import { PirimRule } from './pirim';
import { MathRule } from './math';
import { DotRule } from './dot';
import { classifyRules } from '..';

export const AnyRuleset = classifyRules([PirimRule, MathRule, DotRule]);
