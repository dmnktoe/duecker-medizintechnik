import React from 'react';

import clsxm from '@/lib/clsxm';

type BodyProps = {
  children: React.ReactNode;
  className?: string;
  color?: 'default' | 'light';
  isStrong?: boolean;
  margin?: boolean;
  size?: 'xs' | 'sm' | 'base' | 'lg';
};

export const Body = ({
  children,
  className,
  color = 'default',
  isStrong = false,
  margin = true,
  size = 'base',
}: BodyProps) => {
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-xs md:text-sm',
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
        sizeClasses[size],
        colorClasses[color],
        isStrong && 'font-semibold',
        margin && 'mb-4',
        className,
      )}
    >
      {children}
    </p>
  );
};
