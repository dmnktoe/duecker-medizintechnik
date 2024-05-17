import * as React from 'react';

import clsxm from '@/lib/clsxm';

import UnstyledLink, {
  UnstyledLinkProps,
} from '@/components/ui/Links/UnstyledLink';

type UnderlineLinkProps = UnstyledLinkProps & {
  underline?: 'always' | 'hover';
};

const UnderlineLink = React.forwardRef<HTMLAnchorElement, UnderlineLinkProps>(
  ({ children, className, underline = 'always', ...rest }, ref) => {
    const underlineClasses = {
      always: 'underline hover:text-primary-500',
      hover: 'hover:underline',
    };

    return (
      <UnstyledLink
        ref={ref}
        {...rest}
        className={clsxm(
          'focus:outline-dashed focus-visible:rounded-none focus-visible:ring-1 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
          underlineClasses[underline],
          className,
        )}
      >
        {children}
      </UnstyledLink>
    );
  },
);

export default UnderlineLink;
