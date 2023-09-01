import * as React from 'react';

import { Container } from '@/components/layout/Container';
import { Logo } from '@/components/ui/icons/logo';
import UnstyledLink from '@/components/ui/links/UnstyledLink';

export const Footer = () => {
  return (
    <footer className='bg-primary-50/50 py-12 md:py-32 '>
      <Container>
        <div className='-mx-4 mb-24 flex flex-wrap'>
          <div className='mb-12 w-full px-4 xl:mb-0 xl:w-4/12'>
            <UnstyledLink className='inline-block' href='#'>
              <Logo className='mb-3 w-16' />
            </UnstyledLink>
            <ul className='mb-3'>
              <li className='mb-1'>Elfershäuser Str. 18</li>
              <li>34212 Melsungen</li>
            </ul>
            <ul className='mb-3'>
              <li className='mb-1'>Tel: (05661) 52532</li>
              <li>Fax: (05661) 52731</li>
            </ul>
            <ul className='mb-3'>
              <li className='mb-1'>
                Internet:{' '}
                <UnstyledLink
                  href='https://www.duecker-medizintechnik.de'
                  className='inline-block text-black'
                >
                  duecker-medizintechnik.de
                </UnstyledLink>
              </li>
              <li>
                E-Mail:{' '}
                <UnstyledLink
                  href='mailto:info@duecker-medizintechnik.de'
                  className='inline-block text-black'
                >
                  info@duecker-medizintechnik.de
                </UnstyledLink>
              </li>
            </ul>
          </div>
          <div className='mb-8 w-1/2 px-4 md:mb-0 md:w-1/4 xl:w-2/12'>
            <h5 className='mb-4 text-sm font-medium uppercase text-gray-400'>
              Unternehmen
            </h5>
            <ul>
              <li className='mb-3'>
                <a className='inline-block  text-black' href='#'>
                  Kontakt
                </a>
              </li>
              <li className='mb-3'>
                <a className='inline-block  text-black' href='#'>
                  Neuigkeiten
                </a>
              </li>
              <li className='mb-3'>
                <a className='inline-block  text-black' href='#'>
                  Unsere Geschichte
                </a>
              </li>
              <li className='mb-3'>
                <UnstyledLink href='/zertifikate'>Zertifikate</UnstyledLink>
              </li>
              <li>
                <UnstyledLink href='/jobs' className='inline-block  text-black'>
                  <span className='mr-2'>Jobs</span>
                  <span className='bg-primary-500 inline-block rounded-full px-2 py-1 text-xs text-white'>
                    Wir suchen
                  </span>
                </UnstyledLink>
              </li>
            </ul>
          </div>
          <div className='mb-8 w-1/2 px-4 md:mb-0 md:w-1/4 xl:w-2/12'>
            <h5 className='mb-4 text-sm font-medium uppercase text-gray-400'>
              Leistungen
            </h5>
            <ul>
              <li className='mb-3'>
                <UnstyledLink
                  href='/handel'
                  className='inline-block text-black'
                >
                  Handel
                </UnstyledLink>
              </li>
              <li className='mb-3'>
                <UnstyledLink
                  href='/reparatur'
                  className='inline-block  text-black'
                >
                  Reparatur
                </UnstyledLink>
              </li>
              <li className='mb-3'>
                <UnstyledLink
                  href='/produktion'
                  className='inline-block  text-black'
                >
                  Produktion
                </UnstyledLink>
              </li>
            </ul>
          </div>
          <div className='w-1/2 px-4 md:w-1/4 xl:w-2/12'>
            <h5 className='mb-4 text-sm font-medium text-gray-400'>
              Richtlinien
            </h5>
            <ul>
              <li className='mb-3'>
                <UnstyledLink
                  href='/impressum'
                  className='inline-block  text-black'
                >
                  Impressum
                </UnstyledLink>
              </li>
              <li className='mb-3'>
                <UnstyledLink
                  href='/datenschutz'
                  className='inline-block  text-black'
                >
                  Datenschutz
                </UnstyledLink>
              </li>
              <li className='mb-3'>
                <UnstyledLink
                  href='/cookie-policy'
                  className='font-primary inline-block  text-black'
                >
                  Cookie-Richtlinie
                </UnstyledLink>
              </li>
              <li>
                <UnstyledLink
                  href='/cookie-policy'
                  className='inline-block  text-black'
                >
                  Allgemeine Geschäftsbedingungen
                </UnstyledLink>
              </li>
            </ul>
          </div>
          <div className='w-1/2 px-4 md:w-1/4 xl:w-2/12'>
            <h5 className='mb-4 text-sm font-medium text-gray-400'>Company</h5>
            <ul>
              <li className='mb-3'>
                <a className='inline-block text-lg text-black' href='#'>
                  Press
                </a>
              </li>
              <li className='mb-3'>
                <a className='inline-block text-lg text-black' href='#'>
                  Brand Assets
                </a>
              </li>
              <li className='mb-3'>
                <a className='inline-block text-lg text-black' href='#'>
                  Changelog
                </a>
              </li>
              <li>
                <a className='inline-block text-lg text-black' href='#'>
                  Help centre
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className='relative -mx-4 flex flex-wrap items-center'>
          <div className='mb-8 w-full px-4 xl:mb-0 xl:w-4/12'>
            <div className='items-center justify-between md:flex'>
              <div className='mb-6 flex items-center md:mb-0 md:mr-12'>
                <span className='mr-3 inline-block'>
                  <svg
                    width='18'
                    height='18'
                    viewBox='0 0 18 18'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M9 17.4727C4.32819 17.4727 0.527344 13.6718 0.527344 9C0.527344 4.32819 4.32819 0.527346 9 0.527346C13.6718 0.527346 17.4727 4.32819 17.4727 9C17.4727 13.6718 13.6718 17.4727 9 17.4727Z'
                      stroke='black'
                      strokeWidth='0.9375'
                      strokeMiterlimit='10'
                    ></path>
                    <path
                      d='M9 17.4727C11.0578 17.4727 13.3594 13.6718 13.3594 9C13.3594 4.32819 11.0578 0.527347 9 0.527347'
                      stroke='black'
                      strokeWidth='0.9375'
                      strokeMiterlimit='10'
                    ></path>
                    <path
                      d='M9 17.4727C6.94216 17.4727 4.64062 13.6718 4.64062 9C4.64062 4.32819 6.94216 0.527347 9 0.527347'
                      stroke='black'
                      strokeWidth='0.9375'
                      strokeMiterlimit='10'
                    ></path>
                    <path
                      d='M0.527344 9H17.4727'
                      stroke='black'
                      strokeWidth='0.9375'
                      strokeMiterlimit='10'
                    ></path>
                    <path
                      d='M2.76953 3.2634C4.31887 4.25621 6.53814 4.95667 8.99908 4.95667C11.4601 4.95667 13.6794 4.25618 15.2288 3.26333'
                      stroke='black'
                      strokeWidth='0.9375'
                      strokeMiterlimit='10'
                    ></path>
                    <path
                      d='M15.2288 14.7365C13.6794 13.7437 11.4602 13.0432 8.99922 13.0432C6.53821 13.0432 4.3189 13.7437 2.76953 14.7366'
                      stroke='black'
                      strokeWidth='0.9375'
                      strokeMiterlimit='10'
                    ></path>
                    <path
                      d='M9 0.527347V17.4727'
                      stroke='black'
                      strokeWidth='0.9375'
                      strokeMiterlimit='10'
                    ></path>
                  </svg>
                </span>
                <select
                  className='relative rounded-lg border-0 py-2 pl-2 pr-6 text-sm text-black outline-none'
                  name=''
                  id=''
                >
                  <option value='1'>English</option>
                  <option value='2'>Polish</option>
                  <option value='3'>German</option>
                </select>
              </div>
              <div className='-mb-2'>
                <span className='text-sm text-gray-400'>
                  © {new Date().getFullYear()} Dücker Medizintechnik
                </span>
              </div>
            </div>
          </div>
          <div className='mb-8 hidden px-4 md:mb-0 md:block md:w-1/2 xl:w-4/12 xl:text-center'></div>
          <div className='w-full px-4 md:w-1/2 xl:w-4/12'>
            <div className='xs:flex-row xs:items-center -mb-3 flex flex-row md:justify-end'>
              <a
                className='mb-2 mr-12 inline-block text-sm text-gray-400 hover:text-gray-600'
                href='#'
              >
                Terms of Use
              </a>
              <a
                className='mb-2 inline-block text-sm text-gray-400 hover:text-gray-600'
                href='#'
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};
