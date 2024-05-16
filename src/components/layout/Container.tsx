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
    <div className={clsx('mx-auto max-w-[90rem] px-4 md:px-8', className)}>
      {children}
    </div>
  );
};
