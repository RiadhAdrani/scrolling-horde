import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/ui/tooltip';
import Icon, { IconProps } from './icon';

export default function IconLogo(props: Partial<IconProps>) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Icon {...props} icon='i-solar-mouse-circle-outline' />
        </TooltipTrigger>
        <TooltipContent>Scrolling Horde</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
