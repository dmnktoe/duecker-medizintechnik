'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import * as React from 'react';
import { VscChevronDown, VscChevronRight } from 'react-icons/vsc';

import { Body, Title, UnderlineLink } from '@/components/ui';

import {
  isServicesPageHref,
  SERVICES_PAGE_HERO,
  SERVICES_PAGE_HREFS,
  type ServicesPageHref,
} from '@/constants/services-page-hero';

import { useOuterClick } from '@/utils/useOuterClick';

import type { NavItemProps, SubItem } from './types';

import megaMenuBg from '~/images/header/mega-menu_bg.webp';

type LeistungenMegaMenuProps = {
  subItems: SubItem[];
  onNavigate?: () => void;
};

const MenuPanel = ({ subItems, onNavigate }: LeistungenMegaMenuProps) => {
  const t = useTranslations('common');
  const currentRoute = usePathname();
  const [previewHref, setPreviewHref] = React.useState<ServicesPageHref | null>(
    null,
  );

  return (
    <div className='relative w-full min-w-0 max-w-5xl cursor-default border border-gray-100/80 bg-white p-4 shadow-[0_24px_64px_rgba(7,22,38,0.12),0_8px_16px_rgba(7,22,38,0.04)] sm:p-5'>
      <div
        className='pointer-events-none absolute -top-2 left-[26rem] z-0 hidden h-4 w-4 translate-x-0 rotate-45 rounded-sm border-l border-t border-gray-100/80 bg-white lg:block'
        aria-hidden
      />
      <div className='relative z-10'>
        <div className='grid min-w-0 grid-cols-1 gap-6 md:min-h-[20rem] md:grid-cols-2 md:items-stretch'>
          <div
            className='relative aspect-[4/3] w-full min-w-0 max-w-full overflow-hidden rounded-sm bg-gray-50 md:aspect-square md:max-w-[min(100%,32rem)]'
            onPointerLeave={() => setPreviewHref(null)}
            onMouseLeave={() => setPreviewHref(null)}
          >
            <div
              className={clsx(
                'absolute inset-0 origin-center transition-transform duration-500 ease-out will-change-transform',
                previewHref ? 'scale-100 opacity-0' : 'scale-100 opacity-100',
                !previewHref && 'md:hover:scale-[1.04]',
              )}
            >
              <Image
                alt=''
                src={megaMenuBg}
                placeholder='blur'
                fill
                sizes='(min-width: 1280px) 32rem, 100vw'
                className='object-cover'
                quality={90}
              />
            </div>
            {SERVICES_PAGE_HREFS.map((href) => (
              <div
                key={href}
                className={clsx(
                  'absolute inset-0 origin-center transition-all duration-500 ease-out will-change-transform',
                  previewHref === href
                    ? 'scale-100 opacity-100 md:hover:scale-[1.04]'
                    : 'pointer-events-none scale-100 opacity-0',
                )}
                aria-hidden
              >
                <Image
                  alt=''
                  src={SERVICES_PAGE_HERO[href].image}
                  fill
                  sizes='(min-width: 1280px) 32rem, 100vw'
                  className='object-cover'
                  quality={90}
                />
              </div>
            ))}
          </div>
          <div className='flex min-w-0 flex-col justify-between gap-6'>
            <div className='min-w-0 grow'>
              <Body
                size='xs'
                color='light'
                className='tracking-wider uppercase'
                margin={false}
              >
                {t('header.dropdown.title')}{' '}
                <VscChevronRight className='relative -top-px inline-block' />
              </Body>
              <ul
                className='mt-3 min-w-0 max-w-full space-y-0.5'
                onPointerLeave={() => setPreviewHref(null)}
              >
                {subItems.map((item, index) => {
                  const serviceKey = isServicesPageHref(item.href)
                    ? item.href
                    : null;
                  return (
                    <li key={index}>
                      <UnderlineLink
                        underline='hover'
                        href={item.href}
                        onClick={onNavigate}
                        className={clsx(
                          'text-md text-dark -mx-2 block max-w-full rounded p-2 transition-[background-color,box-shadow] duration-200 hover:bg-gray-50',
                          currentRoute === item.href && 'underline',
                        )}
                        onPointerEnter={() => {
                          if (serviceKey) setPreviewHref(serviceKey);
                        }}
                        onFocus={() => {
                          if (serviceKey) setPreviewHref(serviceKey);
                        }}
                        onBlur={(e) => {
                          if (!e.currentTarget.contains(e.relatedTarget)) {
                            setPreviewHref(null);
                          }
                        }}
                      >
                        <span className='text-md font-medium'>{item.text}</span>
                        <Body
                          size='sm'
                          margin={false}
                          color='light'
                          className='mt-0.5 line-clamp-2 font-normal'
                        >
                          {item.description}
                        </Body>
                      </UnderlineLink>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div onPointerEnter={() => setPreviewHref(null)}>
              <UnderlineLink
                underline='hover'
                href='/leistungen'
                onClick={onNavigate}
                className='block max-w-full'
              >
                <Title size='five' margin={false}>
                  {t('header.dropdown.bottomLinkName')}
                </Title>
              </UnderlineLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HOVER_CLOSE_MS = 140;

type ServicesMenuDropdownProps = {
  item: NavItemProps;
  currentRoute: string;
};

/**
 * “Leistungen” disclosure: pointer + keyboard, ARIA, inert when closed, escape to dismiss.
 */
export const ServicesMenuDropdown = ({
  item,
  currentRoute,
}: ServicesMenuDropdownProps) => {
  const t = useTranslations('common');
  const [open, setOpen] = React.useState(false);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = React.useRef<HTMLLIElement>(null);
  const panelId = React.useId();

  const subItems = item.subItems;
  if (!subItems) return null;

  const isRouteActive = subItems.some((s) => s.href === currentRoute);

  const clearTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const requestOpen = () => {
    clearTimer();
    setOpen(true);
  };

  const requestClose = () => {
    clearTimer();
    setOpen(false);
  };

  const scheduleClose = () => {
    clearTimer();
    closeTimer.current = setTimeout(() => {
      setOpen(false);
    }, HOVER_CLOSE_MS);
  };

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  useOuterClick(containerRef, requestClose, { enabled: open });

  React.useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    [],
  );

  return (
    <li
      ref={containerRef}
      className='group relative z-20 py-1'
      onPointerEnter={requestOpen}
      onPointerLeave={scheduleClose}
    >
      <span className='block'>
        <button
          type='button'
          id={`${panelId}-trigger`}
          className={clsx(
            'text-dark/90 hover:text-dark inline-flex items-center gap-0.5 rounded-sm px-1.5 py-1.5 text-base leading-none transition [font-variation-settings:normal] outline-none focus-visible:ring-2 focus-visible:ring-primary-500/30 focus-visible:ring-offset-2',
            (open || isRouteActive) && 'text-dark underline decoration-gray-300 underline-offset-8',
          )}
          aria-expanded={open}
          aria-haspopup='true'
          aria-controls={panelId}
          onClick={() => setOpen((o) => !o)}
        >
          <span className='font-medium'>{item.text}</span>
          <VscChevronDown
            className={clsx(
              'h-4 w-4 shrink-0 transition duration-200',
              open && 'rotate-180',
            )}
            aria-hidden
          />
        </button>
      </span>
      {open ? (
        <div
          className='absolute top-full left-0 z-50 max-w-[calc(100vw-2.5rem)] pt-2 transition duration-200 ease-out motion-reduce:transition-none lg:-translate-x-1/2 lg:left-1/2 lg:min-w-[min(100vw-2.5rem,58rem)]'
          id={panelId}
          role='region'
          aria-label={t('header.dropdown.title')}
        >
          <MenuPanel subItems={subItems} />
        </div>
      ) : null}
    </li>
  );
};

/** Renders the mega menu panel (used in tests and storybook if needed). */
export { MenuPanel as LeistungenMegaMenu };
