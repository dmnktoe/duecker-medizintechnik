import { useTranslation } from 'next-i18next';

import { Container } from '@/components/layout/Container';
import { Title } from '@/components/ui/Typography/Title';

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
          <p>{content}</p>
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
      </section>
    </>
  );
};
