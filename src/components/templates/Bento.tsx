import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { MouseEvent } from 'react';

import clsxm from '@/lib/clsxm';

import { Container } from '@/components/layout';
import { Title } from '@/components/ui/Typography';

import bentoGridImg2 from '/public/images/home/bento-grid/bento-grid_keydot.jpg';
import bentoGridImg5 from '/public/images/home/bento-grid/bento-grid_nouvag.png';
import bentoGridImg1 from '/public/images/home/bento-grid/bento-grid_product-highlight.jpg';

export const Bento = () => {
  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    for (const card of Array.from(
      e.currentTarget.children as HTMLCollectionOf<HTMLElement>,
    )) {
      const rect = card.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;

      card.style.setProperty('--cursor-x', `${x}px`);
      card.style.setProperty('--cursor-y', `${y}px`);
    }
  };

  const { t } = useTranslation('home');

  return (
    <section className='border-t border-neutral-100 pb-16 md:py-24 lg:py-32'>
      <Container>
        <div className='mb-8'>
          <Title renderAs='h2' className='md:-mb-2' margin={false}>
            Quality, Innovation, and Precision
          </Title>
          <Title renderAs='h2' className='text-gray-500'>
            Precision Instruments for Dentistry
          </Title>
        </div>
        <div
          className='group grid auto-rows-[200px] grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-12'
          onMouseMove={onMouseMove}
        >
          <div
            className={clsxm(
              'relative col-span-1 row-span-2 cursor-pointer overflow-hidden rounded-3xl bg-white/10 lg:col-span-3',
              "before:absolute before:inset-0 before:z-30 before:rounded-3xl before:bg-spotlight-hover before:opacity-0 before:transition-opacity before:duration-[400ms] before:content-['']",
              "after:absolute after:inset-0 after:z-10 after:h-full after:w-full after:rounded-3xl after:bg-spotlight-borders after:opacity-0 after:transition-opacity after:duration-[400ms] after:content-['']",
              'hover:before:opacity-100 group-hover:after:opacity-100',
            )}
          >
            <div className='absolute inset-px z-20 flex flex-grow flex-col justify-start rounded-3xl bg-neutral-50 p-4 text-dark'>
              <Image
                src={bentoGridImg2}
                placeholder='blur'
                fill
                objectFit='cover'
                objectPosition='center'
                className='absolute right-0 top-0 h-full w-full overflow-hidden rounded-3xl mix-blend-darken'
                alt='Keydot'
              />
            </div>
          </div>
          <div
            className={clsxm(
              'relative col-span-1 row-span-1 cursor-pointer overflow-hidden rounded-3xl bg-white/10 lg:col-span-3',
              "before:absolute before:inset-0 before:z-30 before:rounded-3xl before:bg-spotlight-hover before:opacity-0 before:transition-opacity before:duration-[400ms] before:content-['']",
              "after:absolute after:inset-0 after:z-10 after:h-full after:w-full after:rounded-3xl after:bg-spotlight-borders after:opacity-0 after:transition-opacity after:duration-[400ms] after:content-['']",
              'hover:before:opacity-100 group-hover:after:opacity-100',
            )}
          >
            <div className='absolute inset-px z-20 flex flex-grow flex-col items-center justify-between rounded-3xl bg-neutral-50 p-4 text-dark'>
              <h5 className='text-black/60'>
                {t('content.features.bentoGrid.boxIso.textTop')}
              </h5>
              <h1 className='inline-block bg-gradient-to-r from-purple-400 to-purple-700 bg-clip-text text-7xl font-bold text-transparent'>
                {t('content.features.bentoGrid.boxIso.textAccent')}
              </h1>
              <h5 className='text-black/60'>
                {t('content.features.bentoGrid.boxIso.textBottom')}
              </h5>
            </div>
          </div>
          <div
            className={clsxm(
              'relative col-span-1 row-span-1 cursor-pointer overflow-hidden rounded-3xl bg-white/10 lg:col-span-3',
              "before:absolute before:inset-0 before:z-30 before:rounded-3xl before:bg-spotlight-hover before:opacity-0 before:transition-opacity before:duration-[400ms] before:content-['']",
              "after:absolute after:inset-0 after:z-10 after:h-full after:w-full after:rounded-3xl after:bg-spotlight-borders after:opacity-0 after:transition-opacity after:duration-[400ms] after:content-['']",
              'hover:before:opacity-100 group-hover:after:opacity-100',
            )}
          >
            <div className='absolute inset-px z-20 flex flex-grow flex-col items-center justify-start rounded-3xl bg-neutral-50 p-4 text-dark'>
              Box
            </div>
          </div>
          <div
            className={clsxm(
              'relative col-span-1 row-span-2 cursor-pointer overflow-hidden rounded-3xl bg-white/10 lg:col-span-3',
              "before:absolute before:inset-0 before:z-30 before:rounded-3xl before:bg-spotlight-hover before:opacity-0 before:transition-opacity before:duration-[400ms] before:content-['']",
              "after:absolute after:inset-0 after:z-10 after:h-full after:w-full after:rounded-3xl after:bg-spotlight-borders after:opacity-0 after:transition-opacity after:duration-[400ms] after:content-['']",
              'hover:before:opacity-100 group-hover:after:opacity-100',
            )}
          >
            <div className='absolute inset-px z-20 flex flex-grow flex-col items-center justify-start rounded-3xl bg-neutral-50 p-4 text-dark'>
              <Image
                src={bentoGridImg5}
                placeholder='blur'
                fill
                objectFit='cover'
                objectPosition='center'
                className='absolute right-0 top-0 h-full w-full overflow-hidden rounded-3xl'
                alt='Keydot'
              />
            </div>
          </div>
          <div
            className={clsxm(
              'relative col-span-1 row-span-2 cursor-pointer overflow-hidden rounded-3xl bg-white/10 lg:col-span-6',
              "before:absolute before:inset-0 before:z-30 before:rounded-3xl before:bg-spotlight-hover before:opacity-0 before:transition-opacity before:duration-[400ms] before:content-['']",
              "after:absolute after:inset-0 after:z-10 after:h-full after:w-full after:rounded-3xl after:bg-spotlight-borders after:opacity-0 after:transition-opacity after:duration-[400ms] after:content-['']",
              'hover:before:opacity-100 group-hover:after:opacity-100',
            )}
          >
            <div className='absolute inset-px z-20 flex flex-grow flex-col items-center justify-start rounded-3xl bg-neutral-50 p-4 text-dark'>
              <Image
                src={bentoGridImg1}
                placeholder='blur'
                fill
                objectFit='cover'
                objectPosition='center'
                className='absolute right-0 top-0 h-full w-full overflow-hidden rounded-3xl'
                alt='Keydot'
              />
            </div>
          </div>
          <div
            className={clsxm(
              'relative col-span-1 row-span-1 cursor-pointer overflow-hidden rounded-3xl bg-white/10 lg:col-span-3',
              "before:absolute before:inset-0 before:z-30 before:rounded-3xl before:bg-spotlight-hover before:opacity-0 before:transition-opacity before:duration-[400ms] before:content-['']",
              "after:absolute after:inset-0 after:z-10 after:h-full after:w-full after:rounded-3xl after:bg-spotlight-borders after:opacity-0 after:transition-opacity after:duration-[400ms] after:content-['']",
              'hover:before:opacity-100 group-hover:after:opacity-100',
            )}
          >
            <div className='absolute inset-px z-20 flex flex-grow flex-col items-center justify-between rounded-3xl bg-neutral-50 p-4 text-dark'>
              Box
            </div>
          </div>
          <div
            className={clsxm(
              'relative col-span-1 row-span-2 cursor-pointer overflow-hidden rounded-3xl bg-white/10 lg:col-span-3',
              "before:absolute before:inset-0 before:z-30 before:rounded-3xl before:bg-spotlight-hover before:opacity-0 before:transition-opacity before:duration-[400ms] before:content-['']",
              "after:absolute after:inset-0 after:z-10 after:h-full after:w-full after:rounded-3xl after:bg-spotlight-borders after:opacity-0 after:transition-opacity after:duration-[400ms] after:content-['']",
              'hover:before:opacity-100 group-hover:after:opacity-100',
            )}
          >
            <div className='absolute inset-px z-20 flex flex-grow flex-col items-center justify-start rounded-3xl bg-neutral-50 p-4 text-dark'>
              Box
            </div>
          </div>
          <div
            className={clsxm(
              'relative col-span-1 row-span-1 cursor-pointer overflow-hidden rounded-3xl bg-white/10 lg:col-span-6',
              "before:absolute before:inset-0 before:z-30 before:rounded-3xl before:bg-spotlight-hover before:opacity-0 before:transition-opacity before:duration-[400ms] before:content-['']",
              "after:absolute after:inset-0 after:z-10 after:h-full after:w-full after:rounded-3xl after:bg-spotlight-borders after:opacity-0 after:transition-opacity after:duration-[400ms] after:content-['']",
              'hover:before:opacity-100 group-hover:after:opacity-100',
            )}
          >
            <div className='absolute inset-px z-20 flex flex-grow flex-col items-center justify-start rounded-3xl bg-neutral-50 p-4 text-dark'>
              <div className='absolute inset-px z-20 flex flex-grow flex-col items-center justify-between rounded-3xl bg-neutral-50 p-4 text-dark'>
                Box
              </div>
            </div>
          </div>
          <div
            className={clsxm(
              'relative col-span-1 row-span-1 cursor-pointer overflow-hidden rounded-3xl bg-white/10 lg:col-span-3',
              "before:absolute before:inset-0 before:z-30 before:rounded-3xl before:bg-spotlight-hover before:opacity-0 before:transition-opacity before:duration-[400ms] before:content-['']",
              "after:absolute after:inset-0 after:z-10 after:h-full after:w-full after:rounded-3xl after:bg-spotlight-borders after:opacity-0 after:transition-opacity after:duration-[400ms] after:content-['']",
              'hover:before:opacity-100 group-hover:after:opacity-100',
            )}
          >
            <div className='absolute inset-px z-20 flex flex-grow flex-col items-center justify-start rounded-3xl bg-neutral-50 p-4 text-dark'>
              <div className='absolute inset-px z-20 flex flex-grow flex-col items-center justify-between rounded-3xl bg-neutral-50 p-4 text-dark'>
                Box
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
