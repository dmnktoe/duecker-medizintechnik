'use client';

import clsx from 'clsx';
import { useFlags } from 'flagsmith/react';
import { useTranslations } from 'next-intl';
import * as React from 'react';
import { PiTranslate } from 'react-icons/pi';
import { VscChevronDown } from 'react-icons/vsc';

import LanguagePicker from '@/components/templates/LanguagePicker';
import { UnderlineLink } from '@/components/ui';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui';
import { SubdirectoryIcon } from '@/components/ui/Icons';

import type { NavItemProps } from './types';

const MOBILE_NAV_PANEL_ID = 'mobile-navigation-menu';

export { MOBILE_NAV_PANEL_ID };

type MobileNavDrawerProps = {
  isOpen: boolean;
  items: NavItemProps[];
  onNavigate: () => void;
  panelRef: React.RefObject<HTMLDivElement>;
};

const MobileNavItem = ({
  item,
  onNavigate,
}: {
  item: NavItemProps;
  onNavigate: () => void;
}) => (
  <>
    {item.subItems ? (
      <Collapsible>
        <CollapsibleTrigger>
          <span className='cursor-pointer hover:underline'>{item.text} </span>
          <VscChevronDown className='relative -top-[1px] inline-block transform text-2xl duration-200 group-hover:rotate-180 group-hover:transform' />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className='mt-2 flex flex-col gap-y-1 text-2xl text-gray-700'>
            {item.subItems.map((sub, index) => (
              <UnderlineLink
                underline='hover'
                href={sub.href}
                key={index}
                onClick={onNavigate}
              >
                <SubdirectoryIcon /> {sub.text}
              </UnderlineLink>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    ) : (
      <UnderlineLink
        underline='hover'
        href={item.href as string}
        className={clsx(
          'transition duration-150 ease-in-out hover:text-dark active:text-neutral-100',
        )}
        onClick={onNavigate}
      >
        {item.text}
      </UnderlineLink>
    )}
  </>
);

export const MobileNavDrawer = ({
  isOpen,
  items,
  onNavigate,
  panelRef,
}: MobileNavDrawerProps) => {
  const t = useTranslations('common');
  const flags = useFlags(['language_picker']);

  return (
    <div
      data-testid='mobile-navigation-overlay'
      className={clsx(
        'fixed inset-0 top-navigation-height z-50 flex max-h-full w-full max-w-full flex-row transition-all duration-200 ease-in-out md:justify-end md:bg-gray-500/10 md:backdrop-blur-[25px] xl:hidden',
        isOpen
          ? 'pointer-events-auto visible opacity-100'
          : 'pointer-events-none invisible opacity-0',
      )}
    >
      <div
        id={MOBILE_NAV_PANEL_ID}
        ref={panelRef}
        data-testid='navigationMenu'
        className={clsx(
          'm-0 flex h-[calc(100vh_-_var(--navigation-height))] w-full animate-fadeInRight overflow-hidden transition-all duration-200 ease-in-out md:w-96',
          isOpen ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0',
        )}
      >
        <div className='flex flex-grow flex-col items-stretch bg-white text-dark md:m-6 md:rounded-2xl md:shadow-xl'>
          <div className='flex flex-1 flex-grow flex-col gap-y-1 p-6 text-3xl font-medium tracking-tight'>
            {items.map((item, index) => (
              <MobileNavItem key={index} item={item} onNavigate={onNavigate} />
            ))}
            <MobileNavItem
              item={{
                text: t('header.ctaButtonText'),
                href: '/kontakt',
              }}
              onNavigate={onNavigate}
            />
            <hr className='my-3' />
            <div className='flex flex-col gap-y-1 text-base'>
              <UnderlineLink
                underline='hover'
                href='/impressum'
                onClick={onNavigate}
              >
                {t('header.imprintLinkText')}
              </UnderlineLink>
              <UnderlineLink
                underline='hover'
                href='/datenschutz'
                onClick={onNavigate}
              >
                {t('header.privacyLinkText')}
              </UnderlineLink>
              <div
                className={clsx(
                  'flex items-center gap-1',
                  !flags.language_picker.enabled && 'hidden',
                )}
              >
                <PiTranslate size={18} />
                <LanguagePicker className='relative h-6 cursor-pointer border-0 bg-none p-0 !text-base hover:underline focus:border-0 focus:outline-none focus:ring-0' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
