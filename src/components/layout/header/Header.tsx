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
      <header className='h-navigation-height sticky top-0 z-50 border-b border-gray-100 bg-white'>
        <a
          href='#main'
          className='bg-primary-600 text-primary-50 focus:ring-primary-500 absolute top-0 left-1/2 z-[100] -translate-x-1/2 -translate-y-full rounded-b px-4 py-2 text-sm font-medium transition focus:translate-y-0 focus:ring-2'
        >
          {t('skipToContent')}
        </a>
        <div>
          <Container>
            {/*
              xl+: absolute-center the nav in the full content width (true viewport-center
              for the bar) without transform on the list — avoids Safari subpixel blur.
            */}
            <div className='h-navigation-height relative flex min-w-0 items-center justify-between gap-2 md:gap-3'>
              <UnderlineLink
                href='/'
                className='inline-block w-max shrink-0 xl:relative xl:z-20'
              >
                <Logo className='text-dark w-40 md:w-48' />
              </UnderlineLink>

              <div className='pointer-events-none absolute inset-x-0 top-0 z-10 hidden h-full items-center justify-center xl:flex'>
                <div className='pointer-events-auto flex max-w-full justify-center px-2'>
                  <DesktopNav items={navigationItems} />
                </div>
              </div>

              <div className='relative z-20 ml-auto flex min-w-0 shrink-0 items-center justify-end gap-2 md:gap-3'>
                <div className='flex items-center gap-2 md:gap-3 xl:hidden'>
                  <div className='ml-auto block'>
                    <ButtonLink href='/kontakt' variant='ghost'>
                      {t('header.ctaButtonText')}
                    </ButtonLink>
                  </div>
                  <MobileMenuButton
                    ref={menuButtonRef}
                    isOpen={isOpen}
                    label={t('header.toggleNavigationText')}
                    menuPanelId={MOBILE_NAV_PANEL_ID}
                    onClick={() => toggle()}
                  />
                </div>

                <div className='hidden min-w-0 items-center gap-2.5 sm:gap-3 lg:gap-4 xl:flex'>
                  <div className='min-w-0 shrink-0 text-right'>
                    <label
                      htmlFor='header-locale'
                      className='text-light-gray block text-right text-[0.7rem] font-medium tracking-wide'
                    >
                      {t('header.languageLabel')}
                    </label>
                    <LanguagePicker
                      id='header-locale'
                      name='header-languages'
                      ariaLabel={t('header.change-locale')}
                      className='mt-0.5'
                    />
                  </div>
                  <ButtonLink
                    href='/kontakt'
                    size='lg'
                    variant='light'
                    className='shrink-0 bg-gray-100 hover:underline'
                    leftIcon={VscCallOutgoing}
                    leftIconClassName='h-5 w-5 mr-1'
                  >
                    {t('header.ctaButtonText')}
                  </ButtonLink>
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
      />
    </>
  );
};
