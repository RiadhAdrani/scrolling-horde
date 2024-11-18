import { PublicUserData } from '@shared/types/user';
import Icon from '~/components/app/common/icon';
import ResponsiveContainer from '~/components/app/common/responsive-container';
import { H2, Muted } from '~/components/app/common/typography';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/ui/tooltip';
import useMatchesData from '~/hooks/use-matches-data';
import profile from '~/lib/profile';

export default function Profile() {
  const user = useMatchesData<PublicUserData>('/_on');

  return (
    <>
      <ResponsiveContainer>
        <div
          style={{
            backgroundImage: 'url("/placeholders/gradient-1.jpg")',
          }}
          className='relative h-[300px] min-h-[300px] bg-no-repeat bg-center bg-cover rounded-md flex flex-col justify-end overflow-hidden'
        >
          <div
            style={{ background: 'linear-gradient(180deg, rgba(2,0,36,0) 0%, rgba(0,0,0,0.4) 100%)' }}
            className='absolute inset-0 h-full w-full z-0'
          />
          <div className='m-4 z-10 flex flex-row justify-end items-center'>
            <Button variant={'secondary'}>
              <Icon icon='i-solar-camera-broken' />
              <div>Edit cover photo</div>
            </Button>
          </div>
        </div>
        <div className='-mt-[30px] flex flex-row items-center gap-4 z-10'>
          <div className='flex flex-col relative'>
            <Avatar className='size-[170px] ml-4 border-white border-4'>
              <AvatarImage src='/placeholders/gradient-2.jpg' />
            </Avatar>
            <div className='absolute bottom-0 right-0 mr-2'>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button size={'icon'} className='rounded-full' variant={'secondary'}>
                      <Icon icon='i-solar-camera-broken' />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div>Edit profile photo</div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <div className='flex flex-col justify-center'>
            <H2 className='h-[40px]'>{profile(user).fullname()}</H2>
            <Muted className='h-[40px] pt-2'>0 friends</Muted>
          </div>
        </div>
      </ResponsiveContainer>
    </>
  );
}
