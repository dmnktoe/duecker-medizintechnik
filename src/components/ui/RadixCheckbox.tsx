'use client';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as React from 'react';
import { ImCheckmark } from 'react-icons/im';

import clsxm from '@/lib/clsxm';

const RadixCheckbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={clsxm(
      'peer flex h-4 w-4 shrink-0 items-center justify-center rounded border border-gray-300 bg-white',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'data-[state=checked]:border-primary-600 data-[state=checked]:bg-primary-600 data-[state=checked]:text-white',
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className='flex items-center justify-center text-current'>
      <ImCheckmark className='h-3 w-3' aria-hidden />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
RadixCheckbox.displayName = CheckboxPrimitive.Root.displayName;

export { RadixCheckbox };
