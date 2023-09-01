import * as React from 'react';

import { Container } from '@/components/layout/Container';
import { Logo } from '@/components/ui/icons/logo';
import UnstyledLink from '@/components/ui/links/UnstyledLink';

export const Footer = () => {
  return (
    <footer className='bg-primary-50/50 py-16 md:py-24 lg:py-32'>
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
          <div className='mb-8 hidden px-4 md:mb-0 md:block md:w-1/2 xl:w-4/12 xl:text-center'>
            <span className='text-sm text-gray-400'>
              © {new Date().getFullYear()} Dücker Medizintechnik
            </span>
          </div>
          <div className='w-full px-4 md:w-1/2 xl:w-4/12'>
            <div className='xs:flex-row xs:items-center -mb-3 flex flex-row md:justify-end'>
              <a
                className='mb-3 mr-8 inline-flex items-center text-black'
                href='#'
              >
                <svg
                  width='17'
                  height='13'
                  viewBox='0 0 17 13'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M16.0809 1.78777C15.5109 2.03477 14.9219 2.20577 14.2949 2.28177C14.9409 1.90177 15.4349 1.29377 15.6629 0.552768C15.0549 0.913768 14.3899 1.16077 13.6869 1.31277C13.1169 0.704768 12.2999 0.324768 11.4069 0.324768C9.67786 0.324768 8.29086 1.73077 8.29086 3.44077C8.29086 3.68777 8.30986 3.91577 8.36686 4.14377C5.78286 4.02977 3.50286 2.77577 1.96386 0.894768C0.861859 2.87077 2.09686 4.50477 2.91386 5.05577C2.41986 5.05577 1.92586 4.90377 1.50786 4.67577C1.50786 6.21477 2.59086 7.48777 3.99686 7.77277C3.69286 7.86777 3.00886 7.92477 2.59086 7.82977C2.98986 9.06477 4.14886 9.97677 5.49786 9.99577C4.43386 10.8318 2.87586 11.4968 0.880859 11.2878C2.26786 12.1808 3.90186 12.6938 5.66886 12.6938C11.4069 12.6938 14.5229 7.94377 14.5229 3.83977C14.5229 3.70677 14.5229 3.57377 14.5039 3.44077C15.1499 2.96577 15.6819 2.41477 16.0809 1.78777Z'
                    fill='currentColor'
                  ></path>
                </svg>
                <span className='ml-3 text-sm'>Twitter</span>
              </a>
              <a
                className='mb-3 mr-8 inline-flex items-center text-black'
                href='#'
              >
                <svg
                  width='19'
                  height='19'
                  viewBox='0 0 19 19'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M10.0018 4.8916C7.73315 4.8916 5.89648 6.73027 5.89648 8.99694C5.89648 11.2656 7.73515 13.1023 10.0018 13.1023C12.2705 13.1023 14.1072 11.2636 14.1072 8.99694C14.1072 6.72827 12.2685 4.8916 10.0018 4.8916ZM10.0018 11.6616C8.52915 11.6616 7.33715 10.4689 7.33715 8.99694C7.33715 7.52494 8.52982 6.33227 10.0018 6.33227C11.4738 6.33227 12.6665 7.52494 12.6665 8.99694C12.6672 10.4689 11.4745 11.6616 10.0018 11.6616Z'
                    fill='currentColor'
                  ></path>
                  <path
                    d='M13.2988 1.05026C11.8268 0.981591 8.18082 0.984924 6.70749 1.05026C5.41282 1.11092 4.27082 1.42359 3.35015 2.34426C1.81148 3.88292 2.00815 5.95626 2.00815 8.99692C2.00815 12.1089 1.83482 14.1343 3.35015 15.6496C4.89482 17.1936 6.99815 16.9916 10.0028 16.9916C13.0855 16.9916 14.1495 16.9936 15.2395 16.5716C16.7215 15.9963 17.8402 14.6716 17.9495 12.2923C18.0188 10.8196 18.0148 7.17426 17.9495 5.70092C17.8175 2.89226 16.3102 1.18892 13.2988 1.05026ZM15.6288 14.6316C14.6202 15.6403 13.2208 15.5503 9.98349 15.5503C6.65015 15.5503 5.31348 15.5996 4.33815 14.6216C3.21482 13.5036 3.41815 11.7083 3.41815 8.98626C3.41815 5.30292 3.04015 2.65026 6.73682 2.46092C7.58615 2.43092 7.83615 2.42092 9.97415 2.42092L10.0042 2.44092C13.5568 2.44092 16.3442 2.06892 16.5115 5.76492C16.5495 6.60826 16.5582 6.86159 16.5582 8.99626C16.5575 12.2909 16.6202 13.6356 15.6288 14.6316Z'
                    fill='currentColor'
                  ></path>
                  <path
                    d='M14.2718 5.68869C14.8017 5.68869 15.2312 5.25918 15.2312 4.72935C15.2312 4.19953 14.8017 3.77002 14.2718 3.77002C13.742 3.77002 13.3125 4.19953 13.3125 4.72935C13.3125 5.25918 13.742 5.68869 14.2718 5.68869Z'
                    fill='currentColor'
                  ></path>
                </svg>
                <span className='ml-3 text-sm'>Instagram</span>
              </a>
              <a className='mb-3 inline-flex items-center text-black' href='#'>
                <svg
                  width='14'
                  height='14'
                  viewBox='0 0 14 14'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M13.1004 13.0993V8.30161C13.1004 5.94368 12.5928 4.14249 9.84186 4.14249C8.51552 4.14249 7.6313 4.86297 7.27106 5.55069H7.23831V4.35536H4.63477V13.0993H7.35294V8.7601C7.35294 7.61388 7.5658 6.51679 8.97401 6.51679C10.3658 6.51679 10.3822 7.81038 10.3822 8.8256V13.083H13.1004V13.0993Z'
                    fill='currentColor'
                  ></path>
                  <path
                    d='M0.212891 4.35538H2.93106V13.0994H0.212891V4.35538Z'
                    fill='currentColor'
                  ></path>
                  <path
                    d='M1.57195 -9.15527e-05C0.704104 -9.15527e-05 0 0.704012 0 1.57186C0 2.43971 0.704104 3.16019 1.57195 3.16019C2.4398 3.16019 3.14391 2.43971 3.14391 1.57186C3.14391 0.704012 2.4398 -9.15527e-05 1.57195 -9.15527e-05Z'
                    fill='currentColor'
                  ></path>
                </svg>
                <span className='ml-3 text-sm'>Linkedin</span>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};
