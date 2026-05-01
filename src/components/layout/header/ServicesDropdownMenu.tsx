'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import * as React from 'react';
import { VscChevronDown, VscChevronRight } from 'react-icons/vsc';

import { Body, Title, UnderlineLink } from '@/components/ui';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  isServicesPageHref,
  SERVICES_PAGE_HERO,
  SERVICES_PAGE_HREFS,
  type ServicesPageHref,
} from '@/constants/services-page-hero';

import type { SubItem } from './types';

import megaMenuBg from '~/images/header/mega-menu_bg.webp';

const OPEN_DELAY_MS = 0;
const CLOSE_DELAY_MS = 220;

type ServicesDropdownMenuProps = {
  subItems: SubItem[];
  label: string;
  isActive: boolean;
};

type MegaContentProps = {
  subItems: SubItem[];
  previewHref: ServicesPageHref | null;
  setPreviewHref: (v: ServicesPageHref | null) => void;
  currentRoute: string;
};

function ServicesMegaContent({
  subItems,
  previewHref,
  setPreviewHref,
  currentRoute,
}: MegaContentProps) {
  const t = useTranslations('common');

  return (
    <div
      className='relative w-full max-w-full min-w-0 cursor-default overflow-hidden p-4'
      onMouseLeave={() => setPreviewHref(null)}
    >
      <div className='grid grid-cols-2 gap-6'>
        <div
          className='relative aspect-square w-full max-w-[500px] overflow-hidden bg-gray-50'
          onMouseEnter={() => setPreviewHref(null)}
        >
          <div
            className={clsx(
              'absolute inset-0 transition-opacity duration-500 ease-out',
              previewHref ? 'opacity-0' : 'opacity-100',
            )}
          >
            <Image
              alt=''
              src={megaMenuBg}
              placeholder='blur'
              fill
              sizes='(min-width: 1280px) 500px, 50vw'
              className='object-cover'
              quality={90}
            />
          </div>
          {SERVICES_PAGE_HREFS.map((href) => (
            <div
              key={href}
              className={clsx(
                'absolute inset-0 transition-opacity duration-500 ease-out',
                previewHref === href ? 'opacity-100' : 'opacity-0',
              )}
              aria-hidden
            >
              <Image
                alt=''
                src={SERVICES_PAGE_HERO[href].image}
                fill
                sizes='(min-width: 1280px) 500px, 50vw'
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
              className='tracking-wide uppercase'
              margin={false}
            >
              {t('header.dropdown.title')}{' '}
              <VscChevronRight className='relative -top-px inline-block' />
            </Body>
            <ul
              className='mt-3 space-y-0.5'
              onMouseLeave={() => setPreviewHref(null)}
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
                      className={clsx(
                        'text-md text-dark -mx-2 block p-2',
                        currentRoute === item.href && 'underline',
                      )}
                      onMouseEnter={() => {
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
                        className='mt-0.5 font-normal'
                      >
                        {item.description}
                      </Body>
                    </UnderlineLink>
                  </li>
                );
              })}
            </ul>
          </div>
          <div onMouseEnter={() => setPreviewHref(null)}>
            <UnderlineLink underline='hover' href='/leistungen'>
              <Title size='five' margin={false}>
                {t('header.dropdown.bottomLinkName')}
              </Title>
            </UnderlineLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export const ServicesDropdownMenu = ({
  subItems,
  label,
  isActive,
}: ServicesDropdownMenuProps) => {
  const currentRoute = usePathname();
  const [open, setOpen] = React.useState(false);
  const [previewHref, setPreviewHref] = React.useState<ServicesPageHref | null>(
    null,
  );
  const openTimeout = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimeout = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const contentId = React.useId();

  const clearTimers = React.useCallback(() => {
    if (openTimeout.current) {
      clearTimeout(openTimeout.current);
      openTimeout.current = null;
    }
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
  }, []);

  const requestOpen = React.useCallback(() => {
    clearTimers();
    if (open) return;
    if (OPEN_DELAY_MS <= 0) {
      setOpen(true);
      return;
    }
    openTimeout.current = setTimeout(() => setOpen(true), OPEN_DELAY_MS);
  }, [clearTimers, open]);

  const requestClose = React.useCallback(() => {
    clearTimers();
    closeTimeout.current = setTimeout(() => {
      setOpen(false);
      setPreviewHref(null);
    }, CLOSE_DELAY_MS);
  }, [clearTimers]);

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) {
      setPreviewHref(null);
    }
  };

  React.useEffect(
    () => () => {
      if (openTimeout.current) clearTimeout(openTimeout.current);
      if (closeTimeout.current) clearTimeout(closeTimeout.current);
    },
    [],
  );

  return (
    <li className='relative z-20 py-2'>
      <DropdownMenu open={open} onOpenChange={handleOpenChange} modal={false}>
        <DropdownMenuTrigger asChild>
          <button
            type='button'
            className={clsx(
              'inline-flex items-center gap-1 bg-transparent px-1 py-1 transition ease-in-out outline-none',
              'hover:text-dark text-gray-800 hover:underline',
              // Keep focus ring subtle (no offset) to avoid Safari halo/shadow artifacts
              'focus-visible:ring-primary-500/30 shadow-none focus-visible:ring-2',
              (isActive || open) && 'text-dark underline',
            )}
            aria-haspopup='menu'
            aria-expanded={open}
            aria-controls={contentId}
            onPointerEnter={requestOpen}
            onPointerLeave={requestClose}
          >
            <span>{label}</span>
            <VscChevronDown
              className={clsx(
                'text-dark/50 relative -top-px size-4 shrink-0 transition duration-200',
                open && 'rotate-180',
              )}
              aria-hidden
            />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          id={contentId}
          withPortal
          preventCloseAutoFocus
          side='bottom'
          align='center'
          sideOffset={0}
          avoidCollisions
          onPointerEnter={() => {
            clearTimers();
            if (!open) setOpen(true);
          }}
          onPointerLeave={requestClose}
          className='bg-transparent p-0 shadow-none'
        >
          <div
            className='relative z-0 w-[min(900px,calc(100vw-2.5rem))] min-w-0 rounded-b-md border border-gray-200/90 bg-white'
            onPointerDown={(e) => e.stopPropagation()}
          >
            {/*
              Small diamond: z-10 below main surface z-20 so the panel paint covers the
              lower half; top edges share the same 1px border, no drop shadows.
            */}
            <div
              className='absolute top-0 z-10 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border-t border-l border-gray-200/90 bg-white'
              style={{ left: '50%' }}
              aria-hidden
            />
            <div className='relative z-20 min-w-0'>
              <ServicesMegaContent
                subItems={subItems}
                previewHref={previewHref}
                setPreviewHref={setPreviewHref}
                currentRoute={currentRoute}
              />
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </li>
  );
};
