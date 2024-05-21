import i18next from 'i18next';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { ReactNode } from 'react';

import clsxm from '@/lib/clsxm';

import { Container } from '@/components/layout';
import Globe from '@/components/templates/Globe';
import Marquee from '@/components/templates/Marquee';
import { Body, Title } from '@/components/ui/Typography';

import bentoGridImg5 from '/public/images/home/bento-grid/bento-grid_high-speed.png';
import bentoGridImg1 from '/public/images/home/bento-grid/bento-grid_keydot.jpg';
import bentoGridImg2 from '/public/images/home/bento-grid/bento-grid_nouvag.png';
import sterilisationskorb from '/public/images/home/bento-grid/Sterilisationskorb-Neuro-Kanuelen.jpg';

const files = [
  {
    name: 'EN ISO',
    body: 'Bitcoin is a cryptocurrency invented in 2008 by an unknown person or group of people using the name Satoshi Nakamoto.',
  },
  {
    name: '13485:2016',
    body: 'A blockchain is a growing list of records, called blocks, that are linked using cryptography.',
  },
  {
    name: 'AC:2018',
    body: 'A spreadsheet or worksheet is a file made of rows and columns that help sort data, arrange data easily, and calculate numerical data.',
  },
  {
    name: 'A11:2021',
    body: 'Scalable Vector Graphics is an Extensible Markup Language-based vector image format for two-dimensional graphics with support for interactivity and animation.',
  },
  {
    name: 'Infekt.schutz',
    body: 'GPG keys are used to encrypt and decrypt email, files, directories, and whole disk partitions and to authenticate messages.',
  },
  {
    name: 'Seed Phrase',
    body: 'A seed phrase, seed recovery phrase or backup seed phrase is a list of words which store all the information needed to recover Bitcoin funds on-chain.',
  },
];

const tiles = [
  {
    name: 'Downloads & Zertifikate',
    description:
      'Unser Unternehmen legt größten Wert auf Qualität, Sicherheit und Zuverlässigkeit.',
    className: 'col-span-3 lg:col-span-1',
    href: '/contact',
    background: (
      <Marquee
        pauseOnHover
        className='absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] '
      >
        {files.map((f, idx) => (
          <figure
            key={idx}
            className={clsxm(
              'relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4',
              'border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]',
              'blur-[1px] transition-all duration-300 ease-out hover:blur-none',
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
    name: 'Aufbereitung & Reparatur',
    description:
      'Von der gewöhnlichen OP-Schere bis hin zur bipolare Koagulationszange, wir reparieren alles.',
    className: 'col-span-3 lg:col-span-1',
    href: '/contact',
    background: (
      <div className='absolute right-0 h-full w-64'>
        <Image
          src={bentoGridImg1.src}
          alt='Keydot'
          priority
          className='h-full w-full object-cover'
          quality={65}
          width={800}
          height={800}
        />
      </div>
    ),
  },
  {
    name: 'Nouvag',
    description: 'Nouvag is a medical technology company.',
    className: 'col-span-3 lg:col-span-1',
    background: (
      <div className='absolute h-full w-full'>
        <Image
          src={sterilisationskorb.src}
          alt='Keydot'
          priority
          className='relative -top-8 block h-full w-full object-cover'
          quality={65}
          width={800}
          height={800}
        />
      </div>
    ),
  },
  {
    name: 'IS8 Zertifizierung & Spezifikation',
    description: 'Wir sind zertifiziert nach EN ISO 13485:2016.',
    className: 'col-span-3 lg:col-span-1',
    background: (
      <div className='group absolute mx-auto h-full w-full pt-10 text-center'>
        <h5 className='text-black/60'>
          {i18next.t('home:content.bentoGrid.tiles.boxIso.textAccent')}
        </h5>
        <h1 className='inline-block text-[8rem] font-thin text-gray-300'>
          {i18next.t('home:content.bentoGrid.tiles.boxIso.textAccent')} ISO8
        </h1>
        <h5 className='text-gray-300'>
          {i18next.t('home:content.bentoGrid.tiles.boxIso.textBottom')}{' '}
          Spezifikation
        </h5>
      </div>
    ),
  },
  {
    name: 'Distribution und Handel von Medizinprodukten',
    description: 'We automatically save your files as you type.',
    href: '/contact',
    cta: 'Learn more',
    className: 'col-span-3 lg:col-span-2',
    background: (
      <Globe className='top-0 h-[600px] w-[600px] opacity-40 grayscale transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_30%,#000_100%)] group-hover:scale-105 sm:left-40' />
    ),
  },
  {
    name: 'Vario Medium 300 Sterilisationskorb',
    description: 'Nouvag is a medical technology company.',
    className: 'col-span-3 lg:col-span-2',
    background: (
      <div className='absolute -right-12 h-full w-[80%]'>
        <Image
          src={bentoGridImg2.src}
          alt='Keydot'
          priority
          className='h-full w-full object-cover'
          quality={65}
          width={800}
          height={800}
        />
      </div>
    ),
  },
  {
    name: 'High-Speed Handstück',
    description: 'Nouvag is a medical technology company.',
    className: 'col-span-3 lg:col-span-1',
    textIsWhite: true,
    background: (
      <div className='absolute h-full w-full'>
        <Image
          src={bentoGridImg5.src}
          alt='Keydot'
          priority
          className='h-full w-full object-cover'
          quality={65}
          width={800}
          height={800}
        />
      </div>
    ),
  },
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
  return (
    <>
      <div
        key={name}
        className={clsxm(
          'group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-3xl',
          // light styles
          'border border-solid border-gray-200 bg-white',
          className,
        )}
      >
        <div>{background}</div>
        <div className='pointer-events-none z-10 flex flex-col p-6 transition-all duration-300'>
          <Title
            size='five'
            margin={false}
            className={clsxm(textIsWhite ? 'text-white' : 'text-black')}
          >
            {name}
          </Title>
          <Body
            margin={false}
            size='sm'
            className={clsxm(
              'max-w-lg',
              textIsWhite ? 'text-white/60' : 'text-neutral-400',
            )}
          >
            {description}
          </Body>
        </div>
        <div className='pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03]' />
      </div>
    </>
  );
};

export const BentoSection = () => {
  return (
    <section className='border-t border-gray-100 py-16 md:py-24 lg:py-32'>
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
