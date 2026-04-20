import * as React from 'react';
import { VscMenu } from 'react-icons/vsc';

import clsxm from '@/lib/clsxm';

export type MobileMenuButtonProps = Omit<
  React.ComponentPropsWithRef<'button'>,
  'children' | 'type'
> & {
  isOpen: boolean;
  label: string;
  menuPanelId: string;
  testId?: string;
};

export const MobileMenuButton = React.forwardRef<
  HTMLButtonElement,
  MobileMenuButtonProps
>(
  (
    {
      isOpen,
      label,
      menuPanelId,
      testId = 'navigationButton',
      className,
      ...rest
    },
    ref,
  ) => (
    <button
      ref={ref}
      type='button'
      aria-expanded={isOpen}
      aria-controls={menuPanelId}
      data-testid={testId}
      className={clsxm(
        'navbar-burger flex items-center justify-center rounded-full border border-solid border-dark p-3 text-dark transition duration-200 hover:scale-95 hover:bg-black hover:text-white active:scale-75 active:bg-neutral-700',
        className,
      )}
      {...rest}
    >
      <VscMenu className='h-6 w-6 text-inherit' aria-hidden />
      <span className='sr-only'>{label}</span>
    </button>
  ),
);

MobileMenuButton.displayName = 'MobileMenuButton';
