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

import megaMenuBg from '/public/images/header/mega-menu_bg.webp';

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
      className='invisible absolute top-1.5 min-w-[900px] translate-y-0 transform opacity-0 transition duration-200 ease-out focus-within:visible focus-within:translate-y-5 focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-5 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-5 group-hover:opacity-100 lg:-left-[400px]'
      onMouseLeave={() => setPreviewHref(null)}
    >
      <div className='relative top-6 w-full cursor-default rounded-lg bg-white p-4 shadow-2xl ring-1 ring-black/5'>
        <div
          className='absolute top-0 z-0 h-10 w-10 translate-x-0 rotate-45 transform rounded-sm bg-white transition-transform duration-500 ease-in-out group-focus-within:translate-x-[26rem] group-hover:translate-x-[26rem]'
          aria-hidden
        />
        <div className='relative z-10'>
          <div className='grid grid-cols-2 gap-6'>
            <div className='relative aspect-square w-full max-w-[500px] overflow-hidden rounded-md bg-gray-50'>
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
                  className='uppercase tracking-wide'
                  margin={false}
                >
                  {t('header.dropdown.title')}{' '}
                  <VscChevronRight className='relative -top-[1px] inline-block' />
                </Body>
                <ul className='mt-3 space-y-0.5'>
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
                            'block rounded-md px-2 py-2.5 text-base text-dark transition-colors duration-150 hover:bg-gray-50',
                            currentRoute === item.href &&
                              'bg-gray-50 underline',
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
              <div>
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
      'inline-flex items-center gap-1 rounded-md px-1 py-1 outline-none transition ease-in-out focus-visible:ring-2 focus-visible:ring-dark/30 group-hover:text-dark group-hover:underline',
      isActive && 'underline',
    )}
    aria-haspopup='true'
  >
    {text}
    <VscChevronDown className='relative -top-[1px] inline-block transform duration-200 group-focus-within:rotate-180 group-hover:rotate-180' />
  </button>
);
