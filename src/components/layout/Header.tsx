import clsx from 'clsx';
import Link from 'next/link';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { HiMail, HiOutlineChevronDown, HiPhone } from 'react-icons/hi';
import { HiLanguage } from 'react-icons/hi2';

import { Container } from '@/components/layout/Container';
import { Logo } from '@/components/ui/icons/logo';
import NextImage from '@/components/ui/NextImage';

export const Header = () => {
  const [hamburgerMenuIsOpen, setHamburgerMenuIsOpen] = useState(false);

  useEffect(() => {
    const html = document.querySelector('html');
    if (html) html.classList.toggle('overflow-hidden', hamburgerMenuIsOpen);
  }, [hamburgerMenuIsOpen]);

  useEffect(() => {
    const closeHamburgerNavigation = () => setHamburgerMenuIsOpen(false);

    window.addEventListener('orientationchange', closeHamburgerNavigation);
    window.addEventListener('resize', closeHamburgerNavigation);

    return () => {
      window.removeEventListener('orientationchange', closeHamburgerNavigation);
      window.removeEventListener('resize', closeHamburgerNavigation);
    };
  }, [setHamburgerMenuIsOpen]);

  return (
    <>
      <div className='relative hidden bg-[#071626] py-3 lg:w-auto xl:block'>
        <Container>
          <div className='flex items-end justify-between text-xs font-medium tracking-normal text-white'>
            <div className='flex items-center gap-x-2'>
              <HiLanguage className='text-primary-500 h-4 w-4' />
              English (United States){' '}
              <HiOutlineChevronDown className='relative -top-[2px] inline-block text-xs' />
            </div>
            <div className='flex gap-x-4'>
              <div className='flex items-center gap-x-2'>
                <HiPhone className='text-primary-500 h-4 w-4' />
                +49 123 456 789
              </div>
              <div className='flex items-center gap-x-2'>
                <HiMail className='text-primary-500 h-4 w-4' />
                <p>
                  <Link
                    href='mailto:info@duecker-medizintechnik.de'
                    className='hover:underline'
                  >
                    info@duecker-medizintechnik.de
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <header className='sticky top-0 z-50 mb-12 bg-white py-6 md:mb-24'>
        <Container>
          <div className='relative flex items-center'>
            <Link href='/' className='inline-block text-lg font-bold'>
              <Logo className='w-48 text-[#071626]' />
            </Link>
            <div className='ml-auto xl:hidden'>
              <button
                className='navbar-burger flex h-12 w-12 items-center justify-center rounded-md bg-gray-100 transition duration-200 hover:bg-gray-200'
                onClick={() => setHamburgerMenuIsOpen((open) => !open)}
              >
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M3 12H21'
                    stroke='black'
                    strokeWidth='2'
                    strokeLinecap='round'
                  ></path>
                  <path
                    d='M3 6H21'
                    stroke='black'
                    strokeWidth='2'
                    strokeLinecap='round'
                  ></path>
                  <path
                    d='M3 18H21'
                    stroke='black'
                    strokeWidth='2'
                    strokeLinecap='round'
                  ></path>
                </svg>
                <span className='sr-only'>Toggle menu</span>
              </button>
            </div>
            <div
              className={clsx(
                'transition-[visibility] md:visible',
                hamburgerMenuIsOpen ? 'visible' : 'invisible delay-500'
              )}
            >
              <nav
                className={clsx(
                  'top-navigation-height animate-fadeInRight bg-background fixed left-0 h-[calc(100vh_-_var(--navigation-height))] w-full overflow-auto duration-300 ease-in-out md:relative md:top-0 md:block md:h-auto md:w-auto md:translate-x-0 md:overflow-hidden md:bg-transparent md:opacity-100 md:transition-none',
                  hamburgerMenuIsOpen
                    ? 'translate-x-0 opacity-100'
                    : 'translate-x-[-100vw] opacity-0'
                )}
              >
                <ul
                  className={clsx(
                    '[&_li]:border-grey-dark flex h-full flex-col md:flex-row md:items-center [&_li]:ml-4 [&_li]:border-b md:[&_li]:border-none',
                    '[&_a:hover]:text-grey [&_a]:h-navigation-height ease-in [&_a]:flex [&_a]:w-full [&_a]:translate-y-8 [&_a]:items-center [&_a]:text-lg [&_a]:transition-[color,transform] [&_a]:duration-300 md:[&_a]:translate-y-0 md:[&_a]:text-sm [&_a]:md:transition-colors',
                    hamburgerMenuIsOpen && '[&_a]:translate-y-0'
                  )}
                ></ul>
              </nav>
            </div>
            <ul className='absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 transform text-lg font-normal text-gray-600 lg:w-auto lg:space-x-10 xl:flex'>
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
                  <HiOutlineChevronDown className='relative -top-[1px] inline-block transform text-lg duration-200 group-hover:rotate-180 group-hover:transform' />
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
                  className='text-primary-600 border-primary-500 hover:text-primary-50 hover:bg-primary-500 group relative inline-block overflow-hidden rounded-full border-[1px] bg-transparent px-6 py-5 text-lg font-normal transition duration-200 hover:scale-95'
                  href='#'
                >
                  <span className='relative'>Kontakt aufnehmen</span>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </header>
    </>
  );
};
