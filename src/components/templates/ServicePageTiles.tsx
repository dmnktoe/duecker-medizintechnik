'use client';

import { useFlags } from 'flagsmith/react';
import { useTranslations } from 'next-intl';
import React from 'react';
import { PiChartLineUpThin, PiPackageThin, PiWrenchThin } from 'react-icons/pi';
import { VscArrowRight } from 'react-icons/vsc';

import { Container } from '@/components/layout';
import {
  AnimatedBadge,
  ArrowLink,
  Body,
  ButtonLink,
  Title,
} from '@/components/ui';

export default function ServicePageTiles() {
  const t = useTranslations('services');

  const Headline = () => {
    return (
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
    );
  };

  const Tiles = () => {
    const ServiceCard = ({
      icon,
      title,
      href,
      details,
    }: {
      icon: React.ReactNode;
      title: string;
      href: string;
      details: string;
    }) => {
      const t = useTranslations('services');
      return (
        <>
          <div className='col-span-6 flex lg:col-span-2'>
            <div className='flex grow flex-col bg-gray-100 p-6 md:px-7 lg:mb-0 lg:p-10 xl:px-10'>
              <div className='mb-8 flex h-12 w-12 items-center justify-center bg-dark p-3 lg:h-16 lg:w-16'>
                {icon}
              </div>
              <Title margin={false} size='five'>
                {title}
              </Title>
              <Body>{details}</Body>
              <ArrowLink href={`/leistungen/${href}`}>
                {t('content.cards.readMore')}
              </ArrowLink>
            </div>
          </div>
        </>
      );
    };

    return (
      <div className='grid grid-cols-6 gap-2'>
        <ServiceCard
          title={t('content.cards.production.title')}
          details={t('content.cards.production.text')}
          href={t('content.cards.production.href')}
          icon={<PiChartLineUpThin className='h-10 w-10 text-white' />}
        />
        <ServiceCard
          title={t('content.cards.repair.title')}
          details={t('content.cards.repair.text')}
          href={t('content.cards.repair.href')}
          icon={<PiWrenchThin className='h-10 w-10 text-white' />}
        />
        <ServiceCard
          title={t('content.cards.distribution.title')}
          details={t('content.cards.distribution.text')}
          href={t('content.cards.distribution.href')}
          icon={<PiPackageThin className='h-10 w-10 text-white' />}
        />
      </div>
    );
  };

  const ProductsBanner = () => {
    const flags = useFlags(['products_overview']);
    if (!flags.products_overview.enabled) return null;

    if (flags.products_overview.enabled) {
      return (
        <div className='mt-2 flex w-full bg-primary-100 bg-[url(/images/services/blur.svg)] bg-cover bg-center'>
          <div className='relative flex grow flex-col justify-around gap-4 p-4 py-12 md:flex-row md:py-24 lg:flex-row lg:items-center'>
            <div className='lg:w-2/5'>
              <Title size='three'>
                Qualitative Präzisions-Produkte aus eigener Herstellung
              </Title>
              <Body margin={false}>
                Erkunden Sie unsere Produkte und finden Sie das passende für
                Ihre Anforderungen. Wir bieten eine breite Palette an
                qualitativen Produkten aus eigener Herstellung.
              </Body>
            </div>
            <ButtonLink
              variant='light'
              href='/produkte'
              className='bg-white/30 text-white'
              rightIcon={VscArrowRight}
              rightIconClassName='h-4 w-4'
            >
              Entdecken Sie unsere Produkte
            </ButtonLink>
          </div>
        </div>
      );
    }
  };

  return (
    <section className='mx-auto max-w-7xl bg-white pb-16 md:pb-24'>
      <Container>
        <Headline />
        <Tiles />
        <ProductsBanner />
      </Container>
    </section>
  );
}
