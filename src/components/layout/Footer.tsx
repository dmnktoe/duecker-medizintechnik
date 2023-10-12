import * as React from 'react';
import { useEffect, useState } from 'react';
import { VscGlobe } from 'react-icons/vsc';

import { fetchAPI } from '@/lib/fetch-api';

import { Container } from '@/components/layout/Container';
import LanguagePicker from '@/components/templates/LanguagePicker';
import { Logo } from '@/components/ui/icons/logo';
import UnstyledLink from '@/components/ui/links/UnstyledLink';

import { company } from '@/constant/company';
import { Data } from '@/interfaces/Data';

const FooterPosts = () => {
  const [posts, setPosts] = useState<Data[]>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchAPI(
        '/posts?sort=id:desc&populate=*&pagination[pageSize]=3',
      );
      setPosts(result.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading)
    return (
      <>
        <div className='h-24 w-60 rounded-md'>
          <div className='flex h-full animate-pulse flex-row space-x-5'>
            <div className='flex flex-col space-y-2'>
              <div className='h-3 w-36 rounded-md bg-gray-300'></div>
              <div className='h-3 w-24 rounded-md bg-gray-300'></div>
            </div>
          </div>
        </div>
      </>
    );

  if (!posts) return <p>Keine Einträge gefunden.</p>;

  return (
    <>
      {posts.map((post: Data) => (
        <li key={post.id} className='line-clamp-2'>
          <UnstyledLink
            className='text-gray-700 transition hover:text-gray-700/75'
            href={`/news/${post.attributes.slug}`}
          >
            {post.attributes.title}
          </UnstyledLink>
        </li>
      ))}
    </>
  );
};

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
                  href={`tel:${company.phone}`}
                  className='text-gray-700 transition hover:text-gray-700/75'
                >
                  {company.phone}
                </UnstyledLink>{' '}
                erreichen oder uns eine Nachricht per E-Mail an{' '}
                <UnstyledLink
                  className='text-gray-700 transition hover:text-gray-700/75'
                  href={'mailto:' + company.email}
                >
                  {company.email}
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
                      href='/impressum'
                    >
                      Impressum
                    </UnstyledLink>
                  </li>
                  <li>
                    <UnstyledLink
                      className='text-gray-700 transition hover:text-gray-700/75'
                      href='/datenschutz'
                    >
                      Datenschutz
                    </UnstyledLink>
                  </li>
                  <li>
                    <UnstyledLink
                      className='text-gray-700 transition hover:text-gray-700/75'
                      href='/cookie-richtlinie'
                    >
                      Cookie-Richtlinie
                    </UnstyledLink>
                  </li>
                  <li>
                    <UnstyledLink
                      className='text-gray-700 transition hover:text-gray-700/75'
                      href='/agb'
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
                  <FooterPosts />
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
                  © {new Date().getFullYear()} {company.companyName} •{' '}
                  {company.street}, {company.city}
                </span>
              </p>
            </div>
          </div>
        </Container>
      </footer>
    </>
  );
};
