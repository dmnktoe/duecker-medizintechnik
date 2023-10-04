import * as React from 'react';
import { VscGlobe } from 'react-icons/vsc';

import { Container } from '@/components/layout/Container';
import LanguagePicker from '@/components/templates/LanguagePicker';
import { Logo } from '@/components/ui/icons/logo';
import UnstyledLink from '@/components/ui/links/UnstyledLink';

import { data } from '@/constant/data';

export const Footer = () => {
  return (
    <>
      <footer className='bg-white pb-12 pt-16 text-dark md:pt-24 lg:pt-32'>
        <Container>
          <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
            <div>
              <div className='flex justify-center text-primary-500 sm:justify-start'>
                <Logo className='w-32' />
              </div>
              <p className='mt-6 max-w-md text-center text-sm leading-relaxed text-gray-700 sm:max-w-xs sm:text-left'>
                Sie können uns gerne telefonisch unter der{' '}
                <UnstyledLink
                  href={`tel:${data.phone}`}
                  className='text-gray-700 transition hover:text-gray-700/75'
                >
                  {data.phone}
                </UnstyledLink>{' '}
                erreichen oder uns eine Nachricht per E-Mail an{' '}
                <UnstyledLink
                  className='text-gray-700 transition hover:text-gray-700/75'
                  href={'mailto:' + data.email}
                >
                  {data.email}
                </UnstyledLink>{' '}
                schicken. Wir bearbeiten Ihre Anfrage schnellstmöglich.
              </p>
            </div>
            <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:col-span-2'>
              <div className='text-center sm:text-left'>
                <p className='text-lg font-medium text-gray-900'>Unternehmen</p>
                <ul className='mt-8 space-y-4 text-sm'>
                  <li>
                    <UnstyledLink
                      className='text-gray-700 transition hover:text-gray-700/75'
                      href='/unternehmen'
                    >
                      Unsere Geschichte
                    </UnstyledLink>
                  </li>
                  <li>
                    <UnstyledLink
                      className='text-gray-700 transition hover:text-gray-700/75'
                      href='/downloads'
                    >
                      Downloads & Zertifikate
                    </UnstyledLink>
                  </li>
                  <li>
                    <UnstyledLink
                      className='text-gray-700 transition hover:text-gray-700/75'
                      href='/kontakt'
                    >
                      Kontakt & Anfrage
                    </UnstyledLink>
                  </li>
                  <li>
                    <UnstyledLink
                      className='text-gray-700 transition hover:text-gray-700/75'
                      href='/jobs'
                    >
                      Jobs
                    </UnstyledLink>
                  </li>
                </ul>
              </div>
              <div className='text-center sm:text-left'>
                <p className='text-lg font-medium text-gray-900'>Leistungen</p>
                <ul className='mt-8 space-y-4 text-sm'>
                  <li>
                    <UnstyledLink
                      className='text-gray-700 transition hover:text-gray-700/75'
                      href='/leistungen/produktion'
                    >
                      Produktion
                    </UnstyledLink>
                  </li>
                  <li>
                    <UnstyledLink
                      className='text-gray-700 transition hover:text-gray-700/75'
                      href='/leistungen/reparatur'
                    >
                      Reparatur & Wartung
                    </UnstyledLink>
                  </li>
                  <li>
                    <UnstyledLink
                      className='text-gray-700 transition hover:text-gray-700/75'
                      href='/leistungen/handel'
                    >
                      Handelsvermittlung
                    </UnstyledLink>
                  </li>
                </ul>
              </div>
              <div className='text-center sm:text-left'>
                <p className='text-lg font-medium text-gray-900'>Richtlinien</p>
                <ul className='mt-8 space-y-4 text-sm'>
                  <li>
                    <UnstyledLink
                      className='text-gray-700 transition hover:text-gray-700/75'
                      href='/leistungen/produktion'
                    >
                      Impressum
                    </UnstyledLink>
                  </li>
                  <li>
                    <UnstyledLink
                      className='text-gray-700 transition hover:text-gray-700/75'
                      href='/leistungen/reparatur'
                    >
                      Datenschutz
                    </UnstyledLink>
                  </li>
                  <li>
                    <UnstyledLink
                      className='text-gray-700 transition hover:text-gray-700/75'
                      href='/leistungen/handel'
                    >
                      Cookie-Richtlinie
                    </UnstyledLink>
                  </li>
                  <li>
                    <UnstyledLink
                      className='text-gray-700 transition hover:text-gray-700/75'
                      href='/leistungen/handel'
                    >
                      Allgemeine Geschäftsbedingungen
                    </UnstyledLink>
                  </li>
                </ul>
              </div>
              <div className='text-center sm:text-left'>
                <p className='text-lg font-medium text-gray-900'>
                  Aus dem Blog
                </p>
                <ul className='mt-8 space-y-4 text-sm'>
                  <li className='line-clamp-1'>
                    <UnstyledLink
                      className='text-gray-700 transition hover:text-gray-700/75'
                      href='/leistungen/produktion'
                    >
                      Die Erfolgsgeschichte von Dücker Medizintechnik: Qualität
                      & Service seit 1979
                    </UnstyledLink>
                  </li>
                  <li className='line-clamp-1'>
                    <UnstyledLink
                      className='text-gray-700 transition hover:text-gray-700/75'
                      href='/leistungen/reparatur'
                    >
                      Dücker Medizintechnik feiert 25-jähriges Firmenjubiläum
                    </UnstyledLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className='mt-12 border-t border-gray-100 pt-12'>
            <div className='text-center sm:flex sm:justify-between sm:text-left'>
              <div className='flex items-center text-sm text-gray-500'>
                <span className='mr-3 inline-block'>
                  <VscGlobe size={18} />
                </span>
                <LanguagePicker className='relative rounded-lg border-0 py-2 pl-2 pr-8 text-sm' />
              </div>
              <p className='mt-4 text-sm text-gray-500 sm:order-first sm:mt-0'>
                <span className='text-sm text-gray-400'>
                  © {new Date().getFullYear()} {data.companyName} •{' '}
                  {data.street}, {data.city}
                </span>
              </p>
            </div>
          </div>
        </Container>
      </footer>
    </>
  );
};
