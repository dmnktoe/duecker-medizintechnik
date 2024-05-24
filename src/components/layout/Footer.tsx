import { useTranslation } from 'next-i18next';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { VscArrowRight, VscGlobe } from 'react-icons/vsc';

import { fetchAPI } from '@/lib/fetch-api';

import { Container } from '@/components/layout/Container';
import LanguagePicker from '@/components/templates/LanguagePicker';
import { PrivacyChoiceIcon } from '@/components/ui/Icons/privacy';
import ButtonLink from '@/components/ui/Links/ButtonLink';
import UnderlineLink from '@/components/ui/Links/UnderlineLink';
import { Body, Title } from '@/components/ui/Typography';

import { company } from '@/constant/company';
import { News } from '@/interfaces/News';

type FooterNavigation = {
  title: string;
  items: {
    title: string;
    href: string;
  }[];
};

const FooterNavigationHeadline = ({ title }: { title: string }) => (
  <Body isStrong className='mb-2 md:mb-4'>
    {title}
  </Body>
);

const FooterContact = () => {
  const { t } = useTranslation('common', { useSuspense: false });
  return (
    <>
      <Title size='one'>{t('footer.contact.intro')}</Title>
      <Body className='text-left'>{t('footer.contact.text')}</Body>
      <div className='mt-8 bg-gray-100 p-3'>
        <Title size='five'>{t('footer.contact.location')}</Title>
        <Body>
          {company.street} <br />
          {company.city}
        </Body>
        <Body>
          {t('footer.contact.phone')}:{' '}
          <UnderlineLink href={`tel:${company.phone}`} underline='hover'>
            {company.phone}
          </UnderlineLink>
          <br />
          {t('footer.contact.email')}:{' '}
          <UnderlineLink href={'mailto:' + company.email} underline='hover'>
            {company.email}
          </UnderlineLink>
        </Body>
      </div>
      <ButtonLink href='/kontakt' variant='primary' size='sm' className='mt-8'>
        {t('footer.contact.button')} <VscArrowRight className='ml-2' />
      </ButtonLink>
    </>
  );
};

const FooterLinks = () => {
  const { t, ready } = useTranslation('common', { useSuspense: false });
  return (
    <>
      {ready &&
        t('footer.links', { returnObjects: true }).map(
          (navigation: FooterNavigation) => (
            <div key={navigation.title}>
              <FooterNavigationHeadline title={navigation.title} />
              <ul className='space-y-2 md:mt-8 md:space-y-3'>
                {navigation.items.map((item) => (
                  <li key={item.title}>
                    <UnderlineLink
                      underline='hover'
                      className='line-clamp-2'
                      href={item.href}
                    >
                      <Body margin={false}>
                        {item.title}{' '}
                        {item.href === '/cookie-richtlinie' && (
                          <PrivacyChoiceIcon className='relative -top-0.5 ml-1 inline-block w-5' />
                        )}
                      </Body>
                    </UnderlineLink>
                  </li>
                ))}
              </ul>
            </div>
          ),
        )}
    </>
  );
};

const FooterPosts = () => {
  const [posts, setPosts] = useState<News[]>();
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation('common');

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchAPI(
        '/posts?sort=id:desc&populate=*&pagination[pageSize]=4',
      );
      setPosts(result.data);
    };
    fetchData().then(() => setIsLoading(false));
  }, []);

  if (isLoading)
    return (
      <div className='h-24 w-full rounded-md'>
        <div className='flex h-full animate-pulse flex-row space-x-5'>
          <div className='flex flex-col space-y-2'>
            <div className='h-3 w-36 rounded-md bg-gray-300'></div>
            <div className='h-3 w-24 rounded-md bg-gray-300'></div>
          </div>
        </div>
      </div>
    );

  if (!posts) return <p>{t('footer.posts.noResults')}</p>;

  return (
    <>
      <div>
        <FooterNavigationHeadline title={t('footer.posts.title')} />
        <ul className='space-y-2 md:mt-8 md:space-y-3'>
          {posts.map((post: News) => (
            <li key={post.id}>
              <UnderlineLink
                underline='hover'
                className='line-clamp-2'
                href={`/newsroom/${post.attributes.slug}`}
              >
                <Body margin={false}>{post.attributes.title}</Body>
              </UnderlineLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const FooterCopyright = () => {
  return (
    <>
      <Body margin={false}>
        © {new Date().getFullYear()} {company.companyName} • {company.street},{' '}
        {company.city}
      </Body>
      <div className='flex items-center justify-center bg-gray-100 align-middle focus:outline-dashed focus:outline-1 focus:outline-offset-4 focus:outline-gray-300'>
        <span className='mx-3 inline-block'>
          <VscGlobe size={18} />
        </span>
        <LanguagePicker className='relative border-0 py-2 pl-2 pr-8' />
      </div>
    </>
  );
};

export const Footer = () => {
  return (
    <footer className='bg-white py-16 text-dark md:py-24 lg:py-32'>
      <Container>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-12'>
          <div className='lg:col-span-5 lg:max-w-lg'>
            <FooterContact />
          </div>
          <div className='grid grid-cols-2 gap-8 md:grid-cols-4 lg:col-span-7'>
            <FooterLinks />
            <FooterPosts />
          </div>
        </div>
        <div className='mt-16 border-t border-gray-100 pt-16'>
          <div className='flex flex-row items-center justify-between gap-6 text-left'>
            <FooterCopyright />
          </div>
        </div>
      </Container>
    </footer>
  );
};
