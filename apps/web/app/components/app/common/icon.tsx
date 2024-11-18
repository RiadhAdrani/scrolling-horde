import React from 'react';

export type IconName = `i-mdi-${string}`;

export interface IconProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  icon: IconName;
}

const Icon = ({ icon, className, ...props }: IconProps) => {
  return <i {...props} className={`flex-shrink-0 ${className ?? ''} ${icon}`} />;
};

export default Icon;
