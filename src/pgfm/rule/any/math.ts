import { Rule } from '..';
import * as yup from 'yup';

export const MathRule: Rule<string> = {
  name: 'math',
  type: 'any',
  isBlock: false,
  schema: yup.string().required(),
  async execute(formula: string): Promise<string> {
    return `![${formula}](https://render.githubusercontent.com/render/math?math=${encodeURIComponent(
      formula,
    )})`;
  },
};
