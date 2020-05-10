"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const console_1 = require("../../util/console");
var AnswerResultType;
(function (AnswerResultType) {
    AnswerResultType[AnswerResultType["Waiting"] = 0] = "Waiting";
    AnswerResultType[AnswerResultType["RejudgeWaiting"] = 1] = "RejudgeWaiting";
    AnswerResultType[AnswerResultType["Compiling"] = 2] = "Compiling";
    AnswerResultType[AnswerResultType["Judging"] = 3] = "Judging";
    AnswerResultType[AnswerResultType["Accepted"] = 4] = "Accepted";
    AnswerResultType[AnswerResultType["PresentationError"] = 5] = "PresentationError";
    AnswerResultType[AnswerResultType["WrongAnswer"] = 6] = "WrongAnswer";
    AnswerResultType[AnswerResultType["TimeLimitExceeded"] = 7] = "TimeLimitExceeded";
    AnswerResultType[AnswerResultType["MemoryLimitExceeded"] = 8] = "MemoryLimitExceeded";
    AnswerResultType[AnswerResultType["OutputLimitExceeded"] = 9] = "OutputLimitExceeded";
    AnswerResultType[AnswerResultType["RuntimeError"] = 10] = "RuntimeError";
    AnswerResultType[AnswerResultType["CompileError"] = 11] = "CompileError";
    AnswerResultType[AnswerResultType["CannotJudge"] = 12] = "CannotJudge";
    AnswerResultType[AnswerResultType["Deleted"] = 13] = "Deleted";
    AnswerResultType[AnswerResultType["JudgeDelaying"] = 14] = "JudgeDelaying";
    AnswerResultType[AnswerResultType["PartiallyAccepted"] = 15] = "PartiallyAccepted";
})(AnswerResultType = exports.AnswerResultType || (exports.AnswerResultType = {}));
exports.AnswerResultColorSet = {
    [AnswerResultType.Waiting]: console_1.chalk.hex('#a49e9e'),
    [AnswerResultType.RejudgeWaiting]: console_1.chalk.hex('#a49e9e'),
    [AnswerResultType.Compiling]: console_1.chalk.hex('#e67e22'),
    [AnswerResultType.Judging]: console_1.chalk.hex('#e67e22'),
    [AnswerResultType.Accepted]: console_1.chalk.hex('#009874').bold,
    [AnswerResultType.PresentationError]: console_1.chalk.hex('#fa7268'),
    [AnswerResultType.WrongAnswer]: console_1.chalk.hex('#dd4124'),
    [AnswerResultType.TimeLimitExceeded]: console_1.chalk.hex('#fa7268'),
    [AnswerResultType.MemoryLimitExceeded]: console_1.chalk.hex('#fa7268'),
    [AnswerResultType.OutputLimitExceeded]: console_1.chalk.hex('#fa7268'),
    [AnswerResultType.RuntimeError]: console_1.chalk.hex('#5f4b8b'),
    [AnswerResultType.CompileError]: console_1.chalk.hex('#0f4c81'),
    [AnswerResultType.CannotJudge]: console_1.chalk.black.strikethrough,
    [AnswerResultType.Deleted]: console_1.chalk.black.strikethrough,
    [AnswerResultType.JudgeDelaying]: console_1.chalk.hex('#e67e22'),
    [AnswerResultType.PartiallyAccepted]: console_1.chalk.hex('#efc050').bold,
};
exports.AnswerResultLabelSet = {
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
