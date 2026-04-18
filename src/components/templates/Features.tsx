'use client';

import { useTranslations } from 'next-intl';
import { VscArrowRight } from 'react-icons/vsc';

import { Container } from '@/components/layout/Container';
import { Body, ButtonLink, Title } from '@/components/ui';

const TextBlockElement = ({
  index,
  title,
  content,
}: {
  index: number;
  title: string;
  content: string;
}) => (
  <div className='flex flex-col gap-3 border-t-2 border-primary-500 bg-gray-50 p-6 transition-colors duration-200 hover:bg-primary-50/50'>
    <span className='font-secondary text-xs tracking-widest text-primary-400'>
      {String(index + 1).padStart(2, '0')}
    </span>
    <Title margin={false} size='five' renderAs='h3'>
      {title}
    </Title>
    <Body margin={false} color='light' size='sm'>
      {content}
    </Body>
  </div>
);

export const Features = () => {
  const t = useTranslations('home');
  const blocks = t.raw('content.features.textBlocks') as {
    title: string;
    content: string;
  }[];

  return (
    <section className='py-16 md:py-24 lg:py-32'>
      <Container>
        <div className='mb-8'>
          <Title renderAs='h2' className='md:-mb-2' margin={false}>
            {t('content.features.title')}
          </Title>
          <Title renderAs='h2' className='text-gray-400' margin={false}>
            {t('content.features.titleTwo')}
          </Title>
        </div>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {blocks.map((item, index) => (
            <TextBlockElement
              key={item.title}
              index={index}
              title={item.title}
              content={item.content}
            />
          ))}
        </div>
        <hr className='my-8' />
        <div className='flex justify-end'>
          <ButtonLink href='/leistungen' variant='dark' size='sm'>
            {t('content.features.button')}
            <span aria-hidden='true' className='ml-2'>
              <VscArrowRight />
            </span>
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
};
