import { useTranslation } from 'next-i18next';
import { VscArrowRight } from 'react-icons/vsc';

import { Container } from '@/components/layout/Container';
import { Body, ButtonLink, Title } from '@/components/ui';
import { CheckIcon } from '@/components/ui/Icons';

const TextBlocks = () => {
  const { t, ready } = useTranslation('home', { useSuspense: false });
  return (
    <>
      <Container>
        <div className='grid grid-cols-1 gap-0 md:grid-cols-2 md:gap-8 md:py-8 lg:grid-cols-3 lg:gap-16'>
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
  <div className='w-full'>
    <div className='md:max-w-sm'>
      <div className='flex flex-wrap'>
        <div className='flex-1 py-4 md:py-8'>
          <div className='mb-2 flex items-center justify-start gap-2 md:mb-4'>
            <CheckIcon className='hidden h-3 w-3 md:block md:h-4 md:w-4' />
            <Title margin={false} size='five' renderAs='h5'>
              {title}
            </Title>
          </div>
          <Body margin={false}>{content}</Body>
        </div>
      </div>
    </div>
  </div>
);

export const Features = () => {
  const { t } = useTranslation('home');
  return (
    <>
      <section className='py-16 md:py-24 lg:py-32 2xl:px-16'>
        <Container>
          <div className='mb-8'>
            <Title renderAs='h2' className='md:-mb-2' margin={false}>
              {t('content.features.title')}
            </Title>
            <Title renderAs='h2' className='text-gray-500' margin={false}>
              {t('content.features.titleTwo')}
            </Title>
          </div>
          <hr />
        </Container>
        <TextBlocks />
        <Container>
          <hr className='mb-8' />
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
    </>
  );
};
