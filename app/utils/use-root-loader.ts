import { useMatches } from '@remix-run/react';
import { loader as rootLoader, RootLoaderData } from '~/root';

export function useRootLoader(): RootLoaderData {
  const rootMaches = useMatches();
  if (rootMaches) {
    return rootMaches.find((match) => match.id === 'root')!
    .data as RootLoaderData;
  }
   return {} as RootLoaderData;
}
