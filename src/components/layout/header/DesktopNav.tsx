'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { UnderlineLink } from '@/components/ui';

import { ServicesMenuDropdown } from './LeistungenMegaMenu';
import type { NavItemProps } from './types';

type DesktopNavProps = {
  items: NavItemProps[];
  id?: string;
  'aria-label'?: string;
};

export const DesktopNav = ({
  items,
  id = 'primary-navigation',
  'aria-label': ariaLabel = 'Main',
}: DesktopNavProps) => {
  const currentRoute = usePathname();

  return (
    <nav
      id={id}
      className='text-md absolute top-1/2 left-1/2 z-10 hidden w-auto min-w-0 -translate-x-1/2 -translate-y-1/2 text-lg text-gray-800 xl:block'
      aria-label={ariaLabel}
    >
      <ul className='flex items-center justify-center gap-1 xl:gap-2 2xl:gap-3'>
        {items.map((item, index) =>
          item.subItems ? (
            <ServicesMenuDropdown
              key={item.text + String(index)}
              item={item}
              currentRoute={currentRoute}
            />
          ) : (
            <li className='py-1' key={item.href ?? `nav-${item.text}`}>
              <UnderlineLink
                underline='hover'
                href={item.href as string}
                className={clsx(
                  'text-dark/90 hover:text-dark rounded-sm px-1.5 py-1.5 font-medium transition [font-variation-settings:normal] outline-none focus-visible:ring-2 focus-visible:ring-primary-500/30 focus-visible:ring-offset-2',
                  currentRoute === item.href && 'text-dark underline decoration-gray-300 underline-offset-8',
                )}
              >
                {item.text}
              </UnderlineLink>
            </li>
          ),
        )}
      </ul>
    </nav>
  );
};
