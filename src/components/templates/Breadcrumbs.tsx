'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import React from 'react';
import { VscChevronRight } from 'react-icons/vsc';

import { UnderlineLink } from '@/components/ui';

import { i18nConfig } from '@/i18n/settings';

export default function Breadcrumbs({ className }: { className?: string }) {
  const pathname = usePathname();
  const t = useTranslations('common');

  // Strip locale prefix to get meaningful path segments
  const segments = (pathname ?? '').split('/').filter(Boolean);
  const hasLocale = i18nConfig.locales.some((l) => l === segments[0]);
  const locale = hasLocale ? segments[0] : i18nConfig.defaultLocale;
  const pathSegments = hasLocale ? segments.slice(1) : segments;

  return (
    <div className={clsx('mb-4', className)}>
      <ul className={clsx('flex')}>
        <li className='flex items-center'>
          <UnderlineLink underline='hover' href={`/${locale}`}>
            {t('breadcrumbs.startseite')}
          </UnderlineLink>
          {pathSegments.length > 0 && (
            <VscChevronRight className='mx-1 h-5 w-3 md:h-6 md:w-3 lg:mx-2 lg:h-6 lg:w-4' />
          )}
        </li>

        {pathSegments.map((segment, i) => {
          const breadcrumbUrl = `/${locale}/${pathSegments.slice(0, i + 1).join('/')}`;
          const isLast = i === pathSegments.length - 1;

          return (
            <React.Fragment key={breadcrumbUrl}>
              {isLast ? (
                <li className='text-primary-500'>
                  {t(('breadcrumbs.' + segment) as never)}
                </li>
              ) : (
                <li className='flex items-center'>
                  <UnderlineLink underline='hover' href={breadcrumbUrl}>
                    {t(('breadcrumbs.' + segment) as never)}
                  </UnderlineLink>
                  <VscChevronRight className='mx-1 h-5 w-3 md:h-6 md:w-3 lg:mx-2 lg:h-6 lg:w-4' />
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
}
