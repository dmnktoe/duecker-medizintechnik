import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { MouseEvent } from 'react';

import clsxm from '@/lib/clsxm';

import { Container } from '@/components/layout/Container';
import { Title } from '@/components/ui/typography/Title';

import bentoGridImg2 from '/public/images/home/bento-grid/bento-grid_keydot.jpg';
import bentoGridImg5 from '/public/images/home/bento-grid/bento-grid_nouvag.png';
import bentoGridImg1 from '/public/images/home/bento-grid/bento-grid_product-highlight.jpg';

const TextBlocks = () => {
  const { t, ready } = useTranslation('home', { useSuspense: false });
  return (
    <>
      <Container>
        <div className='-m-8 flex flex-wrap'>
          {ready &&
            t('content.features.textBlocks', {
              returnObjects: true,
            }).map((item) => (
              <TextBlockElement
                key={item.title}
                title={item.title}
                content={item.content}
              />
            ))}
        </div>
      </Container>
    </>
  );
};

const TextBlockElement = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => (
  <div className='w-full p-8 md:w-1/2 lg:w-1/3'>
    <div className='md:max-w-sm'>
      <div className='-m-1.5 flex flex-wrap'>
        <div className='w-auto p-1.5'>
          <svg
            className='h-[20px] w-[20px] md:h-[26px] md:w-[26px]'
            width={26}
            height={26}
            viewBox='0 0 26 26'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M9.25 13L11.75 15.5L16.75 10.5M24.25 13C24.25 19.2132 19.2132 24.25 13 24.25C6.7868 24.25 1.75 19.2132 1.75 13C1.75 6.7868 6.7868 1.75 13 1.75C19.2132 1.75 24.25 6.7868 24.25 13Z'
              stroke='var(--color-primary-500)'
              strokeWidth={2}
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </div>
        <div className='flex-1 p-1.5'>
          <h3 className='mb-2 text-xl font-semibold tracking-tight'>{title}</h3>
          <p className='text-sm leading-6'>{content}</p>
        </div>
      </div>
    </div>
  </div>
);

const BentoGrid = () => {
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
    <section className='pt-16 md:pt-24 lg:pt-32'>
      <Container>
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
            <div className='absolute inset-px z-20 flex flex-grow flex-col justify-start rounded-3xl bg-gray-100 p-4 text-dark'>
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
            <div className='absolute inset-px z-20 flex flex-grow flex-col items-center justify-between rounded-3xl bg-gray-100 p-4 text-dark'>
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
            <div className='absolute inset-px z-20 flex flex-grow flex-col items-center justify-start rounded-3xl bg-gray-100 p-4 text-dark'>
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
            <div className='absolute inset-px z-20 flex flex-grow flex-col items-center justify-start rounded-3xl bg-gray-100 p-4 text-dark'>
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
            <div className='absolute inset-px z-20 flex flex-grow flex-col items-center justify-start rounded-3xl bg-gray-100 p-4 text-dark'>
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
            <div className='absolute inset-px z-20 flex flex-grow flex-col items-center justify-between rounded-3xl bg-gray-100 p-4 text-dark'>
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
            <div className='absolute inset-px z-20 flex flex-grow flex-col items-center justify-start rounded-3xl bg-gray-100 p-4 text-dark'>
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
            <div className='absolute inset-px z-20 flex flex-grow flex-col items-center justify-start rounded-3xl bg-gray-100 p-4 text-dark'>
              <div className='absolute inset-px z-20 flex flex-grow flex-col items-center justify-between rounded-3xl bg-gray-100 p-4 text-dark'>
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
            <div className='absolute inset-px z-20 flex flex-grow flex-col items-center justify-start rounded-3xl bg-gray-100 p-4 text-dark'>
              <div className='absolute inset-px z-20 flex flex-grow flex-col items-center justify-between rounded-3xl bg-gray-100 p-4 text-dark'>
                Box
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export const Features = () => {
  const { t } = useTranslation('home');
  return (
    <>
      <section className='py-16 md:py-24 lg:py-32'>
        <Container>
          <div className='mb-16 md:mb-24'>
            <Title className='md:-mb-2' margin={false}>
              {t('content.features.title')}
            </Title>
            <Title className='text-gray-500'>
              {t('content.features.titleTwo')}
            </Title>
          </div>
        </Container>
        <TextBlocks />
        <BentoGrid />
      </section>
    </>
  );
};
