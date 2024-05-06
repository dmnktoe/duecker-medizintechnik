import { useTranslation } from 'next-i18next';
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
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation('common');

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchAPI(
        '/posts?sort=id:desc&populate=*&pagination[pageSize]=3',
      );
      setPosts(result.data);
    };
    fetchData().then(() => setIsLoading(false));
  }, []);

  if (isLoading)
    return (
      <div className='h-24 w-60 rounded-md'>
        <div className='flex h-full animate-pulse flex-row space-x-5'>
          <div className='flex flex-col space-y-2'>
            <div className='h-3 w-36 rounded-md bg-gray-300'></div>
            <div className='h-3 w-24 rounded-md bg-gray-300'></div>
          </div>
        </div>
      </div>
    );

  if (!posts) return <p>{t('footer.newsSection.noResults')}</p>;

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

type FooterNavigation = {
  title: string;
  items: {
    title: string;
    href: string;
  }[];
};

const FooterNavigationHeadline = ({ title }: { title: string }) => (
  <p className='mb-2 text-xs font-medium text-gray-900 md:mb-4 md:text-base'>
    {title}
  </p>
);

export const Footer = () => {
  const { t, ready } = useTranslation('common', { useSuspense: false });
  return (
    <footer className='bg-white pb-12 pt-16 text-dark md:pt-24 lg:pt-32'>
      <Container>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
          <div>
            <div className='flex justify-start text-primary-500'>
              <Logo className='w-32' />
            </div>
            <p className='mt-6 max-w-md text-left text-xs text-gray-700 sm:max-w-xs md:text-sm md:leading-6'>
              {t('footer.contactSection.text')}
              <br />
              <br />
              {t('footer.contactSection.phone')}:{' '}
              <UnstyledLink
                href={`tel:${company.phone}`}
                className='text-gray-700 transition hover:text-gray-700/75'
              >
                {company.phone}
              </UnstyledLink>
              <br />
              {t('footer.contactSection.email')}:{' '}
              <UnstyledLink
                className='text-gray-700 transition hover:text-gray-700/75'
                href={'mailto:' + company.email}
              >
                {company.email}
              </UnstyledLink>
            </p>
          </div>
          <div className='grid grid-cols-2 gap-8 md:grid-cols-4 lg:col-span-2'>
            {ready &&
              t('footer.navigation', { returnObjects: true }).map(
                (navigation: FooterNavigation) => (
                  <div key={navigation.title} className='text-left'>
                    <FooterNavigationHeadline title={navigation.title} />
                    <ul className='space-y-2 text-xs md:mt-8 md:space-y-3 md:text-sm'>
                      {navigation.items.map((item) => (
                        <li key={item.title} className='line-clamp-2'>
                          <UnstyledLink
                            className='text-gray-700 transition hover:text-gray-700/75'
                            href={item.href}
                          >
                            {item.title}
                          </UnstyledLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                ),
              )}
            <div className='text-left'>
              <FooterNavigationHeadline title={t('footer.newsSection.title')} />
              <ul className='space-y-2 text-xs md:mt-8 md:space-y-3 md:text-sm'>
                <FooterPosts />
              </ul>
            </div>
          </div>
        </div>
        <div className='mt-12 border-t border-gray-100 pt-12'>
          <div className='text-center text-gray-400 sm:flex sm:items-center sm:justify-between sm:text-left'>
            <div className='flex items-center text-xs md:text-sm'>
              <span className='mr-3 inline-block'>
                <VscGlobe size={18} />
              </span>
              <LanguagePicker className='relative rounded-lg border-0 py-2 pl-2 pr-8 text-xs md:text-sm' />
            </div>
            <p className='mt-4 text-xs sm:order-first sm:mt-0 md:text-sm'>
              <span>
                © {new Date().getFullYear()} {company.companyName} •{' '}
                {company.street}, {company.city}
              </span>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};
