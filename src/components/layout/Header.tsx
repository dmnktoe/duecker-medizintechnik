// TODO: User outerClick to close hamburger menu
// TODO: current page in navigation indicator - with SUB PATH

import clsx from 'clsx';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { VscCallOutgoing, VscMenu } from 'react-icons/vsc';

import { Container } from '@/components/layout/Container';
import { Logo } from '@/components/ui/Icons/logo';
import ButtonLink from '@/components/ui/Links/ButtonLink';
import { NavItem, ResponsiveNavItem } from '@/components/ui/Nav';

export const Header = () => {
  const { t, ready } = useTranslation('common', { useSuspense: false });
  const [hamburgerMenuIsOpen, setHamburgerMenuIsOpen] = useState(false);

  useEffect(() => {
    const html = document.querySelector('html');
    if (html) html.classList.toggle('overflow-hidden', hamburgerMenuIsOpen);
  }, [hamburgerMenuIsOpen]);

  useEffect(() => {
    const keyDownHandler = (event: {
      key: string;
      preventDefault: () => void;
    }) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeHamburgerNavigation();
      }
    };

    const closeHamburgerNavigation = () => setHamburgerMenuIsOpen(false);

    window.addEventListener('orientationchange', closeHamburgerNavigation);
    window.addEventListener('resize', closeHamburgerNavigation);
    document.addEventListener('keydown', keyDownHandler);

    return () => {
      window.removeEventListener('orientationchange', closeHamburgerNavigation);
      window.removeEventListener('resize', closeHamburgerNavigation);
    };
  }, [setHamburgerMenuIsOpen]);

  const LogoSection = () => {
    return (
      <Link href='/' className='inline-block'>
        <Logo className='w-40 text-dark md:w-48' />
      </Link>
    );
  };

  const DesktopMenu = () => {
    return (
      <ul className='text-md absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 transform text-lg font-medium text-gray-500 lg:w-auto lg:space-x-8 xl:flex'>
        {ready &&
          t('header.navigationItems', { returnObjects: true }).map(
            (item, index) => <NavItem key={index} {...item} />,
          )}
      </ul>
    );
  };

  const DesktopCta = () => {
    return (
      <div className='ml-auto hidden xl:block'>
        <div className='flex items-center'>
          <ButtonLink
            href='/kontakt'
            size='lg'
            variant='light'
            isScaling
            leftIcon={VscCallOutgoing}
            leftIconClassName='h-6 w-6 mr-1'
            className='border-[1px] border-dashed border-neutral-300'
          >
            {t('header.ctaButtonText')}
          </ButtonLink>
        </div>
      </div>
    );
  };

  const MobileMenuOverlay = () => {
    return (
      <div
        className={clsx(
          'fixed inset-0 top-navigation-height z-50 flex max-h-full w-full max-w-full flex-row transition-all duration-200 ease-in-out md:justify-end md:bg-gray-500/10 md:backdrop-blur-[25px] xl:hidden',
          hamburgerMenuIsOpen ? 'visible opacity-100' : 'invisible opacity-0',
        )}
      >
        <div
          data-testid='navigationMenu'
          className={clsx(
            'm-0 flex h-[calc(100vh_-_var(--navigation-height))] w-full animate-fadeInRight overflow-hidden transition-all duration-200 ease-in-out md:w-96',
            hamburgerMenuIsOpen
              ? 'translate-x-0 opacity-100'
              : 'translate-x-2 opacity-0',
          )}
        >
          <MobileMenu />
        </div>
      </div>
    );
  };

  const MobileMenu = () => {
    const Nav = () => {
      return (
        <div className='flex flex-1 flex-grow flex-col gap-y-2 p-6 text-3xl font-medium tracking-tight'>
          {ready &&
            t('header.navigationItems', {
              returnObjects: true,
            }).map((item, index) => (
              <ResponsiveNavItem key={index} {...item} />
            ))}
        </div>
      );
    };

    const Terms = () => {
      return (
        <div className='flex flex-col justify-between gap-y-2 px-3 py-6 text-xs font-medium tracking-tight'>
          <div className='mb-2 grid grid-cols-2 grid-rows-2 items-center text-center text-xs underline'>
            <Link href='/impressum' className='p-1'>
              {t('header.imprintLinkText')}
            </Link>
            <Link href='/datenschutz' className='p-1'>
              {t('header.privacyLinkText')}
            </Link>
            <Link href='/allgemeine-geschaeftsbedingungen' className='p-1'>
              {t('header.termsAndConditionsLinkText')}
            </Link>
            <Link href='/cookie-richtlinie' className='p-1'>
              {t('header.cookieLinkText')}
            </Link>
          </div>
          <ButtonLink
            href='/kontakt'
            size='base'
            variant='light'
            className='border-[1px] border-dashed border-neutral-300'
          >
            {t('header.ctaButtonText')}
          </ButtonLink>
        </div>
      );
    };

    return (
      <div className='flex flex-grow flex-col items-stretch bg-white text-dark md:m-6 md:rounded-2xl md:shadow-xl'>
        <Nav />
        <Terms />
      </div>
    );
  };

  const MobileCtaToggle = () => {
    return (
      <div className='ml-auto xl:hidden'>
        <div className='flex flex-row gap-3'>
          <div className='ml-auto hidden md:block xl:hidden'>
            <div className='flex items-center'>
              <ButtonLink
                href='/kontakt'
                size='base'
                className='ml-4'
                variant='outline'
              >
                {t('header.ctaButtonText')}
              </ButtonLink>
            </div>
          </div>
          <button
            className='navbar-burger flex items-center justify-center rounded-full border-[1px] border-solid border-dark p-3 text-dark transition duration-200 hover:scale-95 hover:bg-black hover:text-white active:scale-75 active:bg-neutral-700'
            onClick={() => setHamburgerMenuIsOpen((open) => !open)}
            data-testid='navigationButton'
          >
            <VscMenu className='h-6 w-6 text-inherit' />
            <span className='sr-only'>{t('header.toggleNavigationText')}</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <header className='sticky top-0 z-50 h-navigation-height bg-white'>
        <div>
          <Container>
            <div className='relative flex h-navigation-height items-center'>
              {/* Logo Section */}
              <LogoSection />
              {/* CTA Button / Menu Button */}
              <MobileCtaToggle />
              {/* Absolute positioned mobile menu with blur-mask */}
              <MobileMenuOverlay />
              {/* Desktop navigation list */}
              <DesktopMenu />
              {/* CTA Button */}
              <DesktopCta />
            </div>
          </Container>
        </div>
      </header>
    </>
  );
};
