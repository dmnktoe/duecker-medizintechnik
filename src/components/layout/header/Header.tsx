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
          className='bg-primary-600 text-primary-50 focus:ring-primary-500 absolute top-0 left-1/2 z-[100] -translate-x-1/2 -translate-y-full rounded-b px-4 py-2 text-sm font-medium shadow transition focus:translate-y-0 focus:ring-2'
        >
          {t('skipToContent')}
        </a>
        <div>
          <Container>
            <div className='h-navigation-height relative flex min-w-0 items-center'>
              <UnderlineLink href='/' className='inline-block shrink-0'>
                <Logo className='text-dark w-40 md:w-48' />
              </UnderlineLink>

              <div className='ml-auto flex min-w-0 flex-shrink-0 flex-row gap-2 md:gap-3 xl:hidden'>
                <div className='ml-auto hidden md:block'>
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

              <DesktopNav items={navigationItems} />

              <div className='ml-auto hidden min-w-0 flex-shrink-0 xl:block'>
                <div className='flex min-w-0 items-center justify-end gap-3 lg:gap-4'>
                  <div className='min-w-0 text-right text-xs'>
                    <span className='text-light-gray block'>{t('header.languageLabel')}</span>
                    <LanguagePicker
                      ariaLabel={t('header.change-locale')}
                      className='relative mt-0.5 h-7 w-full min-w-0 max-w-full cursor-pointer rounded border border-gray-200 bg-white py-0.5 pl-1 pr-6 text-sm sm:min-w-[6.5rem]'
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
