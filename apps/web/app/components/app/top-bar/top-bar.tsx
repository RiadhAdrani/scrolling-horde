import { Form, Link } from '@remix-run/react';
import { Button } from '../../ui/button';
import { useMemo } from 'react';
import { Avatar, AvatarFallback } from '../../ui/avatar';
import useMatchesData from '~/hooks/use-matches-data';
import { PublicUserData } from '@shared/types/user';
import UserAvatar from './user-avatar';
import Notifications from './notification';
import IconLogo from '../common/icon-logo';
import Messages from './messages';

export default function TopBar() {
  const middle = useMemo(
    () =>
      [
        { icon: 'i-mdi-book-open-page-variant', label: 'Home', path: '/' },
        { icon: 'i-mdi-magnify', label: 'Search', path: '/search' },
        { icon: 'i-mdi-video', label: 'Videos', path: '/videos' },
        { icon: 'i-mdi-shopping', label: 'Marketplace', path: '/marketplace' },
      ] as const,
    [],
  );

  return (
    <>
      <div className='absolute top-0 right-0 w-screen h-16 bg-slate-200 shadow-xl overflow-hidden'>
        <div className='size-full flex flex-row items-center px-16 py-2 gap-4'>
          <div className='flex-1 flex flex-row items-center justify-start gap-2'>
            <Link to={'/'}>
              <Button variant={'ghost'}>
                <IconLogo />
              </Button>
            </Link>
          </div>
          <div className='flex-1 flex flex-row items-center gap-2 justify-center'>
            {middle.map((item, index) => (
              <Link key={index} to={item.path}>
                <Button variant={'secondary'}>
                  <i className={item.icon} />
                </Button>
              </Link>
            ))}
          </div>
          <div className='flex-1 flex flex-row gap-2 justify-end'>
            <Messages />
            <Notifications />
            <UserAvatar />
          </div>
        </div>
      </div>
    </>
  );
}
