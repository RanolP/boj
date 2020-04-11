import { SolvedTableRule } from './solved-table';
import { LanguageUsageRule } from './language-usage';
import { classifyRules } from '..';

export const RootRuleset = classifyRules([SolvedTableRule, LanguageUsageRule]);
