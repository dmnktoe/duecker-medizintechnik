// TODO: Test navigationMenu and navigationButton
// TODO: User outerClick
// TODO: Header props with JSDoc
// TODO: Language switcher in TopBar
// TODO: current page in navigation indicator - with SUB PATH
// TODO: TypeSscript error
// TODO: Change locale as Dropdown an keep path

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  VscCallOutgoing,
  VscChevronDown,
  VscChevronRight,
  VscDeviceMobile,
  VscGlobe,
  VscLocation,
  VscMail,
  VscMenu,
} from 'react-icons/vsc';

import { Container } from '@/components/layout/Container';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/Collapsible';
import { Logo } from '@/components/ui/icons/logo';
import { SubdirectoryIcon } from '@/components/ui/icons/subdirectory';
import ButtonLink from '@/components/ui/links/ButtonLink';
import NextImage from '@/components/ui/NextImage';

import { data } from '@/constant/data';

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
      <header className='h-navigation-height sticky top-0 z-50 bg-white'>
        <div>
          <Container>
            <div className='h-navigation-height relative flex items-center'>
              {/* Logo Section */}
              <Link href='/' className='inline-block text-lg font-bold'>
                <Logo className='text-dark w-40 md:w-48' />
              </Link>
              {/* CTA Button / Menu Button */}
              <div className='ml-auto xl:hidden'>
                <div className='flex flex-row gap-3'>
                  <div className='ml-auto hidden md:block xl:hidden'>
                    <div className='flex items-center'>
                      <ButtonLink
                        href='/kontakt'
                        size='lg'
                        className='ml-4'
                        variant='outline'
                      >
                        {t('header.ctaButtonText')}
                      </ButtonLink>
                    </div>
                  </div>
                  <button
                    className='navbar-burger border-dark text-dark flex items-center justify-center rounded-full border-[1px] border-solid p-3 transition duration-200 hover:scale-95 hover:bg-black hover:text-white active:scale-75 active:bg-neutral-700 md:p-6'
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
                  'top-navigation-height fixed inset-0 z-50 flex max-h-full w-full max-w-full flex-row transition-all duration-200 ease-in-out md:justify-end md:bg-gray-500/10 md:backdrop-blur-[25px] xl:hidden',
                  hamburgerMenuIsOpen
                    ? 'visible opacity-100'
                    : 'invisible opacity-0',
                )}
              >
                <div
                  data-testid='navigationMenu'
                  className={clsx(
                    'animate-fadeInRight m-0 flex h-[calc(100vh_-_var(--navigation-height))] w-full overflow-hidden transition-all duration-200 ease-in-out md:w-96',
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
                    <div className='text-md flex flex-col justify-between gap-y-2 p-6 font-medium tracking-tight'>
                      <div className='mb-2 grid grid-cols-3 divide-x text-center'>
                        <Link href='/'>{t('header.cookieLinkText')}</Link>
                        <Link href='/impressum'>
                          {t('header.imprintLinkText')}
                        </Link>
                        <Link href='/datenschutz'>
                          {t('header.privacyLinkText')}
                        </Link>
                      </div>
                      <ButtonLink
                        href='/kontakt'
                        size='lg'
                        className='ml-4'
                        variant='outline'
                      >
                        {t('header.ctaButtonText')}
                      </ButtonLink>
                    </div>
                  </div>
                </div>
              </div>
              {/* Desktop navigation list */}
              <ul className='text-md absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 transform text-lg font-bold text-gray-500 lg:w-auto lg:space-x-10 xl:flex 2xl:text-xl'>
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
                    variant='outline'
                    isScaling
                    leftIcon={VscCallOutgoing}
                    leftIconClassName='h-6 w-6 mr-1'
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
  const router = useRouter();
  const { t } = useTranslation('common');
  const changeTo = router.locale === 'en' ? 'de' : 'en';

  return (
    <div className='bg-dark relative hidden py-3 xl:block xl:w-auto'>
      <Container>
        <div className='flex items-end justify-between text-xs font-medium tracking-normal text-white'>
          <div className='flex items-center gap-x-2'>
            <VscGlobe className='text-primary-500 h-4 w-4' />
            <Link href='/' locale={changeTo}>
              <button className='hover:underline'>
                {t('header.change-locale', { changeTo })}
              </button>
            </Link>
            <VscChevronRight className='relative inline-block text-xs' />
          </div>
          <div className='flex gap-x-4'>
            <div className='flex items-center gap-x-2'>
              <VscLocation className='text-primary-500 h-4 w-4' />
              {data.street}, {data.city}
            </div>
            <div className='flex items-center gap-x-2'>
              <VscDeviceMobile className='text-primary-500 h-4 w-4' />
              {data.phone}
            </div>
            <div className='flex items-center gap-x-2'>
              <VscMail className='text-primary-500 h-4 w-4' />
              <p>
                <Link href={`mailto:${data.email}`} className='hover:underline'>
                  {data.email}
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
                  <NextImage
                    alt='hero'
                    src='/images/sticky-scroll_image-production.jpg'
                    useSkeleton={true}
                    blurDataURL='/images/sticky-scroll_image-production.jpg'
                    width={500}
                    height={500}
                    className='h-full w-full overflow-hidden rounded-xl'
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
                            'text-md hover:text-primary-500 hover:to-primary-50 hover:bg-primary-50 -mx-2 block rounded-lg p-2 font-semibold text-gray-800 transition duration-200 ease-in-out',
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
