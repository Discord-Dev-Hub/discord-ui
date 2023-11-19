import { cn } from '@discord-ui/utils';

import * as React from 'react';

import { Label } from '../label/Label';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, errorMessage, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-2">
        {label ? <Label className="font-bold text-text-gray uppercase">{label}</Label> : null}
        <div className="w-full flex flex-col gap-1">
          <input
            type={type}
            className={cn(
              'flex h-11 w-full rounded-sm bg-secondaryBackground px-3 py-2 text-base file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-none disabled:cursor-not-allowed disabled:opacity-50',
              className,
            )}
            ref={ref}
            {...props}
          />
          {errorMessage ? <Label className="text-error text-sm">{errorMessage}</Label> : null}
        </div>
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
