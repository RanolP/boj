import fetch from 'node-fetch';

const TITLE_REGEX = /<span id="problem_title">([^<]+)<\/span>/;

// TODO: Cache logic
export async function fetchProblemTitle(id: number): Promise<string> {
  const response = await fetch(`https://acmicpc.net/problem/${id}`);
  const html = await response.text();
  const match = TITLE_REGEX.exec(html);
  if (match) {
    return match[1].trim();
  } else {
    return '&lt;Title Fetch Failed&rt;';
  }
}
