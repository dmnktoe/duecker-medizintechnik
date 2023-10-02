import { useTranslation } from 'next-i18next';
import { Key } from 'react';

import { event } from '@/lib/helper';

import { Container } from '@/components/layout/Container';
import Button from '@/components/ui/buttons/Button';
import { Title } from '@/components/ui/typography/Title';

export const CallToAction = () => {
  const { t, ready } = useTranslation('common', { useSuspense: false });

  function handleCtaButtonClick() {
    if (process.env.NODE_ENV === 'production') {
      event({
        category: 'cta',
        action: 'click',
        label: 'cta button',
        value: 1,
      });
      window.location.href = '/kontakt';
      return;
    }
    window.location.href = '/kontakt';
  }
  return (
    <>
      <section className='overflow-hidden bg-gradient-to-tr from-primary-400 to-primary-600 py-16 md:py-24 lg:py-32'>
        <Container>
          <div className='relative overflow-hidden'>
            <div className='relative'>
              <Title
                className='mb-0 text-white'
                renderAs='h3'
                size='one'
                margin={false}
              >
                {t('cta.headline')}
              </Title>
              <Title
                className='mb-8 text-white/50'
                renderAs='h4'
                size='one'
                margin={false}
              >
                {t('cta.subline')}
              </Title>
              <Button
                className='mb-32 block p-4 lg:p-6'
                variant='light'
                isDarkBg
                onClick={() => handleCtaButtonClick()}
              >
                {t('cta.buttonText')}
              </Button>
              <ul className='-m-4 flex flex-wrap'>
                {ready &&
                  t('cta.bullets', { returnObjects: true }).map(
                    (
                      bullet: {
                        title: string;
                      },
                      index: Key,
                    ) => (
                      <li key={index} className='p-4'>
                        <div className='flex flex-wrap'>
                          <TickIcon />
                          <span className='font-semibold tracking-tight text-white'>
                            {bullet.title}
                          </span>
                        </div>
                      </li>
                    ),
                  )}
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

const TickIcon = () => (
  <svg
    className='mr-3 h-[20px] w-[20px] md:h-[26px] md:w-[26px]'
    width={26}
    height={26}
    viewBox='0 0 26 26'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M9.25 13L11.75 15.5L16.75 10.5M24.25 13C24.25 19.2132 19.2132 24.25 13 24.25C6.7868 24.25 1.75 19.2132 1.75 13C1.75 6.7868 6.7868 1.75 13 1.75C19.2132 1.75 24.25 6.7868 24.25 13Z'
      stroke='white'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
