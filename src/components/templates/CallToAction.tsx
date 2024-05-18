import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Key } from 'react';

import clsxm from '@/lib/clsxm';

import { Container } from '@/components/layout/Container';
import Globe from '@/components/templates/Globe';
import Button from '@/components/ui/Buttons/Button';
import { CheckIcon } from '@/components/ui/Icons';
import { Title } from '@/components/ui/Typography/Title';

export const CallToAction = () => {
  const { t, ready } = useTranslation('common', { useSuspense: false });
  const router = useRouter();

  function handleCtaButtonClick() {
    router.push('/kontakt').then((r) => r);
  }

  const CallToActionTitle = () => {
    return (
      <>
        <Title className='mb-0 text-white' renderAs='h3' margin={false}>
          {t('cta.title')}
        </Title>
        <Title className='mb-8 text-white/50' renderAs='h4' margin={false}>
          {t('cta.titleSub')}
        </Title>
        <Button
          className='pointer-events-auto mb-32 flex flex-shrink p-4 lg:p-6'
          variant='light'
          isDarkBg
          onClick={() => handleCtaButtonClick()}
        >
          {t('cta.buttonText')}
        </Button>
      </>
    );
  };

  const CallToActionBullets = () => {
    return (
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
                  <CheckIcon color='white' className='mr-3' />
                  <span className='font-medium tracking-tight text-white'>
                    {bullet.title}
                  </span>
                </div>
              </li>
            ),
          )}
      </ul>
    );
  };

  return (
    <>
      <section
        className={clsxm(
          'overflow-hidden py-16 md:py-24 lg:py-32',
          'bg-gradient-to-tr from-primary-400 to-primary-600',
          'relative',
        )}
      >
        <Container>
          <div className='pointer-events-none relative z-30 2xl:max-w-3xl'>
            <CallToActionTitle />
            <CallToActionBullets />
          </div>
        </Container>
        <Globe className='-right-48 top-0 z-20 hidden opacity-40 md:block md:max-w-[750px] lg:-right-32 lg:max-w-[800px] 2xl:-right-32 2xl:max-w-[900px]' />
      </section>
    </>
  );
};
