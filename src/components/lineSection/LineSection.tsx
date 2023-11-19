import { cn } from '@discord-ui/utils';

import React from 'react';

export type LineSectionProps = {
  topChildren?: React.ReactNode;
  footerChildren?: React.ReactNode;
  title: string;
  description?: string;
  active?: boolean;
} & React.HTMLProps<HTMLDivElement>;

export const LineSection = React.forwardRef<HTMLDivElement, LineSectionProps>(
  ({ className, topChildren, footerChildren, title, active, description, ...props }, ref) => {
    return (
      <div
        className={cn(
          'w-full flex items-center gap-4 py-[0.375rem] px-3 rounded-md cursor-pointer',
          className,
          active ? 'bg-backgroundOverlaySelected' : 'hover:bg-zinc-700 hover:bg-opacity-50',
        )}
        ref={ref}
        {...props}
      >
        {topChildren}

        <div className="w-full flex flex-col gap-1 text-start">
          <p className={cn('font-medium', active ? 'text-gray-50' : 'text-gray-400')}>{title}</p>
          {description ? <p className="text-sm text-gray-300">{description}</p> : null}
        </div>
        {footerChildren}
      </div>
    );
  },
);
