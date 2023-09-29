import clsx from 'clsx';
import * as React from 'react';

export const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={clsx('tw-mx-auto tw-max-w-[90rem] tw-px-8', className)}>
      {children}
    </div>
  );
};
