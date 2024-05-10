import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'next-i18next';
import * as React from 'react';
import { VscArrowRight, VscChevronDown } from 'react-icons/vsc';

import { Body } from '@/components/ui/Typography';

import megaMenuBg from '/public/images/header/mega-menu_bg.webp';

export interface NavItemProps {
  href?: string;
  text: string;
  subItems?: SubItem[];
}

export interface SubItem {
  href: string;
  text: string;
  description: string;
}

const MegaMenu = ({ subItems }: { subItems: SubItem[] }) => {
  const currentRoute = usePathname();
  const { t } = useTranslation('common', { useSuspense: false });

  return (
    <div className='invisible absolute top-3 z-50 min-w-[560px] translate-y-0 transform opacity-0 transition duration-300 ease-in-out group-hover:visible group-hover:translate-y-5 group-hover:transform group-hover:opacity-100 lg:-left-56'>
      <div className='relative top-6 w-full cursor-default bg-white p-6 drop-shadow-md'>
        <div className='absolute top-0 z-0 h-10 w-10 translate-x-0 rotate-45 transform rounded-sm bg-white transition-transform duration-500 ease-in-out group-hover:translate-x-[14.5rem]'></div>
        <div className='relative z-10'>
          <div className='grid grid-cols-2 gap-6'>
            <div>
              <Image
                alt='hero'
                src={megaMenuBg}
                placeholder='blur'
                width={500}
                height={500}
                className='h-full w-full overflow-hidden'
                quality={100}
              />
            </div>
            <div>
              <p className='text-xs font-medium uppercase tracking-wider text-gray-500'>
                {t('header.servicesDropdownText')}{' '}
                <span aria-hidden='true'>
                  <VscArrowRight className='relative -top-[2px] inline-block' />
                </span>
              </p>
              <ul className='mt-2'>
                {subItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className={clsx(
                        'text-md -lg -mx-2 block p-2 font-medium text-gray-800 hover:bg-primary-50 hover:to-primary-50',
                        currentRoute === item.href && 'text-primary-500 ',
                      )}
                    >
                      {item.text}
                      <Body size='sm' margin={false} className='text-dark'>
                        {item.description}
                      </Body>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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
