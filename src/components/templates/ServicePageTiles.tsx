import { useTranslation } from 'next-i18next';
import React from 'react';
import { PiChartLineUpThin, PiPackageThin, PiWrenchThin } from 'react-icons/pi';

import { Container } from '@/components/layout';
import { AnimatedBadge } from '@/components/ui/Badges/AnimatedBadge';
import ArrowLink from '@/components/ui/Links/ArrowLink';
import { Body, Title } from '@/components/ui/Typography';

export default function ServicePageTiles() {
  const { t } = useTranslation('services');

  const ServiceCard = ({
    icon,
    title,
    details,
  }: {
    icon: React.ReactNode;
    title: string;
    details: string;
  }) => {
    const { t } = useTranslation('services');
    return (
      <>
        <div className='flex w-full px-4 md:w-1/2 lg:w-1/3'>
          <div className='mb-8 flex grow flex-col bg-gray-100 p-10 md:px-7 lg:mb-0 xl:px-10'>
            <div className='mb-8 flex h-12 w-12 items-center justify-center bg-dark p-3 lg:h-16 lg:w-16'>
              {icon}
            </div>
            <Title margin={false} size='five'>
              {title}
            </Title>
            <Body>{details}</Body>
            <ArrowLink href={`/leistungen/${title.toLowerCase()}`}>
              {t('content.cards.readMore')}
            </ArrowLink>
          </div>
        </div>
      </>
    );
  };

  return (
    <section className='bg-white pb-16 md:pb-24'>
      <Container>
        <div className='-mx-4 flex flex-wrap'>
          <div className='w-full px-4'>
            <div className='mx-auto mb-12 max-w-[510px] text-center lg:mb-20'>
              <AnimatedBadge text={t('content.badge')} />
              <Title margin={false} className='mb-4'>
                {t('content.title')}
              </Title>
              <Body className='text-light-gray'>{t('content.text')}</Body>
            </div>
          </div>
        </div>
        <div className='mx-auto flex max-w-7xl flex-wrap'>
          <ServiceCard
            title={t('content.cards.production.title')}
            details={t('content.cards.production.text')}
            icon={<PiChartLineUpThin className='h-10 w-10 text-white' />}
          />
          <ServiceCard
            title={t('content.cards.repair.title')}
            details={t('content.cards.repair.text')}
            icon={<PiWrenchThin className='h-10 w-10 text-white' />}
          />
          <ServiceCard
            title={t('content.cards.distribution.title')}
            details={t('content.cards.distribution.text')}
            icon={<PiPackageThin className='h-10 w-10 text-white' />}
          />
        </div>
      </Container>
    </section>
  );
}
