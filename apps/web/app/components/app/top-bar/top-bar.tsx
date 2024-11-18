import { Link } from '@remix-run/react';
import { useMemo } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/ui/tooltip';
import { Button } from '../../ui/button';
import IconLogo from '../common/icon-logo';
import Messages from './messages';
import Notifications from './notification';
import UserAvatar from './user-avatar';

export default function TopBar() {
  const middle = useMemo(
    () =>
      [
        { icon: 'i-solar-feed-broken', label: 'Home', path: '/' },
        { icon: 'i-solar-magnifer-linear', label: 'Search', path: '/search' },
        { icon: 'i-solar-video-frame-play-horizontal-outline', label: 'Videos', path: '/videos' },
        { icon: 'i-solar-users-group-two-rounded-broken', label: 'Groups', path: '/groups' },
        { icon: 'i-solar-shop-2-broken', label: 'Marketplace', path: '/marketplace' },
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
                <IconLogo style={{ fontSize: '2em' }} />
              </Button>
            </Link>
          </div>
          <div className='flex-1 flex flex-row items-center gap-2 justify-center'>
            {middle.map((item, index) => (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Link key={index} to={item.path}>
                      <Button variant={'ghost'}>
                        <i className={item.icon} />
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>{item.label}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
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
