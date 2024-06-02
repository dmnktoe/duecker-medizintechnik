import clsx from 'clsx';
import * as React from 'react';

export const Container = ({
  children,
  className,
  width = 'max-w-[110rem]',
}: {
  children: React.ReactNode;
  className?: string;
  width?: string;
}) => {
  return (
    <div className={clsx('mx-auto px-4 md:px-8', width, className)}>
      {children}
    </div>
  );
};
