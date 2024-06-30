import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { ReactNode } from 'react';

import clsxm from '@/lib/clsxm';

import { Container } from '@/components/layout';
import Globe from '@/components/templates/Globe';
import Marquee from '@/components/templates/Marquee';
import { Body, Title } from '@/components/ui';

import bentoGridImg2 from '/public/images/home/bento-grid/bento-grid_customer-standards.webp';
import bentoGridImg1 from '/public/images/home/bento-grid/bento-grid_internal-repair.webp';
import { ISO8 } from '~/images/home/bento-grid/iso8';

const files = [
  {
    name: 'EN ISO',
    body: '"EN ISO" refers to standards adopted by the European Union (EN) from the International Organization for Standardization (ISO).',
  },
  {
    name: '13485',
    body: 'ISO 13485, a standard for quality management systems specific to the medical devices industry.',
  },
  {
    name: 'AC',
    body: 'AC refers to an amendment or corrigendum for a specific standard, clarifying or correcting its content.',
  },
  {
    name: 'A11',
    body: 'A11 is an amendment issued in 2021 for a specific standard, updating or adding to its original content.',
  },
  {
    name: 'Infektionsschutz',
    body: 'Referring to measures and regulations to prevent and control the spread of infections.',
  },
];

const tiles = [
  {
    name: 'content.bentoGrid.tiles.production.title',
    description: 'content.bentoGrid.tiles.production.description',
    className: 'col-span-3 lg:col-span-2',
    background: (
      <div className='absolute h-full w-full'>
        <Image
          src={bentoGridImg2.src}
          alt='Keydot'
          priority
          className='h-full w-full object-cover'
          quality={95}
          width={800}
          height={800}
        />
      </div>
    ),
  },
  {
    name: 'content.bentoGrid.tiles.repair.title',
    description: 'content.bentoGrid.tiles.repair.description',
    className: 'col-span-3 lg:col-span-1',
    href: '/contact',
    textIsWhite: true,
    background: (
      <div className='absolute right-0 h-full w-full'>
        <Image
          src={bentoGridImg1.src}
          alt='Keydot'
          priority
          className='h-full w-full object-cover'
          quality={90}
          width={800}
          height={800}
        />
      </div>
    ),
  },
  {
    name: 'content.bentoGrid.tiles.downloads.title',
    description: 'content.bentoGrid.tiles.downloads.description',
    className: 'col-span-3 lg:col-span-1 bg-neutral-100',
    href: '/contact',
    background: (
      <Marquee
        pauseOnHover
        className='absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_30%,#000_100%)]'
      >
        {files.map((f, idx) => (
          <figure
            key={idx}
            className={clsxm(
              'relative w-36 overflow-hidden rounded-xl border p-4',
              'border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]',
              'transition-all duration-300 ease-out hover:blur-none',
            )}
          >
            <div className='flex flex-row items-center gap-2'>
              <div className='flex flex-col'>
                <figcaption className='text-sm font-medium'>
                  {f.name}
                </figcaption>
              </div>
            </div>
            <blockquote className='mt-2 text-xs'>{f.body}</blockquote>
          </figure>
        ))}
      </Marquee>
    ),
  },
  {
    name: 'content.bentoGrid.tiles.iso8.title',
    description: 'content.bentoGrid.tiles.iso8.description',
    className: 'col-span-3 lg:col-span-1 bg-primary-100 text-white',
    background: (
      <div className='mx-auto flex h-full justify-center text-center'>
        <ISO8 className='absolute mx-auto block w-72 pt-8 [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)]' />
      </div>
    ),
  },
  {
    name: 'content.bentoGrid.tiles.distribution.title',
    description: 'content.bentoGrid.tiles.distribution.description',
    href: '/contact',
    cta: 'Learn more',
    className:
      'col-span-3 lg:col-span-1 from-dark to-primary-800 bg-gradient-to-br',
    textIsWhite: true,
    background: (
      <Globe className='top-0 h-[600px] w-[600px] opacity-30 transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] sm:left-40 xl:h-[800px] xl:w-[800px] 2xl:-left-6' />
    ),
  },
  /*  {
    name: 'content.bentoGrid.tiles.repair.title',
    description: 'content.bentoGrid.tiles.repair.description',
    className: 'col-span-3 lg:col-span-1',
    href: '/contact',
    textIsWhite: true,
    background: (
      <div className='absolute right-0 h-full w-full'>
        <Image
          src={bentoGridImg4.src}
          alt='Keydot'
          priority
          className='h-full w-full object-cover'
          quality={90}
          width={800}
          height={800}
        />
      </div>
    ),
  },
  {
    name: 'content.bentoGrid.tiles.production.title',
    description: 'content.bentoGrid.tiles.production.description',
    className: 'col-span-3 lg:col-span-2',
    textIsWhite: true,
    background: (
      <div className='absolute h-full w-full'>
        <Image
          src={bentoGridImg3.src}
          alt='Keydot'
          priority
          className='h-full w-full object-cover'
          quality={95}
          width={800}
          height={800}
        />
      </div>
    ),
  },*/
];

const SectionTitle = () => {
  const { t } = useTranslation('home');
  return (
    <div className='mb-16 text-center'>
      <Title renderAs='h2' className='md:-mb-2' margin={false}>
        {t('content.bentoGrid.title')}
      </Title>
      <Title renderAs='h2' className='text-gray-400'>
        {t('content.bentoGrid.subTitle')}
      </Title>
    </div>
  );
};

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={clsxm(
        'grid w-full auto-rows-[25rem] grid-cols-3 gap-3',
        className,
      )}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  description,
  textIsWhite = false,
}: {
  name: string;
  className: string;
  background: ReactNode;
  description: string;
  textIsWhite?: boolean;
}) => {
  const { t } = useTranslation('home');

  return (
    <>
      <div
        key={name}
        className={clsxm(
          'group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-2xl bg-dark transition-all duration-300 ease-out hover:grayscale-0',
          // light styles
          textIsWhite
            ? 'bg-white'
            : 'border border-solid border-gray-200 bg-white hover:border-primary-300',
          className,
        )}
      >
        <div>{background}</div>
        <div
          className={clsxm(
            'pointer-events-none z-10 flex flex-col p-6 transition-all duration-300',
            textIsWhite ? 'bg-dark/40' : 'bg-white/40',
          )}
        >
          <Title
            size='four'
            margin={false}
            className={clsxm(textIsWhite ? 'text-white' : 'text-dark', 'mb-1')}
          >
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-expect-error */}
            {t(name)}
          </Title>
          <Body
            margin={false}
            className={clsxm(
              'max-w-lg',
              textIsWhite ? 'text-white' : 'text-dark',
            )}
          >
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-expect-error */}
            {t(description)}
          </Body>
        </div>
        <div className='pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-dark/[.02]' />
      </div>
    </>
  );
};

export const BentoSection = () => {
  return (
    <section className='py-16 md:py-24 lg:border-t lg:border-dashed lg:border-gray-300 lg:py-32'>
      <Container>
        <SectionTitle />
        <BentoGrid>
          {tiles.map((tile, idx) => (
            <BentoCard key={idx} {...tile} />
          ))}
        </BentoGrid>
      </Container>
    </section>
  );
};
