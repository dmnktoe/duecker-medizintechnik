// TODO: User outerClick to close hamburger menu
// TODO: current page in navigation indicator - with SUB PATH
// TODO: TypeScript error

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'next-i18next';
import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  VscCallOutgoing,
  VscChevronDown,
  VscChevronRight,
  VscMenu,
} from 'react-icons/vsc';

import { Container } from '@/components/layout/Container';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/Collapsible';
import { Logo } from '@/components/ui/Icons/logo';
import { SubdirectoryIcon } from '@/components/ui/Icons/subdirectory';
import ButtonLink from '@/components/ui/Links/ButtonLink';
import UnderlineLink from '@/components/ui/Links/UnderlineLink';

import { Body, Title } from '../ui/Typography';

import megaMenuBg from '/public/images/header/mega-menu_bg.webp';

export interface NavItemProps {
  href?: string;
  text: string;
  subItems?: SubItem[];
}

export interface SubItem {
  href: string;
  text: string;
  description: string;
}

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

  return (
    <>
      <header className='sticky top-0 z-50 h-navigation-height border-b border-gray-100 bg-white'>
        <div>
          <Container>
            <div className='relative flex h-navigation-height items-center'>
              {/* Logo Section */}
              <UnderlineLink href='/' className='inline-block'>
                <Logo className='w-40 text-dark md:w-48' />
              </UnderlineLink>
              {/* CTA Button / Menu Button */}
              <div className='ml-auto xl:hidden'>
                <div className='flex flex-row gap-3'>
                  <div className='ml-auto hidden md:block xl:hidden'>
                    <div className='flex items-center'>
                      <ButtonLink href='/kontakt' variant='ghost'>
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
                    <span className='sr-only'>
                      {t('header.toggleNavigationText')}
                    </span>
                  </button>
                </div>
              </div>
              {/* Absolute positioned mobile menu with blur-mask */}
              <div
                className={clsx(
                  'fixed inset-0 top-navigation-height z-50 flex max-h-full w-full max-w-full flex-row transition-all duration-200 ease-in-out md:justify-end md:bg-gray-500/10 md:backdrop-blur-[25px] xl:hidden',
                  hamburgerMenuIsOpen
                    ? 'visible opacity-100'
                    : 'invisible opacity-0',
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
                  <div className='flex flex-grow flex-col items-stretch bg-white text-dark md:m-6 md:rounded-2xl md:shadow-xl'>
                    <div className='flex flex-1 flex-grow flex-col gap-y-2 p-6 text-3xl font-medium tracking-tight'>
                      {ready &&
                        t('header.navigationItems', {
                          returnObjects: true,
                        }).map((item, index) => (
                          <ResponsiveNavItem key={index} {...item} />
                        ))}
                    </div>
                    <div className='flex flex-col justify-between gap-y-2 px-3 py-6 text-xs font-medium tracking-tight'>
                      <div className='mb-2 grid grid-cols-2 grid-rows-2 items-center text-center text-xs underline'>
                        <Link href='/impressum' className='p-1'>
                          {t('header.imprintLinkText')}
                        </Link>
                        <Link href='/datenschutz' className='p-1'>
                          {t('header.privacyLinkText')}
                        </Link>
                        <Link href='/agb' className='p-1'>
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
                  </div>
                </div>
              </div>
              {/* Desktop navigation list */}
              <ul className='text-md absolute left-1/2 top-1/2 z-50 hidden -translate-x-1/2 -translate-y-1/2 transform text-lg text-gray-800 xl:flex xl:w-auto xl:space-x-6 2xl:space-x-10'>
                {ready &&
                  t('header.navigationItems', { returnObjects: true }).map(
                    (item, index) => <NavItem key={index} {...item} />,
                  )}
              </ul>
              {/* CTA Button */}
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
            </div>
          </Container>
        </div>
      </header>
    </>
  );
};

const NavItem = ({ href, text, subItems }: NavItemProps) => {
  const currentRoute = usePathname();
  const { t } = useTranslation('common', { useSuspense: false });
  return (
    <li className='group relative py-2'>
      {subItems ? (
        <button
          className={clsx(
            'inline-block transition ease-in-out group-hover:text-dark',
            currentRoute === href && 'underline',
          )}
          aria-haspopup='true'
        >
          {text}{' '}
          <VscChevronDown className='relative -top-[1px] inline-block transform duration-200 group-hover:rotate-180 group-hover:transform' />
        </button>
      ) : (
        <UnderlineLink
          underline='hover'
          href={href as string}
          className={clsx(currentRoute === href && 'text-dark underline')}
        >
          {text}
        </UnderlineLink>
      )}
      {subItems && (
        <div className='invisible absolute top-1.5 min-w-[900px] translate-y-0 transform opacity-0 transition duration-300 ease-in-out group-hover:visible group-hover:translate-y-5 group-hover:transform group-hover:opacity-100 lg:-left-[400px]'>
          <div className='relative top-6 w-full cursor-default bg-white p-4 drop-shadow-2xl'>
            <div className='absolute top-0 z-0 h-10 w-10 translate-x-0 rotate-45 transform rounded-sm bg-white transition-transform duration-500 ease-in-out group-hover:translate-x-[26rem]'></div>
            <div className='relative z-10'>
              <div className='grid grid-cols-2 gap-6'>
                <div>
                  <Image
                    alt='hero'
                    src={megaMenuBg}
                    placeholder='blur'
                    width={500}
                    height={500}
                    className='h-full w-full overflow-hidden'
                    quality={100}
                  />
                </div>
                <div className='flex flex-col justify-between'>
                  <div className='grow'>
                    <Body
                      size='xs'
                      color='light'
                      className='uppercase'
                      margin={false}
                    >
                      {t('header.dropdown.title')}{' '}
                      <VscChevronRight className='relative -top-[1px] inline-block' />
                    </Body>
                    <ul className='mt-2'>
                      {subItems.map((item, index) => (
                        <li key={index}>
                          <UnderlineLink
                            underline='hover'
                            href={item.href}
                            className={clsx(
                              'text-md -mx-2 block p-2 text-dark',
                              currentRoute === item.href && 'underline',
                            )}
                          >
                            {item.text}
                            <Body
                              size='sm'
                              margin={false}
                              color='light'
                              className='font-normal'
                            >
                              {item.description}
                            </Body>
                          </UnderlineLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className='flex justify-start align-bottom'>
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
      )}
    </li>
  );
};

const ResponsiveNavItem = ({ href, text, subItems }: NavItemProps) => {
  const currentRoute = usePathname();
  return (
    <>
      {subItems ? (
        <Collapsible>
          <CollapsibleTrigger>
            {text}{' '}
            <VscChevronDown className='relative -top-[1px] inline-block transform text-2xl duration-200 group-hover:rotate-180 group-hover:transform' />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className='mt-2 flex flex-col gap-y-2 text-2xl text-gray-700'>
              {subItems.map((item, index) => (
                <Link href={item.href} key={index}>
                  <SubdirectoryIcon /> {item.text}
                </Link>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      ) : (
        <Link
          href={href as string}
          className={clsx(
            'transition duration-150 ease-in-out hover:text-dark active:text-neutral-100',
            currentRoute === href && 'underline',
          )}
        >
          {text}
        </Link>
      )}
    </>
  );
};
