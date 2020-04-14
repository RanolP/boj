import { Duration, cached } from '../../cache';
import fetch from 'node-fetch';
import { chalk } from '../../util/console';
import stringWidth from 'string-width';
import { DistinctChoice, ChoiceOptions } from 'inquirer';
import { aligned, stringify } from '../../util/align';

// Sorry Mr. Baekjoon, but I need this.

const ApplicationId = 'AEWEWTND4P';
const AlgoliaApiKey = '40fa3b88d4994a18f89e692619c9f3f3';

interface SnippetMatch {
  value: string;
  matchLevel: string;
}

interface HighlightMatch {
  value: string;
  matchLevel: string;
  fullyHighlighted: boolean;
  matchedWords: string[];
}

interface SearchResponse {
  results: [
    {
      hits: Array<{
        id: number;
        time: number;
        memory: number;
        title: string;
        description: string;
        original_title: string;
        original_description: string;
      }>;
      processingTimeMS: number;
    }
  ];
}

export type Test = {
  name: string;
  value: number;
  short: number;
};

export async function searchProblemLogic(
  query?: string
): Promise<Array<DistinctChoice<ChoiceOptions>>> {
  if (query) {
    try {
      const response = await fetch(
        `https://${ApplicationId}-dsn.algolia.net/1/indexes/*/queries?x-algolia-application-id=${ApplicationId}&x-algolia-api-key=${AlgoliaApiKey}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            Referer: 'https://www.acmicpc.net/',
          },
          body: JSON.stringify({
            requests: [
              {
                indexName: 'Problems',
                params: `query=${query}`,
              },
            ],
          }),
          method: 'POST',
        }
      );
      const {
        results: [{ hits }],
      } = (await response.json()) as SearchResponse;
      const id = aligned(
        hits.map(({ id }) => id),
        chalk.underline
      );
      const title = aligned(
        hits.map(({ title }) => title),
        stringify
      );
      return hits.map((it, index) => {
        let description = '';
        let width = 0;
        for (const char of it.description.replace('\n', ' ').trim()) {
          const currentWidth = stringWidth(char);
          if (width + currentWidth + 3 > 50) {
            description += '...';
            break;
          }
          description += char;
          width += currentWidth;
        }
        return {
          name: `${id[index]}  ${title[index]}  ${chalk.gray(description)}`,
          value: it.id,
          short: `${it.id} ${it.title}`,
        };
      });
    } catch (e) {
      return [JSON.stringify(e)];
    }
  }
  return [`No result for ${query}`];
}

export const searchProblem = cached(
  searchProblemLogic,
  (query) => `boj/search/${query}`,
  Duration.of({ year: 1 }),
  {
    useFileCache: false,
  }
);
