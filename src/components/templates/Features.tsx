import { MouseEvent } from 'react';

import clsxm from '@/lib/clsxm';

import { Container } from '@/components/layout/Container';
import NextImage from '@/components/ui/NextImage';

export const Features = () => {
  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    for (const card of Array.from(
      e.currentTarget.children as HTMLCollectionOf<HTMLElement>
    )) {
      const rect = card.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;

      card.style.setProperty('--cursor-x', `${x}px`);
      card.style.setProperty('--cursor-y', `${y}px`);
    }
  };

  return (
    <section className='py-16 md:py-24 lg:py-32'>
      <Container>
        <div className='mx-auto mb-8 max-w-6xl md:mb-12'>
          <h1 className='text-4xl font-bold lg:text-5xl'>Unsere Leistungen</h1>
          <h1 className='text-4xl font-bold text-gray-500 lg:text-5xl'>
            Verschaffen Sie sich einen Überlick.
          </h1>
        </div>
        <div
          className='group grid auto-rows-[200px] grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-12'
          onMouseMove={onMouseMove}
        >
          <div
            className={clsxm(
              'relative col-span-1 row-span-2 cursor-pointer overflow-hidden rounded-3xl bg-white/10 lg:col-span-3',
              "before:bg-spotlight-hover before:absolute before:inset-0 before:z-30 before:rounded-3xl before:opacity-0 before:transition-opacity before:duration-[400ms] before:content-['']",
              "after:bg-spotlight-borders after:absolute after:inset-0 after:z-10 after:h-full after:w-full after:rounded-3xl after:opacity-0 after:transition-opacity after:duration-[400ms] after:content-['']",
              'hover:before:opacity-100 group-hover:after:opacity-100'
            )}
          >
            <div className='text-dark absolute inset-px z-20 flex flex-grow flex-col justify-start rounded-3xl bg-gray-100 p-4'>
              <NextImage
                src='/images/keydot.jpg'
                width={200}
                height={200}
                layout='responsive'
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
              'hover:before:opacity-100 group-hover:after:opacity-100'
            )}
          >
            <div className='text-dark absolute inset-px z-20 flex flex-grow flex-col items-center justify-start rounded-3xl bg-gray-100 p-4'>
              <h3>Schachtel 2</h3>
            </div>
          </div>
          <div
            className={clsxm(
              'relative col-span-1 row-span-1 cursor-pointer overflow-hidden rounded-3xl bg-white/10 lg:col-span-3',
              "before:bg-spotlight-hover before:absolute before:inset-0 before:z-30 before:rounded-3xl before:opacity-0 before:transition-opacity before:duration-[400ms] before:content-['']",
              "after:bg-spotlight-borders after:absolute after:inset-0 after:z-10 after:h-full after:w-full after:rounded-3xl after:opacity-0 after:transition-opacity after:duration-[400ms] after:content-['']",
              'hover:before:opacity-100 group-hover:after:opacity-100'
            )}
          >
            <div className='text-dark absolute inset-px z-20 flex flex-grow flex-col items-center justify-start rounded-3xl bg-gray-100 p-4'>
              <h3>Schachtel 3</h3>
            </div>
          </div>
          <div
            className={clsxm(
              'relative col-span-1 row-span-2 cursor-pointer overflow-hidden rounded-3xl bg-white/10 lg:col-span-3',
              "before:bg-spotlight-hover before:absolute before:inset-0 before:z-30 before:rounded-3xl before:opacity-0 before:transition-opacity before:duration-[400ms] before:content-['']",
              "after:bg-spotlight-borders after:absolute after:inset-0 after:z-10 after:h-full after:w-full after:rounded-3xl after:opacity-0 after:transition-opacity after:duration-[400ms] after:content-['']",
              'hover:before:opacity-100 group-hover:after:opacity-100'
            )}
          >
            <div className='text-dark absolute inset-px z-20 flex flex-grow flex-col items-center justify-start rounded-3xl bg-gray-100 p-4'>
              <h3>Schachtel 4</h3>
            </div>
          </div>
          <div
            className={clsxm(
              'relative col-span-1 row-span-2 cursor-pointer overflow-hidden rounded-3xl bg-white/10 lg:col-span-6',
              "before:bg-spotlight-hover before:absolute before:inset-0 before:z-30 before:rounded-3xl before:opacity-0 before:transition-opacity before:duration-[400ms] before:content-['']",
              "after:bg-spotlight-borders after:absolute after:inset-0 after:z-10 after:h-full after:w-full after:rounded-3xl after:opacity-0 after:transition-opacity after:duration-[400ms] after:content-['']",
              'hover:before:opacity-100 group-hover:after:opacity-100'
            )}
          >
            <div className='text-dark absolute inset-px z-20 flex flex-grow flex-col items-center justify-start rounded-3xl bg-gray-100 p-4'>
              <h3>Schachtel 5</h3>
            </div>
          </div>
          <div
            className={clsxm(
              'relative col-span-1 row-span-1 cursor-pointer overflow-hidden rounded-3xl bg-white/10 lg:col-span-3',
              "before:bg-spotlight-hover before:absolute before:inset-0 before:z-30 before:rounded-3xl before:opacity-0 before:transition-opacity before:duration-[400ms] before:content-['']",
              "after:bg-spotlight-borders after:absolute after:inset-0 after:z-10 after:h-full after:w-full after:rounded-3xl after:opacity-0 after:transition-opacity after:duration-[400ms] after:content-['']",
              'hover:before:opacity-100 group-hover:after:opacity-100'
            )}
          >
            <div className='text-dark absolute inset-px z-20 flex flex-grow flex-col items-center justify-start rounded-3xl bg-gray-100 p-4'>
              <h3>Schachtel 6</h3>
            </div>
          </div>
          <div
            className={clsxm(
              'relative col-span-1 row-span-2 cursor-pointer overflow-hidden rounded-3xl bg-white/10 lg:col-span-3',
              "before:bg-spotlight-hover before:absolute before:inset-0 before:z-30 before:rounded-3xl before:opacity-0 before:transition-opacity before:duration-[400ms] before:content-['']",
              "after:bg-spotlight-borders after:absolute after:inset-0 after:z-10 after:h-full after:w-full after:rounded-3xl after:opacity-0 after:transition-opacity after:duration-[400ms] after:content-['']",
              'hover:before:opacity-100 group-hover:after:opacity-100'
            )}
          >
            <div className='text-dark absolute inset-px z-20 flex flex-grow flex-col items-center justify-start rounded-3xl bg-gray-100 p-4'>
              <h3>Schachtel 7</h3>
            </div>
          </div>
          <div
            className={clsxm(
              'relative col-span-1 row-span-1 cursor-pointer overflow-hidden rounded-3xl bg-white/10 lg:col-span-6',
              "before:bg-spotlight-hover before:absolute before:inset-0 before:z-30 before:rounded-3xl before:opacity-0 before:transition-opacity before:duration-[400ms] before:content-['']",
              "after:bg-spotlight-borders after:absolute after:inset-0 after:z-10 after:h-full after:w-full after:rounded-3xl after:opacity-0 after:transition-opacity after:duration-[400ms] after:content-['']",
              'hover:before:opacity-100 group-hover:after:opacity-100'
            )}
          >
            <div className='text-dark absolute inset-px z-20 flex flex-grow flex-col items-center justify-start rounded-3xl bg-gray-100 p-4'>
              <h3>Schachtel 8</h3>
            </div>
          </div>
          <div
            className={clsxm(
              'relative col-span-1 row-span-1 cursor-pointer overflow-hidden rounded-3xl bg-white/10 lg:col-span-3',
              "before:bg-spotlight-hover before:absolute before:inset-0 before:z-30 before:rounded-3xl before:opacity-0 before:transition-opacity before:duration-[400ms] before:content-['']",
              "after:bg-spotlight-borders after:absolute after:inset-0 after:z-10 after:h-full after:w-full after:rounded-3xl after:opacity-0 after:transition-opacity after:duration-[400ms] after:content-['']",
              'hover:before:opacity-100 group-hover:after:opacity-100'
            )}
          >
            <div className='text-dark absolute inset-px z-20 flex flex-grow flex-col items-center justify-start rounded-3xl bg-gray-100 p-4'>
              <h3>Schachtel 9</h3>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
