import { useTranslation } from 'next-i18next';

import { Body, Title } from '@/components/ui/Typography';

export const DownloadText = () => {
  const { t } = useTranslation('downloads');
  return (
    <div className='flex flex-col gap-6'>
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
        <Body>{t('content.text.section.two.text')}</Body>
      </div>
    </div>
  );
};
