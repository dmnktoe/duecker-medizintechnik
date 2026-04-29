'use client';

import clsx from 'clsx';
import { useFlags } from 'flagsmith/react';
import { useTranslations } from 'next-intl';
import * as React from 'react';
import { PiTranslate } from 'react-icons/pi';
import { VscClose } from 'react-icons/vsc';

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
  panelRef: React.RefObject<HTMLDivElement | null>;
  returnFocusRef: React.RefObject<HTMLElement | null>;
  titleId: string;
  descriptionId: string;
};

const MobileSubNav = ({
  item,
  onNavigate,
}: {
  item: NavItemProps;
  onNavigate: () => void;
}) => {
  const [open, setOpen] = React.useState(false);
  if (!item.subItems) return null;

  return (
    <Collapsible
      className='border-b border-gray-100/80 py-0.5'
      open={open}
      onOpenChange={setOpen}
    >
      <CollapsibleTrigger
        className='text-dark flex w-full items-center justify-between gap-2 rounded-sm py-3 pr-1 text-left text-2xl font-medium tracking-tight outline-none focus-visible:ring-2 focus-visible:ring-primary-500/30'
        data-state={open ? 'open' : 'closed'}
      >
        <span>{item.text}</span>
        <span
          className={clsx(
            'inline-flex h-8 w-8 items-center justify-center transition duration-200',
            open && 'rotate-180',
          )}
          aria-hidden
        >
          <svg
            viewBox='0 0 24 24'
            width='20'
            height='20'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
          >
            <path d='M6 9l6 6 6-6' />
          </svg>
        </span>
      </CollapsibleTrigger>
      <CollapsibleContent className='overflow-hidden'>
        <ul className='text-light-gray/95 flex flex-col gap-0.5 pb-3 pl-0.5 text-lg'>
          {item.subItems.map((sub, index) => (
            <li key={sub.href + String(index)}>
              <UnderlineLink
                underline='hover'
                href={sub.href}
                onClick={onNavigate}
                className='text-dark/95 hover:text-dark block rounded py-1.5 pr-1 font-normal'
              >
                <SubdirectoryIcon /> {sub.text}
              </UnderlineLink>
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
};

const MobileTopLink = ({
  item,
  onNavigate,
}: {
  item: NavItemProps;
  onNavigate: () => void;
}) => (
  <li className='border-b border-gray-100/80 py-0.5'>
    <UnderlineLink
      underline='hover'
      href={item.href as string}
      className='text-dark block rounded-sm py-3 text-2xl font-medium tracking-tight transition duration-150 ease-in-out outline-none focus-visible:ring-2 focus-visible:ring-primary-500/30'
      onClick={onNavigate}
    >
      {item.text}
    </UnderlineLink>
  </li>
);

export const MobileNavDrawer = ({
  isOpen,
  items,
  onNavigate,
  panelRef,
  returnFocusRef,
  titleId,
  descriptionId,
}: MobileNavDrawerProps) => {
  const t = useTranslations('common');
  const flags = useFlags(['language_picker']);
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);
  const previouslyFocused = React.useRef<HTMLElement | null>(null);
  const wasOpen = React.useRef(false);

  const handleNavigate = React.useCallback(() => {
    onNavigate();
  }, [onNavigate]);

  React.useEffect(() => {
    if (isOpen) {
      wasOpen.current = true;
      previouslyFocused.current = document.activeElement as HTMLElement | null;
      const tId = window.setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 0);
      return () => window.clearTimeout(tId);
    }
    if (wasOpen.current) {
      wasOpen.current = false;
      const el = returnFocusRef.current;
      if (el && document.contains(el)) {
        el.focus();
      } else {
        previouslyFocused.current?.focus?.();
      }
    }
  }, [isOpen, returnFocusRef]);

  React.useEffect(() => {
    if (!isOpen || !panelRef.current) return;
    const root = panelRef.current;
    const focusable = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ');

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !root) return;
      const nodes = root.querySelectorAll<HTMLElement>(focusable);
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, panelRef]);

  return (
    <div
      data-testid='mobile-navigation-overlay'
      className={clsx(
        'top-navigation-height fixed inset-0 z-50 flex max-h-full w-full max-w-full flex-row transition-all duration-200 ease-in-out md:justify-end md:bg-gray-500/20 md:backdrop-blur-sm xl:hidden',
        isOpen
          ? 'pointer-events-auto visible opacity-100'
          : 'pointer-events-none invisible opacity-0',
      )}
    >
      <div
        id={MOBILE_NAV_PANEL_ID}
        ref={panelRef}
        data-testid='navigationMenu'
        role='dialog'
        aria-modal='true'
        aria-hidden={!isOpen}
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className={clsx(
          'animate-fadeInRight m-0 flex h-[calc(100dvh-var(--navigation-height))] w-full min-w-0 max-w-full flex-col overflow-y-auto overflow-x-hidden bg-white transition-all duration-200 ease-in-out sm:border-t sm:border-gray-100/80 md:max-w-md',
          isOpen
            ? 'translate-x-0 opacity-100 md:my-6 md:ml-0 md:mr-6 md:min-h-0 md:max-h-[min(calc(100dvh-var(--navigation-height)),44rem)] md:max-w-md md:rounded-2xl md:border md:shadow-2xl'
            : 'translate-x-2 opacity-0',
        )}
      >
        {isOpen ? (
          <div className='flex w-full min-w-0 flex-col'>
            <div className='border-b border-gray-100/80 px-5 py-3'>
              <div className='flex items-start justify-between gap-3'>
                <div className='min-w-0'>
                  <h2
                    id={titleId}
                    className='text-dark text-lg font-semibold tracking-tight'
                  >
                    {t('header.navigationLabel')}
                  </h2>
                  <p
                    id={descriptionId}
                    className='text-light-gray mt-0.5 text-sm leading-snug'
                  >
                    {t('header.navigationMenuDescription')}
                  </p>
                </div>
                <button
                  ref={closeButtonRef}
                  type='button'
                  onClick={() => onNavigate()}
                  className='text-dark/80 hover:bg-gray-100 hover:text-dark -mr-1 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-transparent transition outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40'
                  aria-label={t('header.toggleNavigationText')}
                >
                  <VscClose className='h-5 w-5' aria-hidden />
                </button>
              </div>
            </div>

            <div className='px-3 pb-6 sm:px-4'>
              <ul className='px-1'>
                {items.map((item, index) => (
                  <li key={item.text + String(index)} className='list-none'>
                    {item.subItems ? (
                      <MobileSubNav
                        item={item}
                        onNavigate={handleNavigate}
                      />
                    ) : (
                      <MobileTopLink
                        item={item}
                        onNavigate={handleNavigate}
                      />
                    )}
                  </li>
                ))}

                <li className='list-none border-b border-gray-100/80 py-0.5'>
                  <UnderlineLink
                    underline='hover'
                    href='/kontakt'
                    onClick={handleNavigate}
                    className='text-primary-700 block rounded-sm py-3 pr-1 text-2xl font-medium tracking-tight'
                  >
                    {t('header.ctaButtonText')}
                  </UnderlineLink>
                </li>
              </ul>

              <div className='text-dark/90 border-t border-gray-100/80 pt-4'>
                <div className='text-light-gray flex flex-col gap-1.5 text-sm font-medium tracking-wide'>
                  <UnderlineLink
                    underline='hover'
                    href='/impressum'
                    onClick={handleNavigate}
                  >
                    {t('header.imprintLinkText')}
                  </UnderlineLink>
                  <UnderlineLink
                    underline='hover'
                    href='/datenschutz'
                    onClick={handleNavigate}
                  >
                    {t('header.privacyLinkText')}
                  </UnderlineLink>
                </div>

                {flags.language_picker.enabled && (
                  <div className='mt-5 flex flex-col gap-1.5 border-t border-gray-100/80 pt-4'>
                    <div className='text-dark flex items-center gap-2 text-sm font-medium'>
                      <PiTranslate
                        className='text-primary-600 h-4 w-4'
                        aria-hidden
                      />
                      {t('header.languageLabel')}
                    </div>
                    <LanguagePicker
                      id='mobile-locale'
                      name='mobile-languages'
                      ariaLabel={t('header.change-locale')}
                      className='border-primary-200/30 text-dark w-full min-w-0 max-w-full cursor-pointer rounded-md border bg-white px-2.5 py-2 text-left text-base shadow-sm outline-none transition focus:ring-2 focus:ring-primary-500/25'
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
