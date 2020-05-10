import { chalk } from '../../util/console';
import { Chalk } from 'chalk';

export enum AnswerResultType {
  Waiting = 0,
  RejudgeWaiting = 1,
  Compiling = 2,
  Judging = 3,
  Accepted = 4,
  PresentationError = 5,
  WrongAnswer = 6,
  TimeLimitExceeded = 7,
  MemoryLimitExceeded = 8,
  OutputLimitExceeded = 9,
  RuntimeError = 10,
  CompileError = 11,
  CannotJudge = 12,
  Deleted = 13,
  JudgeDelaying = 14,
  PartiallyAccepted = 15,
}

export const AnswerResultColorSet: Record<AnswerResultType, Chalk> = {
  [AnswerResultType.Waiting]: chalk.hex('#a49e9e'),
  [AnswerResultType.RejudgeWaiting]: chalk.hex('#a49e9e'),
  [AnswerResultType.Compiling]: chalk.hex('#e67e22'),
  [AnswerResultType.Judging]: chalk.hex('#e67e22'),
  [AnswerResultType.Accepted]: chalk.hex('#009874').bold,
  [AnswerResultType.PresentationError]: chalk.hex('#fa7268'),
  [AnswerResultType.WrongAnswer]: chalk.hex('#dd4124'),
  [AnswerResultType.TimeLimitExceeded]: chalk.hex('#fa7268'),
  [AnswerResultType.MemoryLimitExceeded]: chalk.hex('#fa7268'),
  [AnswerResultType.OutputLimitExceeded]: chalk.hex('#fa7268'),
  [AnswerResultType.RuntimeError]: chalk.hex('#5f4b8b'),
  [AnswerResultType.CompileError]: chalk.hex('#0f4c81'),
  [AnswerResultType.CannotJudge]: chalk.black.strikethrough,
  [AnswerResultType.Deleted]: chalk.black.strikethrough,
  [AnswerResultType.JudgeDelaying]: chalk.hex('#e67e22'),
  [AnswerResultType.PartiallyAccepted]: chalk.hex('#efc050').bold,
};

export const AnswerResultLabelSet: Record<AnswerResultType, string> = {
  [AnswerResultType.Waiting]: '기다리는 중',
  [AnswerResultType.RejudgeWaiting]: '재채점을 기다리는 중',
  [AnswerResultType.Compiling]: '채점 준비 중',
  [AnswerResultType.Judging]: '채점 중',
  [AnswerResultType.Accepted]: '맞았습니다!!',
  [AnswerResultType.PresentationError]: '출력 형식이 잘못되었습니다',
  [AnswerResultType.WrongAnswer]: '틀렸습니다',
  [AnswerResultType.TimeLimitExceeded]: '시간 초과',
  [AnswerResultType.MemoryLimitExceeded]: '메모리 초과',
  [AnswerResultType.OutputLimitExceeded]: '출력 초과',
  [AnswerResultType.RuntimeError]: '런타임 에러',
  [AnswerResultType.CompileError]: '컴파일 에러',
  [AnswerResultType.CannotJudge]: '채점 불가',
  [AnswerResultType.Deleted]: '삭제된 제출',
  [AnswerResultType.JudgeDelaying]: '%(remain)초 후 채점 시작',
  [AnswerResultType.PartiallyAccepted]: '맞았습니다!!',
};
