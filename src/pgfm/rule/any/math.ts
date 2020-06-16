import { Rule } from '..';
import * as yup from 'yup';

export const MathRule: Rule<string> = {
  name: 'math',
  type: 'any',
  isBlock: false,
  schema: yup.string().required(),
  async execute(formula: string): Promise<string> {
    return `<img src="https://render.githubusercontent.com/render/math?math=${encodeURIComponent(formula)}" alt="${formula}" style="max-width:100%;" >`;
  },
};
