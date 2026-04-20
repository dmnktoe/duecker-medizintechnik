import * as React from 'react';

import clsxm from '@/lib/clsxm';

import { UnstyledLink, UnstyledLinkProps } from '@/components/ui';

type UnderlineLinkProps = UnstyledLinkProps & {
  underline?: 'always' | 'hover';
};

export const UnderlineLink = React.forwardRef<
  HTMLAnchorElement,
  UnderlineLinkProps
>(({ children, className, underline = 'always', ...rest }, ref) => {
  const underlineClasses = {
    always: 'underline hover:no-underline',
    hover: 'hover:underline',
  };

  return (
    <UnstyledLink
      ref={ref}
      {...rest}
      className={clsxm(
        'focus-visible:outline-dark focus:outline-1 focus:outline-offset-2 focus:outline-dashed focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-dashed',
        underlineClasses[underline],
        className,
      )}
    >
      {children}
    </UnstyledLink>
  );
});
