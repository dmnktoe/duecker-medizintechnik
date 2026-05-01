'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import { UnderlineLink } from '@/components/ui';

import type { NavItemProps } from './header.types';
import { ServicesDropdownMenu } from './ServicesDropdownMenu';

type DesktopNavProps = {
  items: NavItemProps[];
};

export const DesktopNav = ({ items }: DesktopNavProps) => {
  const currentRoute = usePathname();

  return (
    <ul className='text-md z-50 flex w-auto max-w-full min-w-0 items-center text-lg text-gray-800 xl:space-x-6'>
      {items.map((item, index) =>
        item.subItems ? (
          <ServicesDropdownMenu
            key={index}
            subItems={item.subItems}
            label={item.text}
            isActive={item.subItems.some((s) => s.href === currentRoute)}
          />
        ) : (
          <li key={item.href ?? index} className='py-2'>
            <UnderlineLink
              underline='hover'
              href={item.href as string}
              className={clsx(
                'px-1 py-1 transition ease-in-out',
                currentRoute === item.href && 'text-dark underline',
              )}
            >
              {item.text}
            </UnderlineLink>
          </li>
        ),
      )}
    </ul>
  );
};
