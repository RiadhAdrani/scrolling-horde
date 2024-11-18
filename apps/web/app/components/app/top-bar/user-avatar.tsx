import { Form, Link } from '@remix-run/react';
import { PublicUserData } from '@shared/types/user';
import { Fragment, useMemo } from 'react';
import { Avatar, AvatarFallback } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import useMatchesData from '~/hooks/use-matches-data';
import Icon, { IconName } from '../common/icon';

type Item = { icon: IconName; label: string };
type Path = Item & { type: 'path'; path: string };
type Action = Item & { type: 'action'; action: string; method: 'GET' | 'POST' };

export default function UserAvatar() {
  const user = useMatchesData<PublicUserData>('/_on');

  const items = useMemo<Array<Path | Action>>(
    () => [
      { icon: 'i-mdi-account', label: 'Profile', type: 'path', path: '/profile' },
      { icon: 'i-mdi-logout', label: 'Logout', type: 'action', action: '/api/logout', method: 'GET' },
    ],
    [],
  );

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarFallback className='uppercase'>
              {user.firstname[0]}
              {user.lastname[0]}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='mr-5'>
          {items.map((it, index) => (
            <Fragment key={index}>
              {it.type === 'path' && (
                <DropdownMenuItem>
                  <Link to={it.path}>
                    <Button className='w-full justify-start' variant={'ghost'}>
                      <Icon icon={it.icon} />
                      <div>{it.label}</div>
                    </Button>
                  </Link>
                </DropdownMenuItem>
              )}
              {it.type === 'action' && (
                <DropdownMenuItem>
                  <Form method={it.method} action={it.action} className='w-full'>
                    <Button type='submit' variant={'ghost'} className='w-full text-left'>
                      <Icon icon={it.icon} />
                      <div>{it.label}</div>
                    </Button>
                  </Form>
                </DropdownMenuItem>
              )}
            </Fragment>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
