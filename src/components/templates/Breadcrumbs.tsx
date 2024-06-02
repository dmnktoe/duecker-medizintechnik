import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { VscArrowRight } from 'react-icons/vsc';

import UnderlineLink from '@/components/ui/Links/UnderlineLink';

export default function Breadcrumbs({ className }: { className?: string }) {
  const router = useRouter();
  const { t } = useTranslation('common');

  // Split the current path into segments
  const pathSegments = router.pathname.split('/').filter((p) => p);

  return (
    <div className={clsx('mb-6', className)}>
      <ul className={clsx('flex')}>
        {/* Always include a link to home */}
        <li>
          <UnderlineLink underline='hover' href='/'>
            {t('breadcrumbs.home')}
          </UnderlineLink>
        </li>
        {pathSegments.length > 0 && (
          <VscArrowRight className='mx-2 h-5 w-3 md:h-6 md:w-3 lg:h-6 lg:w-4' />
        )}

        {/* Generate breadcrumb segments */}
        {pathSegments.map((segment, i) => {
          // Construct the URL for this breadcrumb segment
          const breadcrumbUrl = `/${pathSegments.slice(0, i + 1).join('/')}`;

          return (
            <React.Fragment key={breadcrumbUrl}>
              {/* Don't link the current page */}
              {breadcrumbUrl === router.pathname ? (
                <li className='text-primary-500'>
                  {t(('breadcrumbs.' + segment) as never)}
                </li>
              ) : (
                <li>
                  <UnderlineLink underline='hover' href={breadcrumbUrl}>
                    {t(('breadcrumbs.' + segment) as never)}
                  </UnderlineLink>
                </li>
              )}
              {i < pathSegments.length - 1 && (
                <VscArrowRight className='mx-2 h-5 w-3 md:h-6 md:w-3 lg:h-6 lg:w-4' />
              )}
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
}
