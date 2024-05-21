import clsx from 'clsx';
import React from 'react';

type Size = 'one' | 'two' | 'three' | 'four' | 'five';

interface TitleProps {
  renderAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: Size;
  children: string;
  margin?: boolean;
  className?: string;
}

export const Title = ({
  renderAs = 'h1',
  size = 'one',
  children,
  margin = true,
  className,
}: TitleProps) => {
  const Component = renderAs;

  return (
    <Component
      className={clsx(
        'font-medium -tracking-[0.01em] text-dark',
        {
          'text-4xl md:text-5xl md:leading-[1.1] 2xl:text-[3.4rem]':
            size === 'one',
          'text-3xl md:text-4xl': size === 'two',
          'text-2xl md:text-3xl': size === 'three',
          'text-xl md:text-2xl': size === 'four',
          'text-lg md:text-xl': size === 'five',
        },
        {
          'mb-4': margin,
        },
        className,
      )}
    >
      {children}
    </Component>
  );
};
