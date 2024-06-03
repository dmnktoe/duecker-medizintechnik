import { usePathname } from 'next/navigation';
import { useTranslation } from 'next-i18next';
import * as React from 'react';

import clsxm from '@/lib/clsxm';

import { Container } from '@/components/layout';
import UnderlineLink from '@/components/ui/Links/UnderlineLink';

export default function ProductionSubNav() {
  const currentRoute = usePathname();
  const { t } = useTranslation('production');
  return (
    <div className='sub-navigation sticky top-[var(--navigation-height)] z-40 mb-12 bg-white/90 backdrop-blur-lg'>
      <Container>
        <nav className='flex items-center justify-between py-4'>
          <ul className='flex gap-4'>
            <li>
              <UnderlineLink
                underline='hover'
                href='/leistungen/produktion'
                className={clsxm(
                  'hover:underline',
                  currentRoute === '/leistungen/produktion' && 'underline',
                )}
              >
                {t('content.subNav.main')}
              </UnderlineLink>
            </li>
            <li>
              <UnderlineLink
                underline='hover'
                href='/leistungen/produktion/uebersicht'
                className={clsxm(
                  'hover:underline',
                  currentRoute === '/leistungen/produktion/uebersicht' &&
                    'underline',
                )}
              >
                {t('content.subNav.productOverview')}
              </UnderlineLink>
            </li>
          </ul>
        </nav>
      </Container>
    </div>
  );
}
