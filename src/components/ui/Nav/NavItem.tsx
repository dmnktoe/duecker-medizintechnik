import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import { VscChevronDown } from 'react-icons/vsc';

import clsxm from '@/lib/clsxm';

import { MegaMenuContext } from '@/components/helpers/MegaMenuContext';
import { NavItemProps } from '@/components/ui/Nav';

export const NavItem = ({ href, text, subItems }: NavItemProps) => {
  const { setIsMegaMenuVisible } = React.useContext(MegaMenuContext);
  {
    /* save subItems to state and use it in MegaMenu.tsx */
  }
  const [subItemsState, setSubItemsState] = React.useState(subItems);

  const currentRoute = usePathname();

  return (
    <li
      className={clsxm('group/navItem pointer-events-auto relative py-2')}
      onMouseEnter={subItems ? () => setIsMegaMenuVisible(true) : undefined}
      onMouseLeave={subItems ? () => setIsMegaMenuVisible(false) : undefined}
    >
      {subItems ? (
        <button
          className={clsx(
            'pointer-events-auto inline-block transition ease-in-out group-hover/navItem:text-dark',
            currentRoute === href && 'underline',
            'after:absolute after:left-0 after:h-20 after:w-full after:content-[""]',
          )}
          aria-haspopup='true'
        >
          {text}{' '}
          <VscChevronDown className='relative -top-[1px] inline-block transform text-lg duration-200 group-hover/navItem:rotate-180 group-hover/navItem:transform' />
        </button>
      ) : (
        <Link
          href={href as string}
          className={clsx(
            'pointer-events-auto hover:text-dark hover:underline active:text-neutral-400',
            currentRoute === href && 'text-dark underline',
          )}
        >
          {text}
        </Link>
      )}
    </li>
  );
};
