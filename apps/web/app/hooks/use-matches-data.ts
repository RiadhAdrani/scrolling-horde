import { useMatches } from '@remix-run/react';
import { useMemo } from 'react';

export default function useMatchesData<T = unknown>(route: string): T {
  const matches = useMatches();

  const data = useMemo(() => matches.find(match => match.id === route)?.data as T, []);

  return data;
}
