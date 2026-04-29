'use client';

import { useTranslations } from 'next-intl';
import * as React from 'react';
import { VscCallOutgoing } from 'react-icons/vsc';

import { Container } from '@/components/layout/Container';
import LanguagePicker from '@/components/templates/LanguagePicker';
import { ButtonLink, UnderlineLink } from '@/components/ui';
import { MobileMenuButton } from '@/components/ui/Buttons/MobileMenuButton';
import { Logo } from '@/components/ui/Icons';

import { useMobileMenu } from '@/utils/useMobileMenu';

import { DesktopNav } from './DesktopNav';
import { MOBILE_NAV_PANEL_ID, MobileNavDrawer } from './MobileNavDrawer';
import type { NavItemProps } from './types';

const PRIMARY_NAV_ID = 'site-primary-nav';

export const Header = () => {
  const t = useTranslations('common');
  const navigationItems = t.raw('header.navigationItems') as NavItemProps[];

  const menuPanelRef = React.useRef<HTMLDivElement | null>(null);
  const menuButtonRef = React.useRef<HTMLButtonElement | null>(null);
  const { isOpen, toggle, close } = useMobileMenu({
    menuPanelRef,
    menuButtonRef,
  });

  return (
    <>
      <header
        className='border-b border-gray-100/80 bg-white/95 shadow-[0_1px_0_rgba(7,22,38,0.04)] backdrop-blur supports-[backdrop-filter]:bg-white/80'
      >
        <a
          href='#main'
          className='bg-primary-600/95 text-white focus:ring-primary-500 absolute top-0 left-1/2 z-[100] -translate-x-1/2 -translate-y-full rounded-b px-4 py-2 text-sm font-medium shadow transition focus:translate-y-0 focus:ring-2'
        >
          {t('skipToContent')}
        </a>
        <div className='h-navigation-height'>
          <Container>
            <div className='relative flex h-full min-h-0 w-full min-w-0 items-center justify-between gap-2 md:gap-3'>
              <div className='shrink-0 pr-1'>
                <UnderlineLink
                  href='/'
                  className='text-dark group inline-block rounded-sm p-0.5 outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-primary-500/30'
                >
                  <span className='sr-only'>{t('header.navigationLabel')}</span>
                  <Logo
                    className='text-dark w-36 drop-shadow-sm transition group-hover:opacity-95 sm:w-40 md:w-48'
                    aria-hidden
                  />
                </UnderlineLink>
              </div>

              <DesktopNav
                id={PRIMARY_NAV_ID}
                items={navigationItems}
                aria-label={t('header.navigationLabel')}
              />

              <div
                className='ml-auto flex shrink-0 items-center'
                data-nav-actions
              >
                <div className='mr-1 hidden min-[400px]:block sm:mr-2 md:block md:pr-0 xl:pr-1'>
                  <ButtonLink
                    href='/kontakt'
                    size='md'
                    variant='ghost'
                    className='font-medium'
                  >
                    {t('header.ctaButtonText')}
                  </ButtonLink>
                </div>
                <div className='hidden min-w-0 items-center gap-1 xl:flex xl:gap-3 2xl:gap-4'>
                  <div className='min-w-0'>
                    <label
                      htmlFor='header-locale'
                      className='text-light-gray/90 block text-right text-xs font-medium tracking-wide'
                    >
                      {t('header.languageLabel')}
                    </label>
                    <LanguagePicker
                      id='header-locale'
                      name='header-languages'
                      ariaLabel={t('header.change-locale')}
                      className='relative mt-0.5 w-full min-w-[7rem] cursor-pointer rounded-md border border-gray-200/80 bg-white px-2.5 py-1.5 text-left text-sm shadow-sm outline-none transition hover:border-primary-500/20 focus:ring-2 focus:ring-primary-500/25'
                    />
                  </div>
                  <ButtonLink
                    href='/kontakt'
                    size='lg'
                    variant='light'
                    className='bg-primary-50 hover:bg-primary-100/80 inline-flex min-h-[2.75rem] shrink-0 border border-primary-200/30 shadow-sm transition'
                    leftIcon={VscCallOutgoing}
                    leftIconClassName='h-5 w-5'
                  >
                    {t('header.ctaButtonText')}
                  </ButtonLink>
                </div>

                <div className='shrink-0 pl-0.5 xl:pl-1'>
                  <MobileMenuButton
                    ref={menuButtonRef}
                    isOpen={isOpen}
                    label={t('header.toggleNavigationText')}
                    menuPanelId={MOBILE_NAV_PANEL_ID}
                    onClick={() => toggle()}
                    className='xl:hidden'
                  />
                </div>
              </div>
            </div>
          </Container>
        </div>
      </header>

      <MobileNavDrawer
        isOpen={isOpen}
        items={navigationItems}
        onNavigate={close}
        panelRef={menuPanelRef}
        returnFocusRef={menuButtonRef}
        titleId={`${MOBILE_NAV_PANEL_ID}-title`}
        descriptionId={`${MOBILE_NAV_PANEL_ID}-desc`}
      />
    </>
  );
};
