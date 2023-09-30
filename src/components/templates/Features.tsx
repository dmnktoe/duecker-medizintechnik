import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { MouseEvent } from 'react';

import clsxm from '@/lib/clsxm';

import { Container } from '@/components/layout/Container';

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
            t('features.textBlocks', {
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
            width='29'
            height='29'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M14.5 28.5C22.232 28.5 28.5 22.232 28.5 14.5C28.5 6.76801 22.232 0.5 14.5 0.5C6.76801 0.5 0.5 6.76801 0.5 14.5C0.5 22.232 6.76801 28.5 14.5 28.5ZM20.9874 12.2374C21.6709 11.554 21.6709 10.446 20.9874 9.76256C20.304 9.07915 19.196 9.07915 18.5126 9.76256L12.75 15.5251L10.4874 13.2626C9.80402 12.5791 8.69598 12.5791 8.01256 13.2626C7.32915 13.946 7.32915 15.054 8.01256 15.7374L11.5126 19.2374C12.196 19.9209 13.304 19.9209 13.9874 19.2374L20.9874 12.2374Z'
              fill='var(--color-primary-500)'
            ></path>
          </svg>
        </div>
        <div className='flex-1 p-1.5'>
          <h3 className='mb-2 text-xl font-semibold tracking-tight'>{title}</h3>
          <p className='tracking-tight'>{content}</p>
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
              "before:bg-spotlight-hover before:absolute before:inset-0 before:z-30 before:rounded-3xl before:opacity-0 before:transition-opacity before:duration-[400ms] before:content-['']",
              "after:bg-spotlight-borders after:absolute after:inset-0 after:z-10 after:h-full after:w-full after:rounded-3xl after:opacity-0 after:transition-opacity after:duration-[400ms] after:content-['']",
              'hover:before:opacity-100 group-hover:after:opacity-100',
            )}
          >
            <div className='text-dark absolute inset-px z-20 flex flex-grow flex-col justify-start rounded-3xl bg-gray-100 p-4'>
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
              "before:bg-spotlight-hover before:absolute before:inset-0 before:z-30 before:rounded-3xl before:opacity-0 before:transition-opacity before:duration-[400ms] before:content-['']",
              "after:bg-spotlight-borders after:absolute after:inset-0 after:z-10 after:h-full after:w-full after:rounded-3xl after:opacity-0 after:transition-opacity after:duration-[400ms] after:content-['']",
              'hover:before:opacity-100 group-hover:after:opacity-100',
            )}
          >
            <div className='text-dark absolute inset-px z-20 flex flex-grow flex-col items-center justify-between rounded-3xl bg-gray-100 p-4'>
              <h5>Spezifikation</h5>
              <h1 className='text-7xl font-bold bg-gradient-to-r from-purple-400 to-purple-700 inline-block text-transparent bg-clip-text'>
                ISO8
              </h1>
              <h5>Spezifikation</h5>
            </div>
          </div>
          <div
            className={clsxm(
              'relative col-span-1 row-span-1 cursor-pointer overflow-hidden rounded-3xl bg-white/10 lg:col-span-3',
              "before:bg-spotlight-hover before:absolute before:inset-0 before:z-30 before:rounded-3xl before:opacity-0 before:transition-opacity before:duration-[400ms] before:content-['']",
              "after:bg-spotlight-borders after:absolute after:inset-0 after:z-10 after:h-full after:w-full after:rounded-3xl after:opacity-0 after:transition-opacity after:duration-[400ms] after:content-['']",
              'hover:before:opacity-100 group-hover:after:opacity-100',
            )}
          >
            <div className='text-dark absolute inset-px z-20 flex flex-grow flex-col items-center justify-start rounded-3xl bg-gray-100 p-4'>
              Box
            </div>
          </div>
          <div
            className={clsxm(
              'relative col-span-1 row-span-2 cursor-pointer overflow-hidden rounded-3xl bg-white/10 lg:col-span-3',
              "before:bg-spotlight-hover before:absolute before:inset-0 before:z-30 before:rounded-3xl before:opacity-0 before:transition-opacity before:duration-[400ms] before:content-['']",
              "after:bg-spotlight-borders after:absolute after:inset-0 after:z-10 after:h-full after:w-full after:rounded-3xl after:opacity-0 after:transition-opacity after:duration-[400ms] after:content-['']",
              'hover:before:opacity-100 group-hover:after:opacity-100',
            )}
          >
            <div className='text-dark absolute inset-px z-20 flex flex-grow flex-col items-center justify-start rounded-3xl bg-gray-100 p-4'>
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
              "before:bg-spotlight-hover before:absolute before:inset-0 before:z-30 before:rounded-3xl before:opacity-0 before:transition-opacity before:duration-[400ms] before:content-['']",
              "after:bg-spotlight-borders after:absolute after:inset-0 after:z-10 after:h-full after:w-full after:rounded-3xl after:opacity-0 after:transition-opacity after:duration-[400ms] after:content-['']",
              'hover:before:opacity-100 group-hover:after:opacity-100',
            )}
          >
            <div className='text-dark absolute inset-px z-20 flex flex-grow flex-col items-center justify-start rounded-3xl bg-gray-100 p-4'>
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
              "before:bg-spotlight-hover before:absolute before:inset-0 before:z-30 before:rounded-3xl before:opacity-0 before:transition-opacity before:duration-[400ms] before:content-['']",
              "after:bg-spotlight-borders after:absolute after:inset-0 after:z-10 after:h-full after:w-full after:rounded-3xl after:opacity-0 after:transition-opacity after:duration-[400ms] after:content-['']",
              'hover:before:opacity-100 group-hover:after:opacity-100',
            )}
          >
            <div className='text-dark absolute inset-px z-20 flex flex-grow flex-col items-center justify-between rounded-3xl bg-gray-100 p-4'>
              Box
            </div>
          </div>
          <div
            className={clsxm(
              'relative col-span-1 row-span-2 cursor-pointer overflow-hidden rounded-3xl bg-white/10 lg:col-span-3',
              "before:bg-spotlight-hover before:absolute before:inset-0 before:z-30 before:rounded-3xl before:opacity-0 before:transition-opacity before:duration-[400ms] before:content-['']",
              "after:bg-spotlight-borders after:absolute after:inset-0 after:z-10 after:h-full after:w-full after:rounded-3xl after:opacity-0 after:transition-opacity after:duration-[400ms] after:content-['']",
              'hover:before:opacity-100 group-hover:after:opacity-100',
            )}
          >
            <div className='text-dark absolute inset-px z-20 flex flex-grow flex-col items-center justify-start rounded-3xl bg-gray-100 p-4'>
              Box
            </div>
          </div>
          <div
            className={clsxm(
              'relative col-span-1 row-span-1 cursor-pointer overflow-hidden rounded-3xl bg-white/10 lg:col-span-6',
              "before:bg-spotlight-hover before:absolute before:inset-0 before:z-30 before:rounded-3xl before:opacity-0 before:transition-opacity before:duration-[400ms] before:content-['']",
              "after:bg-spotlight-borders after:absolute after:inset-0 after:z-10 after:h-full after:w-full after:rounded-3xl after:opacity-0 after:transition-opacity after:duration-[400ms] after:content-['']",
              'hover:before:opacity-100 group-hover:after:opacity-100',
            )}
          >
            <div className='text-dark absolute inset-px z-20 flex flex-grow flex-col items-center justify-start rounded-3xl bg-gray-100 p-4'>
              <div className='text-dark absolute inset-px z-20 flex flex-grow flex-col items-center justify-between rounded-3xl bg-gray-100 p-4'>
                Box
              </div>
            </div>
          </div>
          <div
            className={clsxm(
              'relative col-span-1 row-span-1 cursor-pointer overflow-hidden rounded-3xl bg-white/10 lg:col-span-3',
              "before:bg-spotlight-hover before:absolute before:inset-0 before:z-30 before:rounded-3xl before:opacity-0 before:transition-opacity before:duration-[400ms] before:content-['']",
              "after:bg-spotlight-borders after:absolute after:inset-0 after:z-10 after:h-full after:w-full after:rounded-3xl after:opacity-0 after:transition-opacity after:duration-[400ms] after:content-['']",
              'hover:before:opacity-100 group-hover:after:opacity-100',
            )}
          >
            <div className='text-dark absolute inset-px z-20 flex flex-grow flex-col items-center justify-start rounded-3xl bg-gray-100 p-4'>
              <div className='text-dark absolute inset-px z-20 flex flex-grow flex-col items-center justify-between rounded-3xl bg-gray-100 p-4'>
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
            <h1 className='text-4xl font-bold tracking-tight lg:text-5xl'>
              {t('features.headline')}
            </h1>
            <h1 className='text-4xl font-bold text-gray-500 lg:text-5xl'>
              {t('features.subline')}
            </h1>
          </div>
        </Container>
        <TextBlocks />
        <BentoGrid />
      </section>
    </>
  );
};
