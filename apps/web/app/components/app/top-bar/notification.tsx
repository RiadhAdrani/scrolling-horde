import { Avatar, AvatarFallback } from '~/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import Icon from '../common/icon';
import { H2, H4, Muted } from '../common/typography';

export default function Notifications() {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarFallback>
              <i className='i-solar-bell-broken' />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-80 mr-5'>
          <DropdownMenuLabel className='flex flex-row items-center gap-2'>
            <Icon icon='i-solar-bell-broken' /> Notifications
          </DropdownMenuLabel>
          <DropdownMenuItem className='h-80 flex flex-col items-center justify-center'>
            <H2>
              <Icon icon='i-solar-magnifer-linear' />
            </H2>
            <H4>You are all up to date!</H4>
            <Muted>No unread notifications.</Muted>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
