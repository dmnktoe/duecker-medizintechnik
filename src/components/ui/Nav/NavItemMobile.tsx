import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import { VscChevronDown } from 'react-icons/vsc';

import clsxm from '@/lib/clsxm';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/Collapsible';
import { SubdirectoryIcon } from '@/components/ui/Icons';
import { NavItemProps } from '@/components/ui/Nav';

export const ResponsiveNavItem = ({ href, text, subItems }: NavItemProps) => {
  const currentRoute = usePathname();
  return (
    <>
      {subItems ? (
        <Collapsible>
          <CollapsibleTrigger>
            {text}{' '}
            <VscChevronDown className='relative -top-[1px] inline-block transform text-2xl duration-200 group-hover:rotate-180 group-hover:transform' />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className='mt-2 flex flex-col gap-y-2 text-2xl text-gray-700'>
              {subItems.map((item, index) => (
                <Link
                  href={item.href}
                  key={index}
                  className={clsxm(currentRoute === item.href && 'underline')}
                >
                  <SubdirectoryIcon /> {item.text}
                </Link>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      ) : (
        <Link
          href={href as string}
          className={clsx(
            'transition duration-150 ease-in-out hover:text-dark active:text-neutral-100',
            currentRoute === href && 'underline',
          )}
        >
          {text}
        </Link>
      )}
    </>
  );
};
