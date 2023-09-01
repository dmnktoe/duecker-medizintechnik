import { MouseEvent } from 'react';

import clsxm from '@/lib/clsxm';

import { Container } from '@/components/layout/Container';

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
    <section className='bg-gradient-to-br from-black to-neutral-800 py-16 md:py-24 lg:py-32'>
      <Container>
        <div className='mx-auto mb-16 max-w-4xl text-white md:mb-24'>
          <h1 className='text-center text-4xl lg:text-6xl'>
            Lorem ipsum dolor sit, consetetur sadipscing elitr.
          </h1>
          <div className='mt-3 text-center'>
            <p className='text-lg font-light text-white/60'>
              Lorem ipsum dolor sit amet, ut labore et dolore magna aliquyam
              consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam.
            </p>
          </div>
        </div>
        <div
          className='group flex w-full flex-wrap items-center justify-center gap-2'
          onMouseMove={onMouseMove}
        >
          <div
            className={clsxm(
              'relative flex h-64 w-80 cursor-pointer flex-col overflow-hidden rounded-xl bg-white/10',
              "before:bg-spotlight-hover before:absolute before:inset-0 before:z-30 before:rounded-xl before:opacity-0 before:transition-opacity before:duration-[400ms] before:content-['']",
              "after:bg-spotlight-borders after:absolute after:inset-0 after:z-10 after:h-full after:w-full after:rounded-xl after:opacity-0 after:transition-opacity after:duration-[400ms] after:content-['']",
              'hover:before:opacity-100 group-hover:after:opacity-100'
            )}
          >
            <div className='absolute inset-px z-20 flex flex-grow flex-col items-center justify-start rounded-xl bg-neutral-900 p-4 text-white'>
              <h3>ISO 8 Spezifikation</h3>
            </div>
          </div>
          <div
            className={clsxm(
              'relative flex h-64 w-80 cursor-pointer flex-col overflow-hidden rounded-xl bg-white/10',
              "before:bg-spotlight-hover before:absolute before:inset-0 before:z-30 before:rounded-xl before:opacity-0 before:transition-opacity before:duration-[400ms] before:content-['']",
              "after:bg-spotlight-borders after:absolute after:inset-0 after:z-10 after:h-full after:w-full after:rounded-xl after:opacity-0 after:transition-opacity after:duration-[400ms] after:content-['']",
              'hover:before:opacity-100 group-hover:after:opacity-100'
            )}
          >
            <div className='absolute inset-px z-20 flex flex-grow flex-col items-center justify-start rounded-xl bg-neutral-900 p-4 text-white'>
              <h3>ISO 8 Spezifikation</h3>
            </div>
          </div>
          <div
            className={clsxm(
              'relative flex h-64 w-80 cursor-pointer flex-col overflow-hidden rounded-xl bg-white/10',
              "before:bg-spotlight-hover before:absolute before:inset-0 before:z-30 before:rounded-xl before:opacity-0 before:transition-opacity before:duration-[400ms] before:content-['']",
              "after:bg-spotlight-borders after:absolute after:inset-0 after:z-10 after:h-full after:w-full after:rounded-xl after:opacity-0 after:transition-opacity after:duration-[400ms] after:content-['']",
              'hover:before:opacity-100 group-hover:after:opacity-100'
            )}
          >
            <div className='absolute inset-px z-20 flex flex-grow flex-col items-start justify-start rounded-xl bg-neutral-900 p-4 text-white'>
              <h3>ISO 8 Spezifikation</h3>
              <h6>Wir richten uns nach den höchsten Standards</h6>
            </div>
          </div>
          <div
            className={clsxm(
              'relative flex h-64 w-80 cursor-pointer flex-col overflow-hidden rounded-xl bg-white/10',
              "before:bg-spotlight-hover before:absolute before:inset-0 before:z-30 before:rounded-xl before:opacity-0 before:transition-opacity before:duration-[400ms] before:content-['']",
              "after:bg-spotlight-borders after:absolute after:inset-0 after:z-10 after:h-full after:w-full after:rounded-xl after:opacity-0 after:transition-opacity after:duration-[400ms] after:content-['']",
              'hover:before:opacity-100 group-hover:after:opacity-100'
            )}
          >
            <div className='absolute inset-px z-20 flex flex-grow flex-col items-center justify-start rounded-xl bg-neutral-900 p-4 text-white'>
              <h3>ISO 8 Spezifikation</h3>
            </div>
          </div>
          <div
            className={clsxm(
              'relative flex h-64 w-80 cursor-pointer flex-col overflow-hidden rounded-xl bg-white/10',
              "before:bg-spotlight-hover before:absolute before:inset-0 before:z-30 before:rounded-xl before:opacity-0 before:transition-opacity before:duration-[400ms] before:content-['']",
              "after:bg-spotlight-borders after:absolute after:inset-0 after:z-10 after:h-full after:w-full after:rounded-xl after:opacity-0 after:transition-opacity after:duration-[400ms] after:content-['']",
              'hover:before:opacity-100 group-hover:after:opacity-100'
            )}
          >
            <div className='absolute inset-px z-20 flex flex-grow flex-col items-center justify-start rounded-xl bg-neutral-900 p-4 text-white'>
              <h3>ISO 8 Spezifikation</h3>
            </div>
          </div>
          <div
            className={clsxm(
              'relative flex h-64 w-80 cursor-pointer flex-col overflow-hidden rounded-xl bg-white/10',
              "before:bg-spotlight-hover before:absolute before:inset-0 before:z-30 before:rounded-xl before:opacity-0 before:transition-opacity before:duration-[400ms] before:content-['']",
              "after:bg-spotlight-borders after:absolute after:inset-0 after:z-10 after:h-full after:w-full after:rounded-xl after:opacity-0 after:transition-opacity after:duration-[400ms] after:content-['']",
              'hover:before:opacity-100 group-hover:after:opacity-100'
            )}
          >
            <div className='absolute inset-px z-20 flex flex-grow flex-col items-center justify-start rounded-xl bg-neutral-900 p-4 text-white'>
              <h3>ISO 8 Spezifikation</h3>
            </div>
          </div>
          <div
            className={clsxm(
              'relative flex h-64 w-80 cursor-pointer flex-col overflow-hidden rounded-xl bg-white/10',
              "before:bg-spotlight-hover before:absolute before:inset-0 before:z-30 before:rounded-xl before:opacity-0 before:transition-opacity before:duration-[400ms] before:content-['']",
              "after:bg-spotlight-borders after:absolute after:inset-0 after:z-10 after:h-full after:w-full after:rounded-xl after:opacity-0 after:transition-opacity after:duration-[400ms] after:content-['']",
              'hover:before:opacity-100 group-hover:after:opacity-100'
            )}
          >
            <div className='absolute inset-px z-20 flex flex-grow flex-col items-end justify-end rounded-xl bg-neutral-900 p-4 text-right text-white'>
              <h3>OP-Werkzeuge</h3>
            </div>
          </div>
          <div
            className={clsxm(
              'relative flex h-64 w-80 cursor-pointer flex-col overflow-hidden rounded-xl bg-white/10',
              "before:bg-spotlight-hover before:absolute before:inset-0 before:z-30 before:rounded-xl before:opacity-0 before:transition-opacity before:duration-[400ms] before:content-['']",
              "after:bg-spotlight-borders after:absolute after:inset-0 after:z-10 after:h-full after:w-full after:rounded-xl after:opacity-0 after:transition-opacity after:duration-[400ms] after:content-['']",
              'hover:before:opacity-100 group-hover:after:opacity-100'
            )}
          >
            <div className='absolute inset-px z-20 flex flex-grow flex-col items-end justify-end rounded-xl bg-neutral-900 p-4 text-right text-white'>
              <h3>Aufbereitung</h3>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
