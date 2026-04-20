import * as React from 'react';

import clsxm from '@/lib/clsxm';

import { UnstyledLink, UnstyledLinkProps } from '@/components/ui';

const PrimaryLinkVariant = ['primary', 'basic'] as const;
type PrimaryLinkProps = {
  variant?: (typeof PrimaryLinkVariant)[number];
} & UnstyledLinkProps;

export const PrimaryLink = React.forwardRef<
  HTMLAnchorElement,
  PrimaryLinkProps
>(({ className, children, variant = 'primary', ...rest }, ref) => {
  return (
    <UnstyledLink
      ref={ref}
      {...rest}
      className={clsxm(
        'inline-flex items-center',
        'focus-visible:outline-dark focus:outline-1 focus:outline-offset-2 focus:outline-dashed focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-dashed',
        //#region  //*=========== Variant ===========
        variant === 'primary' && [
          'text-primary-500 hover:text-primary-600 active:text-primary-700',
          'disabled:text-primary-200',
        ],
        variant === 'basic' && [
          'text-black hover:text-gray-600 active:text-gray-800',
          'disabled:text-gray-300',
        ],
        //#endregion  //*======== Variant ===========
        className,
      )}
    >
      {children}
    </UnstyledLink>
  );
});
