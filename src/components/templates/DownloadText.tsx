import { useTranslation } from 'next-i18next';
import React from 'react';

import { Container } from '@/components/layout';
import { Body, Title } from '@/components/ui/Typography';

export const DownloadText = () => {
  const { t } = useTranslation('downloads');
  return (
    <section className='mx-auto mb-12 max-w-5xl'>
      <Container>
        <div className='flex flex-col'>
          <div>
            <Title>{t('content.title')}</Title>
            <Body>{t('content.text.intro')}</Body>
          </div>
          <div>
            <Title renderAs='h3' size='five'>
              {t('content.text.section.one.title')}
            </Title>
            <Body>{t('content.text.section.one.text')}</Body>
          </div>
          <div>
            <Title renderAs='h3' size='five'>
              {t('content.text.section.two.title')}
            </Title>
            <Body margin={false}>{t('content.text.section.two.text')}</Body>
          </div>
        </div>
      </Container>
    </section>
  );
};
