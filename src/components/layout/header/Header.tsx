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
        <div>
          <Container>
            <div className='h-navigation-height relative flex items-center'>
              <UnderlineLink href='/' className='inline-block'>
                <Logo className='text-dark w-40 md:w-48' />
              </UnderlineLink>

              <div className='ml-auto flex flex-row gap-3 xl:hidden'>
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

              <div className='ml-auto hidden xl:block'>
                <div className='flex items-center gap-4'>
                  <LanguagePicker className='relative h-6 cursor-pointer border-0 bg-none p-0 outline-none hover:underline focus:border-0 focus:ring-0 focus:outline-none' />
                  <ButtonLink
                    href='/kontakt'
                    size='lg'
                    variant='light'
                    className='bg-gray-100 hover:underline'
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
