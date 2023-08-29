import { useTranslation } from 'next-i18next';

import { Container } from '@/components/layout/Container';
import Button from '@/components/ui/buttons/Button';

export const CallToAction = () => {
  const { t } = useTranslation('cta');
  return (
    <>
      <section className='bg-primary-500 overflow-hidden py-12 lg:py-32'>
        <Container>
          <div className='relative overflow-hidden'>
            <div className='relative'>
              <h2 className='font-heading mb-2 text-4xl tracking-tighter text-white lg:text-6xl'>
                {t('headline')}
              </h2>
              <h2 className='font-heading mb-8 text-4xl tracking-tighter text-white/50 lg:text-6xl'>
                {t('subline')}
              </h2>
              <Button
                size='lg'
                className='mb-32 block'
                variant='light'
                isDarkBg
              >
                {t('buttonText')}
              </Button>
              <ul className='-m-4 flex flex-wrap'>
                {/*
                // TODO: Add bullets
                {t('bullets', { returnObjects: true })?.map(
                  (
                    bullet: {
                      title: string;
                    },
                    index: Key
                  ) => (
                    <li key={index} className='p-4'>
                      <div className='flex flex-wrap'>
                        <TickIcon />
                        <span className='tracking-tight text-white'>
                          {bullet.title}
                        </span>
                      </div>
                    </li>
                  )
                )}
                */}
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

// eslint-disable-next-line unused-imports/no-unused-vars
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
