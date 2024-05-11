import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import { VscChevronDown } from 'react-icons/vsc';

import { MegaMenu } from '@/components/templates/MegaMenu';
import { NavItemProps } from '@/components/ui/Nav';

export const NavItem = ({ href, text, subItems }: NavItemProps) => {
  const currentRoute = usePathname();
  return (
    <li className='group relative py-2'>
      {subItems ? (
        <button
          className={clsx(
            'inline-block transition ease-in-out group-hover:text-dark',
            currentRoute === href && 'underline',
          )}
          aria-haspopup='true'
        >
          {text}{' '}
          <VscChevronDown className='relative -top-[1px] inline-block transform text-lg duration-200 group-hover:rotate-180 group-hover:transform' />
        </button>
      ) : (
        <Link
          href={href as string}
          className={clsx(
            'hover:text-dark hover:underline active:text-neutral-400',
            currentRoute === href && 'text-dark underline',
          )}
        >
          {text}
        </Link>
      )}
      {subItems && <MegaMenu subItems={subItems} />}
    </li>
  );
};
