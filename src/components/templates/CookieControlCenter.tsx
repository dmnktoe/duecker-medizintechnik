import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';
import * as React from 'react';

import { Container } from '@/components/layout';
import { Title } from '@/components/ui';

export default function CookieControlCenter() {
  const { t } = useTranslation('cookiePolicy');

  useEffect(() => {
    const cookieBotWrapper = document.getElementById('CookiebotDeclaration');
    if (!cookieBotWrapper || document.getElementById('CookieDeclaration')) {
      return;
    }

    const script = document.createElement('script');
    script.id = 'CookieDeclaration';
    script.type = 'text/javascript';
    script.async = true;
    script.src =
      'https://consent.cookiebot.com/3722981a-3eb0-4ff9-9145-777cf50e6875/cd.js';

    cookieBotWrapper.appendChild(script);

    return () => {
      document.getElementById('CookieDeclaration')?.remove();
    };
  }, []);

  return (
    <section className='mx-auto max-w-5xl pb-16 lg:pb-24'>
      <Container>
        <Title>{t('content.title')}</Title>
        <div id='CookiebotDeclaration' />
      </Container>
    </section>
  );
}
