import { Avatar, AvatarFallback } from '~/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import Icon from '../common/icon';
import { H2, H4 } from '../common/typography';
import { Button } from '~/components/ui/button';

export default function Messages() {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarFallback>
              <i className='i-mdi-message' />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-80 mr-5'>
          <DropdownMenuLabel className='flex flex-row items-center gap-2'>
            <Icon icon='i-mdi-message' /> Messages
          </DropdownMenuLabel>
          <DropdownMenuItem className='h-80 flex flex-col items-center justify-center'>
            <H2>
              <Icon icon='i-mdi-magnify' />
            </H2>
            <H4>It's empty here...</H4>
            <Button>Start a conversation with someone</Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
