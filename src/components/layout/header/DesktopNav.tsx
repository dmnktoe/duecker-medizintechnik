'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import { UnderlineLink } from '@/components/ui';

import { DesktopNavTrigger, LeistungenMegaMenu } from './LeistungenMegaMenu';
import type { NavItemProps } from './types';

type DesktopNavProps = {
  items: NavItemProps[];
};

export const DesktopNav = ({ items }: DesktopNavProps) => {
  const currentRoute = usePathname();

  return (
    <ul className='text-md absolute left-1/2 top-1/2 z-50 hidden -translate-x-1/2 -translate-y-1/2 transform text-lg text-gray-800 xl:flex xl:w-auto xl:space-x-6'>
      {items.map((item, index) => (
        <li key={index} className='group relative py-2'>
          {item.subItems ? (
            <>
              <DesktopNavTrigger
                text={item.text}
                isActive={item.subItems.some((s) => s.href === currentRoute)}
              />
              <LeistungenMegaMenu subItems={item.subItems} />
            </>
          ) : (
            <UnderlineLink
              underline='hover'
              href={item.href as string}
              className={clsx(
                'rounded-md px-1 py-1 transition ease-in-out',
                currentRoute === item.href && 'text-dark underline',
              )}
            >
              {item.text}
            </UnderlineLink>
          )}
        </li>
      ))}
    </ul>
  );
};
