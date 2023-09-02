import clsx from 'clsx';
import Link from 'next/link';
import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  VscChevronDown,
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
import NextImage from '@/components/ui/NextImage';

import { data } from '@/constant/data';

export const Header = () => {
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
              <Link href='/' className='inline-block text-lg font-bold'>
                <Logo className='w-40 text-[#071626] md:w-48' />
              </Link>
              <div className='ml-auto xl:hidden'>
                <div className='flex flex-row gap-3'>
                  <div className='ml-auto hidden md:block xl:hidden'>
                    <div className='flex items-center'>
                      <a
                        className='text-primary-600 border-primary-500 hover:text-primary-50 hover:bg-primary-500 group relative inline-block overflow-hidden rounded-full border-[1px] bg-transparent px-6 py-5 text-lg font-bold transition duration-200 hover:scale-95 2xl:text-lg'
                        href='#'
                      >
                        <span className='relative'>Kontakt aufnehmen</span>
                      </a>
                    </div>
                  </div>
                  <button
                    className='navbar-burger flex items-center justify-center rounded-full border-[1px] border-solid border-[#071626] p-3 text-[#071626] transition duration-200 hover:scale-95 hover:bg-black hover:text-white active:bg-neutral-800 md:p-6'
                    onClick={() => setHamburgerMenuIsOpen((open) => !open)}
                    data-testid='navigationButton'
                  >
                    <VscMenu className='h-6 w-6 text-inherit' />
                    <span className='sr-only'>Toggle menu</span>
                  </button>
                </div>
              </div>
              <div
                className={clsx(
                  'top-navigation-height fixed inset-0 z-50 flex max-h-full w-full max-w-full flex-row transition-all duration-200 ease-in-out md:justify-end md:bg-gray-500/10 md:backdrop-blur-[25px] xl:hidden',
                  hamburgerMenuIsOpen
                    ? 'visible opacity-100'
                    : 'invisible opacity-0'
                )}
              >
                <div
                  data-testid='navigationMenu'
                  className={clsx(
                    'animate-fadeInRight m-0 flex h-[calc(100vh_-_var(--navigation-height))] w-full overflow-hidden transition-all duration-200 ease-in-out md:w-96',
                    hamburgerMenuIsOpen
                      ? 'translate-x-0 opacity-100'
                      : 'translate-x-2 opacity-0'
                  )}
                >
                  <div className='flex flex-grow flex-col items-stretch bg-white text-black md:m-6 md:rounded-2xl md:shadow-xl'>
                    <div className='flex flex-1 flex-grow flex-col gap-y-2 p-6 text-3xl font-bold tracking-tight'>
                      <Link href='/'>Startseite</Link>
                      <Collapsible>
                        <CollapsibleTrigger>
                          Dienstleistungen{' '}
                          <VscChevronDown className='relative -top-[1px] inline-block transform text-2xl duration-200 group-hover:rotate-180 group-hover:transform' />
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className='mt-2 flex flex-col gap-y-2 text-2xl text-gray-700'>
                            <Link href='/'>
                              <SubdirectoryIcon /> Produktion
                            </Link>
                            <Link href='/'>
                              <SubdirectoryIcon /> Reparatur
                            </Link>
                            <Link href='/'>
                              <SubdirectoryIcon /> Handel
                            </Link>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                      <Link href='/'>Downloads</Link>
                      <Link href='/'>Neuigkeiten</Link>
                    </div>
                    <div className='text-md flex flex-col justify-between gap-y-2 p-6 font-medium tracking-tight'>
                      <div className='mb-2 grid grid-cols-3 divide-x text-center'>
                        <Link href='/'>Cookies</Link>
                        <Link href='/'>Impressum</Link>
                        <Link href='/'>Datenschutz</Link>
                      </div>
                      <a
                        className='text-primary-600 border-primary-500 hover:text-primary-50 hover:bg-primary-500 group relative inline-block overflow-hidden rounded-full border-[1px] bg-transparent px-6 py-4 text-center text-xl font-bold tracking-tight transition duration-200 hover:scale-95'
                        href='#'
                      >
                        <span className='relative'>Kontakt aufnehmen</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <ul className='text-md absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 transform text-lg font-bold text-gray-600 lg:w-auto lg:space-x-10 xl:flex 2xl:text-xl'>
                <li className='group relative py-2'>
                  <Link
                    href='/'
                    className='transition duration-150 ease-in-out hover:text-black active:text-neutral-100'
                  >
                    Startseite
                  </Link>
                </li>
                <li className='group relative cursor-pointer py-2'>
                  <button
                    className='inline-block transition duration-200 ease-in-out group-hover:text-black'
                    aria-haspopup='true'
                  >
                    Dienstleistungen{' '}
                    <VscChevronDown className='relative -top-[1px] inline-block transform text-lg duration-200 group-hover:rotate-180 group-hover:transform' />
                  </button>
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
                              Unser Service <span aria-hidden='true'>→</span>
                            </p>
                            <ul className=' mt-4'>
                              <li>
                                <Link
                                  href='/produktion'
                                  className='hover:text-primary-500 hover:to-primary-50 hover:bg-primary-50 text-md -mx-2 block rounded-lg p-2 font-semibold text-gray-800 transition duration-200 ease-in-out'
                                >
                                  Produktion
                                  <p className='text-sm font-normal text-gray-500'>
                                    Nach höchstem Maßstab.
                                  </p>
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href='/reparatur'
                                  className='text-md hover:text-primary-500 hover:to-primary-50 hover:bg-primary-50 -mx-2 block rounded-lg p-2 font-semibold text-gray-800 transition duration-200 ease-in-out'
                                >
                                  Reparatur
                                  <p className='text-sm font-normal text-gray-500'>
                                    Wartung von Medizinprodukten.
                                  </p>
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href='/handel'
                                  className='text-md hover:text-primary-500 hover:to-primary-50 hover:bg-primary-50 -mx-2 block rounded-lg p-2 font-semibold text-gray-800 transition duration-200 ease-in-out'
                                >
                                  Handel
                                  <p className='text-sm font-normal text-gray-500'>
                                    Handel & b2b-Plattform.
                                  </p>
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className='group relative py-2'>
                  <button className='hover:opacity-50' aria-haspopup='true'>
                    Downloads
                  </button>
                  <div className='invisible absolute top-3 z-50 min-w-[260px] translate-y-0 transform opacity-0 transition duration-500 ease-in-out group-hover:visible group-hover:translate-y-5 group-hover:transform group-hover:opacity-100 lg:-left-2'>
                    <div className='relative top-6 w-full rounded-xl bg-white p-6 shadow-xl'>
                      <div className='absolute top-0 z-0 h-10 w-10 -translate-x-4 rotate-45 transform rounded-sm bg-white transition-transform duration-500 ease-in-out group-hover:translate-x-3'></div>
                      <div className='relative z-10'>
                        <p className='text-[13px] font-medium uppercase tracking-wider text-gray-500'>
                          Use cases
                        </p>
                        <ul className='mt-3 text-[15px]'>
                          <li>
                            <a
                              href='#'
                              className='block bg-transparent bg-gradient-to-br from-indigo-400 via-blue-500 to-pink-700 bg-clip-text py-1 font-semibold text-transparent hover:from-blue-600 hover:via-pink-400 hover:to-indigo-600'
                            >
                              Creators
                            </a>
                          </li>
                          <li>
                            <a
                              href='#'
                              className='block bg-transparent bg-gradient-to-br from-indigo-400 via-blue-500 to-pink-700 bg-clip-text py-1 font-semibold text-transparent hover:from-blue-600 hover:via-pink-400 hover:to-indigo-600'
                            >
                              Streamers
                            </a>
                          </li>
                          <li>
                            <a
                              href='#'
                              className='block bg-transparent bg-gradient-to-br from-indigo-400 via-blue-500 to-pink-700 bg-clip-text py-1 font-semibold text-transparent hover:from-blue-600 hover:via-pink-400 hover:to-indigo-600'
                            >
                              Influence
                            </a>
                          </li>
                          <li>
                            <a
                              href='#'
                              className='bg-transparent bg-gradient-to-br from-indigo-400 via-blue-500 to-pink-700 bg-clip-text py-2 font-semibold text-transparent hover:from-blue-600 hover:via-pink-400 hover:to-indigo-600'
                            >
                              Programming
                            </a>
                          </li>
                          <li>
                            <a
                              href='#'
                              className='block bg-transparent bg-gradient-to-br from-indigo-400 via-blue-500 to-pink-700 bg-clip-text py-1 font-semibold text-transparent hover:from-blue-600 hover:via-pink-400 hover:to-indigo-600'
                            >
                              Design
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
                <li className='group relative py-2'>
                  <button className='hover:opacity-50' aria-haspopup='true'>
                    Neuigkeiten
                  </button>
                  <div className='invisible absolute top-3 z-50 min-w-[560px] translate-y-0 transform opacity-0 transition duration-500 ease-in-out group-hover:visible group-hover:translate-y-5 group-hover:transform group-hover:opacity-100 lg:-left-24'>
                    <div className='relative top-6 w-full rounded-xl bg-white p-6 shadow-xl'>
                      <div className='absolute top-0 z-0 h-10 w-10 -translate-x-4 rotate-45 transform rounded-sm bg-white transition-transform duration-500 ease-in-out group-hover:translate-x-[105px]'></div>
                      <div className='relative z-10'>
                        <a
                          href='#'
                          className='-mx-2 block rounded-lg p-2 font-semibold text-gray-800 transition duration-300 ease-in-out hover:bg-gradient-to-br hover:from-indigo-50 hover:via-blue-50 hover:to-pink-50 hover:text-indigo-600'
                        >
                          Documentation
                          <p className='font-normal text-gray-500'>
                            Start integrating in no time
                          </p>
                        </a>
                        <div className='mt-6 grid grid-cols-2 gap-6'>
                          <div>
                            <p className='text-[13px] uppercase tracking-wider text-gray-500'>
                              Get started
                            </p>
                            <ul className='mt-3 text-[15px]'>
                              <li>
                                <a
                                  href='#'
                                  className='block py-1 font-normal text-gray-600 hover:text-gray-800'
                                >
                                  Libraries and SDKs
                                </a>
                              </li>
                              <li>
                                <a
                                  href='#'
                                  className='block py-1 font-normal text-gray-600 hover:text-gray-800'
                                >
                                  Plugins
                                </a>
                              </li>
                              <li>
                                <a
                                  href='#'
                                  className='block py-1 font-normal text-gray-600 hover:text-gray-800'
                                >
                                  Code samples
                                </a>
                              </li>
                              <li>
                                <a
                                  href='#'
                                  className='block py-1 font-normal text-gray-600 hover:text-gray-800'
                                >
                                  Tutorials
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div>
                            <p className='text-[13px] font-medium uppercase tracking-wider text-gray-500'>
                              Guides
                            </p>
                            <ul className='mt-3 text-[15px]'>
                              <li>
                                <a
                                  href='#'
                                  className='block py-1 font-normal text-gray-600 hover:text-gray-800'
                                >
                                  Accept online payments
                                </a>
                              </li>
                              <li>
                                <a
                                  href='#'
                                  className='block py-1 font-normal text-gray-600 hover:text-gray-800'
                                >
                                  Editing video like a pro
                                </a>
                              </li>
                              <li>
                                <a
                                  href='#'
                                  className='block py-1 font-normal text-gray-600 hover:text-gray-800'
                                >
                                  Automation techniques
                                </a>
                              </li>
                              <li>
                                <a
                                  href='#'
                                  className='block py-1 font-normal text-gray-600 hover:text-gray-800'
                                >
                                  Create stunning effects
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <div className='ml-auto hidden xl:block'>
                <div className='flex items-center'>
                  <a
                    className='text-primary-600 border-primary-500 hover:text-primary-50 hover:bg-primary-500 group relative inline-block overflow-hidden rounded-full border-[1px] bg-transparent px-6 py-5 text-lg font-bold transition duration-200 hover:scale-95 2xl:text-lg'
                    href='#'
                  >
                    <span className='relative'>Kontakt aufnehmen</span>
                  </a>
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
    <div className='relative hidden bg-[#071626] py-3 xl:block xl:w-auto'>
      <Container>
        <div className='flex items-end justify-between text-xs font-medium tracking-normal text-white'>
          <div className='flex items-center gap-x-2'>
            <VscGlobe className='text-primary-500 h-4 w-4' />
            English (United States){' '}
            <VscChevronDown className='relative inline-block text-xs' />
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
                <Link href={`mailto:${data.mail}`} className='hover:underline'>
                  {data.mail}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
