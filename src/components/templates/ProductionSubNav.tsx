import { usePathname } from 'next/navigation';
import * as React from 'react';

import clsxm from '@/lib/clsxm';

import { Container } from '@/components/layout';
import { UnderlineLink } from '@/components/ui';

export default function ProductionSubNav() {
  const currentRoute = usePathname();
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
                Übersicht
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
                Produktübersicht
              </UnderlineLink>
            </li>
          </ul>
        </nav>
      </Container>
    </div>
  );
}
