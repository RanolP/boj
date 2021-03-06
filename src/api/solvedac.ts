import fetch from 'node-fetch';
import { Duration, cached } from '../cache';

interface SolvedAcAlgorithm {
  algorithm_id: number;
  tag_name: string;
  full_name_en: string;
  short_name_en: string;
  full_name_ko: string;
  aliases: string;
}

interface SolvedAcProblemLevel {
  level: number;
  kudeki_level: number;
  algorithms: SolvedAcAlgorithm[];
}

async function fetchProblemLevelLogic(
  id: number
): Promise<SolvedAcProblemLevel> {
  const response = await fetch(
    `https://api.solved.ac/problem_level.php?id=${id}`
  );
  return await response.json();
}

export const ProblemLevelNameMap: Record<number, string> = Object.fromEntries(
  [
    'Bronze',
    'Silver',
    'Gold',
    'Platinum',
    'Diamond',
    'Ruby',
  ].flatMap((tier, tierIndex) =>
    ['V', 'IV', 'III', 'II', 'I'].map((level, levelIndex) => [
      1 + tierIndex * 5 + levelIndex,
      `${tier} ${level}`,
    ])
  )
);

export const fetchProblemLevel = cached(
  fetchProblemLevelLogic,
  (id) => `${id}/solved/level`,
  Duration.of({ day: 14 })
);
