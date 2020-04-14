import fetch from 'node-fetch';
import { Duration, cached } from '../../cache';

const TITLE_REGEX = /<span id="problem_title">([^<]+)<\/span>/;

async function fetchProblemTitleLogic(id: number): Promise<string> {
  const response = await fetch(`https://acmicpc.net/problem/${id}`);
  const html = await response.text();
  const match = TITLE_REGEX.exec(html);
  if (match) {
    return match[1].trim();
  } else {
    return '&lt;Title Fetch Failed&rt;';
  }
}

export const fetchProblemTitle = cached(
  fetchProblemTitleLogic,
  (id) => `${id}/boj/problem-title`,
  Duration.of({ year: 1 })
);
