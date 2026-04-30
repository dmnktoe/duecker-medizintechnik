/* eslint-disable simple-import-sort/imports */
'use client';

import clsx from 'clsx';
import Image, { type StaticImageData } from 'next/image';
import { useTranslations } from 'next-intl';
import * as React from 'react';
import { VscArrowRight } from 'react-icons/vsc';

import { Container } from '@/components/layout/Container';
import { Body, Title } from '@/components/ui';

import { StickyScrollItem } from './StickyScrollTitle';
import { useFeatureStore } from './StickyScrollStore';

import distributionImg from '~/images/home/sticky-scroll/sticky-scroll_image-distribution.webp';
import productionImg from '~/images/home/sticky-scroll/sticky-scroll_image-production.jpg';
import repairImg from '~/images/home/sticky-scroll/sticky-scroll_image-repair.jpg';

type Feature = {
  id: string;
  img: StaticImageData;
  title: string;
  text: string;
  href: string;
};

const FeatureImagePanel = ({ features }: { features: Feature[] }) => {
  const inViewFeature = useFeatureStore((state) => state.inViewFeature);
  const activeId = inViewFeature ?? features[0].id;

  return (
    <div className='relative overflow-hidden rounded-sm bg-gray-200 shadow-md'>
      <div className='relative aspect-[4/3]'>
        {features.map((f, index) => (
          <div
            key={f.id}
            className={clsx(
              'absolute inset-0 transition-opacity duration-700 ease-in-out',
              activeId === f.id ? 'opacity-100' : 'opacity-0',
            )}
          >
            <Image
              src={f.img}
              alt={f.title}
              fill
              className='object-cover object-center'
              placeholder='blur'
              priority={index === 0}
              sizes='(max-width: 1024px) 100vw, 42vw'
            />
          </div>
        ))}

        {/* Gradient overlay with feature info */}
        <div className='absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent px-6 pt-16 pb-5'>
          {features.map((f, index) => (
            <div
              key={f.id}
              className={clsx(
                'transition-all duration-500',
                activeId === f.id
                  ? 'translate-y-0 opacity-100'
                  : 'pointer-events-none absolute translate-y-2 opacity-0',
              )}
            >
              <span className='font-secondary text-xs font-medium tracking-widest text-white/60 uppercase'>
                {String(index + 1).padStart(2, '0')} /{' '}
                {String(features.length).padStart(2, '0')}
              </span>
              <p className='mt-1 text-lg font-medium text-white'>{f.title}</p>
            </div>
          ))}
        </div>

        {/* Progress indicator */}
        <div className='absolute right-5 bottom-4 flex gap-1.5'>
          {features.map((f) => (
            <div
              key={f.id}
              className={clsx(
                'h-[3px] rounded-full transition-all duration-500',
                activeId === f.id ? 'w-6 bg-white' : 'w-2 bg-white/35',
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const StickyScroll = () => {
  const t = useTranslations('home');

  const features: Feature[] = [
    {
      id: 'production',
      img: productionImg,
      title: t('content.stickyScroll.production.title'),
      text: t('content.stickyScroll.production.text'),
      href: `/leistungen/${t('content.stickyScroll.production.href')}`,
    },
    {
      id: 'repair',
      img: repairImg,
      title: t('content.stickyScroll.repair.title'),
      text: t('content.stickyScroll.repair.text'),
      href: `/leistungen/${t('content.stickyScroll.repair.href')}`,
    },
    {
      id: 'distribution',
      img: distributionImg,
      title: t('content.stickyScroll.distribution.title'),
      text: t('content.stickyScroll.distribution.text'),
      href: `/leistungen/${t('content.stickyScroll.distribution.href')}`,
    },
  ];

  const learnMore = t('content.stickyScroll.learnMore');

  return (
    <section className='bg-gray-50 py-16 md:py-24 lg:py-32'>
      <Container>
        {/* Section header */}
        <div className='mb-10 max-w-4xl lg:mb-14'>
          <Title renderAs='h2' margin={false}>
            {t('content.stickyScroll.title')}
          </Title>
          <Body className='mt-4' margin={false} color='light'>
            {t('content.stickyScroll.text')}
          </Body>
        </div>

        {/* Mobile: stacked image cards */}
        <div className='flex flex-col gap-5 lg:hidden'>
          {features.map((f, index) => (
            <a key={f.id} href={f.href} className='group block'>
              <div className='relative overflow-hidden rounded-sm'>
                <div className='relative aspect-[16/9]'>
                  <Image
                    src={f.img}
                    alt={f.title}
                    fill
                    className='object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]'
                    placeholder='blur'
                    priority={index === 0}
                    sizes='(max-width: 767px) calc(100vw - 2rem), calc(100vw - 4rem)'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent' />
                  <div className='absolute inset-x-0 bottom-0 p-5'>
                    <span className='font-secondary text-xs font-medium tracking-widest text-white/55 uppercase'>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className='mt-1 text-xl font-medium text-white'>
                      {f.title}
                    </h3>
                    <p className='mt-1.5 line-clamp-2 text-sm leading-relaxed text-white/80'>
                      {f.text}
                    </p>
                    <div className='mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-white'>
                      {learnMore}
                      <VscArrowRight className='transition-transform duration-200 group-hover:translate-x-1' />
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Desktop: sticky scroll — image left, content right */}
        <div className='hidden lg:grid lg:grid-cols-[5fr_7fr] lg:gap-x-12 xl:gap-x-16'>
          {/* Left: sticky image panel */}
          <div>
            <div className='sticky top-[calc(var(--navigation-height)_+_2rem)]'>
              <FeatureImagePanel features={features} />
            </div>
          </div>

          {/* Right: scrollable feature items */}
          <div>
            {features.map((f, index) => (
              <StickyScrollItem
                key={f.id}
                id={f.id}
                index={index}
                total={features.length}
                href={f.href}
                title={f.title}
                learnMore={learnMore}
              >
                {f.text}
              </StickyScrollItem>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
