import { Rule } from '..';
import * as yup from 'yup';

export const VarRule: Rule<string> = {
  name: 'var',
  type: 'any',
  isBlock: false,
  schema: yup.string().required(),
  execute(name: string): string {
    return `<i class="variable">${name}</i>`;
  },
};
