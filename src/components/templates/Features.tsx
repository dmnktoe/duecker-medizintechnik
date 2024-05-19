import { useTranslation } from 'next-i18next';

import { Container } from '@/components/layout/Container';
import { CheckIcon } from '@/components/ui/Icons';
import { Body, Title } from '@/components/ui/Typography';

const TextBlocks = () => {
  const { t, ready } = useTranslation('home', { useSuspense: false });
  return (
    <>
      <Container>
        <div className='grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-4'>
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
  <div className='w-full md:border md:border-solid md:border-gray-100'>
    <div className='md:max-w-sm'>
      <div className='flex flex-wrap'>
        <div className='flex-1 md:p-6'>
          <div className='mb-6 hidden w-auto md:block'>
            <CheckIcon />
          </div>
          <Title size='four' renderAs='h5'>
            {title}
          </Title>
          <Body>{content}</Body>
        </div>
      </div>
    </div>
  </div>
);

export const Features = () => {
  const { t } = useTranslation('home');
  return (
    <>
      <section className='py-16 md:py-24 lg:py-32'>
        <Container>
          <div className='mb-8'>
            <Title renderAs='h2' className='md:-mb-2' margin={false}>
              {t('content.features.title')}
            </Title>
            <Title renderAs='h2' className='text-gray-500'>
              {t('content.features.titleTwo')}
            </Title>
          </div>
        </Container>
        <TextBlocks />
      </section>
    </>
  );
};
