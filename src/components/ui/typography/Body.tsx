import React from 'react';

import clsxm from '@/lib/clsxm';

type BodyProps = {
  size?: 'xs' | 'sm' | 'base' | 'lg';
  color?: 'default' | 'light';
  className?: string;
  children: React.ReactNode;
  margin?: boolean;
};

export const Body = ({
  size = 'base',
  color = 'default',
  className,
  children,
  margin = true,
}: BodyProps) => {
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-sm md:text-base',
    lg: 'text-base md:text-lg',
  };

  const colorClasses = {
    default: 'text-dark',
    light: 'text-light-gray',
  };

  return (
    <p
      className={clsxm(
        {
          'mb-4': margin,
        },
        sizeClasses[size],
        colorClasses[color],
        className,
      )}
    >
      {children}
    </p>
  );
};
