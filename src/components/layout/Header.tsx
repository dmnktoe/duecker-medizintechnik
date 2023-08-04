import clsx from 'clsx';
import * as React from 'react';
import { useEffect, useState } from 'react';

import { HamburgerIcon } from '@/components/icons/hamburger';
import { Logo } from '@/components/icons/logo';
import { Container } from '@/components/layout/Container';
import ButtonLink from '@/components/links/ButtonLink';
import UnstyledLink from '@/components/links/UnstyledLink';

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
    <header className='border-b-1 fixed left-0 top-0 z-30 w-full border-b border-gray-100 bg-white/90 backdrop-blur-[12px]'>
      <Container className='h-navigation-height flex'>
        <UnstyledLink className='text-md flex items-center' href='/'>
          <Logo className='text-primary-500 mr-4 w-36' />
        </UnstyledLink>

        <div
          className={clsx(
            'transition-[visibility] md:visible',
            hamburgerMenuIsOpen ? 'visible' : 'invisible delay-500'
          )}
        >
          <nav
            className={clsx(
              'top-navigation-height bg-background fixed left-0 h-[calc(100vh_-_var(--navigation-height))] w-full overflow-auto transition-opacity duration-500 md:relative md:top-0 md:block md:h-auto md:w-auto md:translate-x-0 md:overflow-hidden md:bg-transparent md:opacity-100 md:transition-none',
              hamburgerMenuIsOpen
                ? 'translate-x-0 opacity-100'
                : 'translate-x-[-100vw] opacity-0'
            )}
          >
            <ul
              className={clsx(
                '[&_li]:border-grey-dark flex h-full flex-col md:flex-row md:items-center [&_li]:ml-4 [&_li]:border-b md:[&_li]:border-none',
                '[&_a:hover]:text-grey [&_a]:h-navigation-height ease-in [&_a]:flex [&_a]:w-full [&_a]:translate-y-8 [&_a]:items-center [&_a]:text-lg [&_a]:transition-[color,transform] [&_a]:duration-300 md:[&_a]:translate-y-0 md:[&_a]:text-base [&_a]:md:transition-colors',
                hamburgerMenuIsOpen && '[&_a]:translate-y-0'
              )}
            >
              <li>
                <UnstyledLink href='/'>Startseite</UnstyledLink>
              </li>
              <li>
                <UnstyledLink className='pointer-events-none' href='#'>
                  Leistungen
                </UnstyledLink>
              </li>
              <li className='md:hidden lg:block'>
                <UnstyledLink href='/zertifikate'>Zertifikate</UnstyledLink>
              </li>
              <li className='md:hidden lg:block'>
                <UnstyledLink href='/components'>Components</UnstyledLink>
              </li>
              <li>
                <UnstyledLink href='/neuigkeiten'>Neuigkeiten</UnstyledLink>
              </li>
            </ul>
          </nav>
        </div>

        <div className='ml-auto flex h-full items-center'>
          <UnstyledLink className='mr-6 text-base' href='/downloads'>
            Downloads
          </UnstyledLink>
          <ButtonLink size='base' href='/kontakt'>
            Kontakt aufnehmen
          </ButtonLink>
        </div>

        <button
          className='ml-6 md:hidden'
          onClick={() => setHamburgerMenuIsOpen((open) => !open)}
        >
          <span className='sr-only'>Toggle menu</span>
          <HamburgerIcon />
        </button>
      </Container>
    </header>
  );
};
