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

import type { SubItem } from './types';

import megaMenuBg from '~/images/header/mega-menu_bg.webp';

type LeistungenMegaMenuProps = {
  subItems: SubItem[];
};

export const LeistungenMegaMenu = ({ subItems }: LeistungenMegaMenuProps) => {
  const t = useTranslations('common');
  const currentRoute = usePathname();
  const [previewHref, setPreviewHref] = React.useState<ServicesPageHref | null>(
    null,
  );

  return (
    <div
      className='invisible pointer-events-none absolute top-full left-1/2 z-30 flex w-[min(900px,calc(100vw-2.5rem))] min-w-0 -translate-x-1/2 flex-col items-stretch translate-y-0 opacity-0 transition duration-200 ease-out group-focus-within:visible group-focus-within:translate-y-1.5 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-1.5 group-hover:opacity-100 focus-within:visible focus-within:translate-y-1.5 focus-within:opacity-100'
    >
      {/*
        pointer-events-none on the wide box: no invisible 900px wall blocking sibling links.
        Thin bridge + card are pointer-events-auto. No decorative “diamond” arrow (it
        never aligned well and looked broken over the hero).
      */}
      <div
        className='pointer-events-auto h-1.5 w-full min-w-0 max-w-full shrink-0'
        aria-hidden
      />
      <div
        className='bg-white pointer-events-auto relative w-full min-w-0 max-w-full cursor-default overflow-hidden rounded-lg border border-gray-200/90 p-4 shadow-[0_20px_50px_-12px_rgba(7,22,38,0.15)]'
        onMouseLeave={() => setPreviewHref(null)}
      >
        <div className='relative z-10'>
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
            <div className='flex flex-col justify-between gap-6'>
              <div className='grow'>
                <Body
                  size='xs'
                  color='light'
                  className='tracking-wide uppercase'
                  margin={false}
                >
                  {t('header.dropdown.title')}{' '}
                  <VscChevronRight className='relative -top-[1px] inline-block' />
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
                          <span className='text-md font-medium'>
                            {item.text}
                          </span>
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
      </div>
    </div>
  );
};

export const DesktopNavTrigger = ({
  text,
  isActive,
}: {
  text: string;
  isActive: boolean;
}) => (
  <button
    type='button'
    className={clsx(
      'text-dark/90 group-hover:text-dark focus-visible:ring-primary-500/30 inline-flex items-center gap-1 rounded-sm px-1.5 py-1.5 text-base font-medium transition ease-in-out outline-none',
      'group-hover:underline focus-visible:ring-2 focus-visible:ring-offset-2',
      isActive && 'text-dark underline decoration-gray-300 underline-offset-4',
    )}
    aria-haspopup='true'
  >
    <span>{text}</span>
    <VscChevronDown
      className='text-dark/50 size-4 shrink-0 transition duration-200 group-focus-within:rotate-180 group-hover:rotate-180'
      aria-hidden
    />
  </button>
);
