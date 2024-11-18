import type { MetaFunction } from '@remix-run/node';
import { PublicUserData } from '@shared/types/user';
import useMatchesData from '~/hooks/use-matches-data';

export const meta: MetaFunction = () => {
  return [{ title: 'Scrolling Horde' }, { name: 'description', content: 'Yet another facebook killer...' }];
};

export default function Index() {
  const user = useMatchesData<PublicUserData>('/_on');

  return <></>;
}
