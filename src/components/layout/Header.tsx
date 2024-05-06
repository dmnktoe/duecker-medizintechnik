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
  VscDeviceMobile,
  VscGlobe,
  VscLocation,
  VscMail,
  VscMenu,
} from 'react-icons/vsc';

import { Container } from '@/components/layout/Container';
import LanguagePicker from '@/components/templates/LanguagePicker';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/Collapsible';
import { Logo } from '@/components/ui/icons/logo';
import { SubdirectoryIcon } from '@/components/ui/icons/subdirectory';
import ButtonLink from '@/components/ui/links/ButtonLink';

import { company } from '@/constant/company';

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
      <TopBar />
      <header className='sticky top-0 z-50 h-navigation-height bg-white'>
        <div>
          <Container>
            <div className='relative flex h-navigation-height items-center'>
              {/* Logo Section */}
              <Link href='/' className='inline-block text-lg font-bold'>
                <Logo className='w-40 text-dark md:w-48' />
              </Link>
              {/* CTA Button / Menu Button */}
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
                  <div className='flex flex-grow flex-col items-stretch bg-white text-black md:m-6 md:rounded-2xl md:shadow-xl'>
                    <div className='flex flex-1 flex-grow flex-col gap-y-2 p-6 text-3xl font-bold tracking-tight'>
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
                        <Link
                          href='/allgemeine-geschaeftsbedingungen'
                          className='p-1'
                        >
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
              <ul className='text-md absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 transform text-lg font-medium text-gray-500 lg:w-auto lg:space-x-8 xl:flex'>
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

const TopBar = () => {
  return (
    <div className='relative hidden bg-dark py-2 xl:block xl:w-auto'>
      <Container>
        <div className='flex items-center justify-between text-xs font-medium tracking-normal text-white'>
          <div className='flex items-center gap-x-2'>
            <VscGlobe className='h-4 w-4 text-primary-500' />
            <LanguagePicker className='relative h-6 cursor-pointer rounded-lg border-0 bg-transparent p-0 text-xs outline-none hover:underline focus:border-0 focus:outline-none focus:ring-0' />
            <VscChevronDown className='relative inline-block text-xs' />
          </div>
          <div className='flex gap-x-4'>
            <div className='flex items-center gap-x-2'>
              <VscLocation className='h-4 w-4 text-primary-500' />
              {company.street}, {company.city}
            </div>
            <div className='flex items-center gap-x-2'>
              <VscDeviceMobile className='h-4 w-4 text-primary-500' />
              {company.phone}
            </div>
            <div className='flex items-center gap-x-2'>
              <VscMail className='h-4 w-4 text-primary-500' />
              <p>
                <Link
                  href={`mailto:${company.email}`}
                  className='hover:underline'
                >
                  {company.email}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
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
            'inline-block transition duration-200 ease-in-out group-hover:text-black',
            currentRoute === href && 'underline',
          )}
          aria-haspopup='true'
        >
          {text}{' '}
          <VscChevronDown className='relative -top-[1px] inline-block transform text-lg duration-200 group-hover:rotate-180 group-hover:transform' />
        </button>
      ) : (
        <Link
          href={href as string}
          className={clsx(
            'transition duration-150 ease-in-out hover:text-black active:text-neutral-100',
            currentRoute === href && 'text-dark',
          )}
        >
          {text}
        </Link>
      )}
      {subItems && (
        <div className='invisible absolute top-3 z-50 min-w-[560px] translate-y-0 transform opacity-0 transition duration-500 ease-in-out group-hover:visible group-hover:translate-y-5 group-hover:transform group-hover:opacity-100 lg:-left-48'>
          <div className='relative top-6 w-full cursor-default rounded-xl bg-white p-6 shadow-2xl'>
            <div className='absolute top-0 z-0 h-10 w-10 translate-x-0 rotate-45 transform rounded-sm bg-white transition-transform duration-500 ease-in-out group-hover:translate-x-[12rem]'></div>
            <div className='relative z-10'>
              <div className='grid grid-cols-2 gap-6'>
                <div>
                  <Image
                    alt='hero'
                    src={megaMenuBg}
                    placeholder='blur'
                    width={500}
                    height={500}
                    className='h-full w-full overflow-hidden rounded-xl'
                    quality={100}
                  />
                </div>
                <div>
                  <p className='text-xs font-medium uppercase tracking-wider text-gray-500'>
                    {t('header.servicesDropdownText')}{' '}
                    <span aria-hidden='true'>→</span>
                  </p>
                  <ul className='mt-2'>
                    {subItems.map((item, index) => (
                      <li key={index}>
                        <Link
                          href={item.href}
                          className={clsx(
                            'text-md -mx-2 block rounded-lg p-2 font-semibold text-gray-800 transition duration-200 ease-in-out hover:bg-primary-50 hover:to-primary-50 hover:text-primary-500',
                            currentRoute === item.href && 'text-primary-500',
                          )}
                        >
                          {item.text}
                          <p className='text-sm font-normal text-gray-500'>
                            {item.description}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
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
            'transition duration-150 ease-in-out hover:text-black active:text-neutral-100',
            currentRoute === href && 'underline',
          )}
        >
          {text}
        </Link>
      )}
    </>
  );
};
