'use client';

import { useTranslations } from 'next-intl';
import * as React from 'react';
import { PiChartLineUpThin, PiPackageThin, PiWrenchThin } from 'react-icons/pi';

import { Container } from '@/components/layout/Container';
import { Body, Title } from '@/components/ui';
import { AnimatedBadge } from '@/components/ui/Badges/AnimatedBadge';
import { ArrowLink } from '@/components/ui/Links/ArrowLink';

type ServiceCardProps = {
  icon: React.ReactNode;
  index: number;
  title: string;
  href: string;
  details: string;
  readMore: string;
};

const ServiceCard = ({
  icon,
  index,
  title,
  href,
  details,
  readMore,
}: ServiceCardProps) => (
  <div className='group hover:border-primary-300 flex flex-col border border-gray-200 bg-white transition-all duration-300 hover:shadow-md'>
    <div className='bg-dark group-hover:bg-primary-600 flex items-center justify-between p-8 transition-colors duration-300'>
      <div className='text-white opacity-90 transition-opacity duration-300 group-hover:opacity-100'>
        {icon}
      </div>
      <span className='font-secondary text-2xl font-light text-white/20 transition-colors duration-300 group-hover:text-white/40'>
        {String(index + 1).padStart(2, '0')}
      </span>
    </div>
    <div className='flex flex-1 flex-col p-6'>
      <Title margin={false} size='three' renderAs='h2' className='mb-3'>
        {title}
      </Title>
      <Body margin={false} color='light' size='sm' className='flex-1'>
        {details}
      </Body>
      <div className='mt-6'>
        <ArrowLink href={`/leistungen/${href}`} underline='hover'>
          {readMore}
        </ArrowLink>
      </div>
    </div>
  </div>
);

const SERVICES = [
  {
    key: 'production' as const,
    icon: <PiChartLineUpThin className='h-12 w-12' />,
  },
  {
    key: 'repair' as const,
    icon: <PiWrenchThin className='h-12 w-12' />,
  },
  {
    key: 'distribution' as const,
    icon: <PiPackageThin className='h-12 w-12' />,
  },
];

export default function ServicesView() {
  const t = useTranslations('services');

  return (
    <section className='mx-auto max-w-5xl pb-16 md:pb-24'>
      <Container>
        <div className='mb-12 text-center'>
          <AnimatedBadge text={t('content.badge')} />
          <Title renderAs='h1' className='mt-4 mb-4' margin={false}>
            {t('content.title')}
          </Title>
          <Body color='light' className='mx-auto max-w-2xl'>
            {t('content.text')}
          </Body>
        </div>

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
          {SERVICES.map(({ key, icon }, index) => (
            <ServiceCard
              key={key}
              index={index}
              icon={icon}
              title={t(`content.cards.${key}.title`)}
              details={t(`content.cards.${key}.text`)}
              href={t(`content.cards.${key}.href`)}
              readMore={t('content.cards.readMore')}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
