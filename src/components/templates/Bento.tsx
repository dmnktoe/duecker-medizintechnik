'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ReactNode, useLayoutEffect, useMemo, useState } from 'react';

import clsxm from '@/lib/clsxm';

import { Container } from '@/components/layout';
import { DISTRIBUTION_GLOBE_CONFIG } from '@/components/templates/distributionGlobeConfig';
import Globe, { type GlobeAnchorLabel } from '@/components/templates/Globe';
import Marquee from '@/components/templates/Marquee';
import { Body, Title, UnstyledLink } from '@/components/ui';

import bentoGridImg2 from '~/images/home/bento-grid/bento-grid_customer-standards.webp';
import bentoGridImg1 from '~/images/home/bento-grid/bento-grid_internal-repair.webp';

const GLOBE_CORNER_BADGE_KEYS = ['logistics', 'partners', 'quality'] as const;

function DistributionBentoGlobe({ className }: { className?: string }) {
  const t = useTranslations('home');
  const [cssAnchorsSupported, setCssAnchorsSupported] = useState<
    boolean | null
  >(null);

  useLayoutEffect(() => {
    setCssAnchorsSupported(
      typeof CSS !== 'undefined' &&
        typeof CSS.supports === 'function' &&
        CSS.supports('position-anchor', '--cobe'),
    );
  }, []);

  const anchorLabels = useMemo<GlobeAnchorLabel[]>(
    () => [
      {
        markerId: 'melsungen',
        children: t(
          'content.bentoGrid.tiles.distribution.globeBadges.melsungen' as Parameters<
            typeof t
          >[0],
        ),
      },
    ],
    [t],
  );

  const cornerBadgeKeys = useMemo(() => {
    if (cssAnchorsSupported !== false) return [...GLOBE_CORNER_BADGE_KEYS];
    return ['melsungen', ...GLOBE_CORNER_BADGE_KEYS] as const;
  }, [cssAnchorsSupported]);

  return (
    <div className='absolute inset-0 h-full w-full'>
      <Globe
        className={className}
        config={DISTRIBUTION_GLOBE_CONFIG}
        anchorLabels={cssAnchorsSupported === false ? undefined : anchorLabels}
      />
      <div className='pointer-events-none absolute top-3 right-3 z-20 flex max-w-[min(100%,15rem)] flex-col items-end gap-1.5 sm:top-5 sm:right-5 sm:gap-2'>
        {cornerBadgeKeys.map((key) => (
          <span
            key={key}
            className={clsxm(
              'border-primary-300/30 bg-primary-950/35 text-primary-50 inline-flex max-w-full rounded-full border px-2.5 py-1 text-[10px] leading-tight font-medium shadow-sm backdrop-blur-md sm:px-3 sm:text-xs',
              key === 'melsungen' &&
                'border-white/35 bg-white/15 font-semibold ring-1 ring-white/45',
            )}
          >
            {t(
              `content.bentoGrid.tiles.distribution.globeBadges.${key}` as Parameters<
                typeof t
              >[0],
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

const files = [
  {
    name: '13485',
    body: 'ISO 13485, a standard for quality management systems specific to the medical devices industry.',
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
    href: '/leistungen/produktion',
    background: (
      <div className='absolute h-full w-full'>
        <Image
          src={bentoGridImg2.src}
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
    name: 'content.bentoGrid.tiles.repair.title',
    description: 'content.bentoGrid.tiles.repair.description',
    className: 'col-span-3 lg:col-span-1',
    href: '/leistungen/reparatur',
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
    href: '/downloads',
    background: (
      <Marquee
        pauseOnHover
        className='absolute top-10 [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] [--duration:20s]'
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
    name: 'content.bentoGrid.tiles.distribution.title',
    description: 'content.bentoGrid.tiles.distribution.description',
    href: '/leistungen/vertrieb',
    className:
      'col-span-3 lg:col-span-2 from-dark to-primary-800 bg-gradient-to-br',
    textIsWhite: true,
    background: (
      <DistributionBentoGlobe className='pointer-events-none top-0 h-[600px] w-[600px] [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] opacity-90 transition-all duration-300 ease-out sm:left-40 xl:h-[800px] xl:w-[800px]' />
    ),
  },
];

const SectionTitle = () => {
  const t = useTranslations('home');
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
  href,
}: {
  name: string;
  className: string;
  background: ReactNode;
  description: string;
  textIsWhite?: boolean;
  href: string;
}) => (
  <UnstyledLink
    href={href}
    className={clsxm(
      'group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-lg grayscale transition-all duration-300 ease-out hover:grayscale-0',
      textIsWhite
        ? 'bg-white'
        : 'hover:border-primary-300 border border-solid border-gray-200 bg-white',
      className,
    )}
  >
    <div>{background}</div>
    <div
      className={clsxm(
        'pointer-events-none z-10 flex flex-col p-4 transition-all duration-300',
        textIsWhite ? 'bg-dark/40' : 'bg-white/40',
      )}
    >
      <Title
        size='four'
        margin={false}
        className={clsxm(textIsWhite ? 'text-white' : 'text-dark', 'mb-1')}
      >
        {name}
      </Title>
      <Body
        margin={false}
        className={clsxm('max-w-lg', textIsWhite ? 'text-white' : 'text-dark')}
      >
        {description}
      </Body>
    </div>
    <div className='group-hover:bg-dark/[.02] pointer-events-none absolute inset-0 transform-gpu transition-all duration-300' />
  </UnstyledLink>
);

export const BentoSection = () => {
  const t = useTranslations('home');

  const resolvedTiles = tiles.map((tile) => ({
    ...tile,
    name: t(tile.name as Parameters<typeof t>[0]),
    description: t(tile.description as Parameters<typeof t>[0]),
  }));

  return (
    <section className='py-16 md:py-24 lg:py-32'>
      <Container>
        <SectionTitle />
        <BentoGrid>
          {resolvedTiles.map((tile, idx) => (
            <BentoCard key={idx} {...tile} />
          ))}
        </BentoGrid>
      </Container>
    </section>
  );
};
