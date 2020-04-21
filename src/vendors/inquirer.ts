import { registerPrompt } from 'inquirer';
import AutoCompletePrompt from 'inquirer-autocomplete-prompt';
import CheckboxPlusPrompt from 'inquirer-checkbox-plus-prompt';

export { prompt } from 'inquirer';

registerPrompt('autocomplete', AutoCompletePrompt);
registerPrompt('checkbox-plus', CheckboxPlusPrompt);

declare module 'inquirer' {
  interface AutoCompleteQuestion<T> extends Question<T> {
    type: 'autocomplete';
    suggestOnly?: boolean;
    source: (
      previousAnswers: string[],
      searchTerm: string | undefined,
    ) => Promise<Array<DistinctChoice<ChoiceOptions>>>;
  }

  interface CheckboxPlusQuestion<T> extends Question<T> {
    type: 'checkbox-plus';
    highlight?: boolean;
    searchable?: boolean;
    source: (
      previousAnswers: string[],
      searchTerm: string | undefined,
    ) => Promise<Array<DistinctChoice<ChoiceOptions>>>;
  }

  interface QuestionMap<T extends Answers = Answers> {
    autocomplete: AutoCompleteQuestion<T>;
    'checkbox-plus': CheckboxPlusQuestion<T>;
  }
}
