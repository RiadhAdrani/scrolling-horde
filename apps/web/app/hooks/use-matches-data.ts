import { useMatches } from '@remix-run/react';
import { useMemo } from 'react';

type MatchesRoute = '/_on' | '/_off';

export default function useMatchesData<T = unknown>(route: MatchesRoute): T {
  const matches = useMatches();

  const data = useMemo(() => matches.find(match => match.id === `routes${route}`)?.data as T, [matches]);

  return data;
}
