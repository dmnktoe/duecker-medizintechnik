'use client';

import { useFlags } from 'flagsmith/react';
import { useTranslations } from 'next-intl';
import * as React from 'react';
import { PiTranslate } from 'react-icons/pi';
import { VscArrowRight } from 'react-icons/vsc';

import clsxm from '@/lib/clsxm';
import { getVersion } from '@/lib/get-version';

import { Container } from '@/components/layout/Container';
import { useFooterPosts } from '@/components/providers/FooterPostsContext';
import LanguagePicker from '@/components/templates/LanguagePicker';
import { Body, ButtonLink, Title, UnderlineLink } from '@/components/ui';

import { company } from '@/constant/company';

import { News } from '@/types/News';

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
  const t = useTranslations('common');
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
  const t = useTranslations('common');
  return (
    <>
      {t.raw('footer.links').map((navigation: FooterNavigation) => (
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
                  <Body size='sm' margin={false}>
                    {item.title}
                  </Body>
                </UnderlineLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

const FooterPosts = () => {
  const footerPosts = useFooterPosts();
  const t = useTranslations('common');
  const tNews = useTranslations('news');

  if (footerPosts.kind === 'inactive' || footerPosts.kind === 'error') {
    return (
      <div>
        <FooterNavigationHeadline title={t('footer.posts.title')} />
        <Body className='md:mt-8' size='sm'>
          {t('footer.posts.noResults')}
        </Body>
      </div>
    );
  }

  if (footerPosts.posts.length === 0) {
    return (
      <div>
        <FooterNavigationHeadline title={t('footer.posts.title')} />
        <Body className='md:mt-8' size='sm' color='light'>
          {tNews('content.newsList.noResults')}
        </Body>
      </div>
    );
  }

  return (
    <div>
      <FooterNavigationHeadline title={t('footer.posts.title')} />
      <ul className='space-y-2 md:mt-8 md:space-y-3'>
        {footerPosts.posts.map((post: News) => (
          <li key={post.id}>
            <UnderlineLink
              underline='hover'
              className='line-clamp-2'
              href={`/newsroom/${post.slug}`}
            >
              <Body size='sm' margin={false}>
                {post.title}
              </Body>
            </UnderlineLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

const FooterCopyright = () => {
  const flags = useFlags(['language_picker', 'display_version_number']);
  return (
    <>
      <div>
        <Body margin={false}>
          © {new Date().getFullYear()} {company.companyName} • {company.street},{' '}
          {company.city}
        </Body>
        {flags.display_version_number.enabled && (
          <Body margin={false} size='xs' color='light'>
            Version: v{getVersion()}
          </Body>
        )}
      </div>
      <div
        className={clsxm(
          'order-first items-center justify-center bg-gray-100 p-2 align-middle lg:order-last lg:p-3',
          'focus:outline-0 focus:outline-offset-4 focus:outline-gray-300 focus:outline-dashed',
          flags.language_picker.enabled ? 'flex' : 'hidden',
        )}
      >
        <span className='mr-2 inline-block'>
          <PiTranslate size={18} />
        </span>
        <LanguagePicker
          showDisplayName
          className='relative m-0 cursor-pointer border-0 bg-none p-0 hover:underline focus:border-none focus:ring-0 focus:ring-transparent focus:ring-offset-0 focus:ring-offset-transparent focus:outline-none focus:ring-inset'
        />
      </div>
    </>
  );
};

export const Footer = () => {
  return (
    <footer className='text-dark bg-white py-16 md:py-24'>
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
        <div className='mt-16 border-t border-gray-100 pt-12'>
          <div className='flex flex-col items-start justify-between gap-4 text-left lg:flex-row lg:items-center lg:gap-8'>
            <FooterCopyright />
          </div>
        </div>
      </Container>
    </footer>
  );
};
