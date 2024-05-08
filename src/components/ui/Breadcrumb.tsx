'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'next-i18next';
import React, { ReactNode } from 'react';

type TBreadCrumbProps = {
  homeElement: ReactNode;
  separator: ReactNode;
  containerClasses?: string;
  listClasses?: string;
  activeClasses?: string;
  capitalizeLinks?: boolean;
  className?: string;
};

const NextBreadcrumb = ({
  // eslint-disable-next-line unused-imports/no-unused-vars
  homeElement,
  separator,
  containerClasses,
  listClasses,
  activeClasses,
  capitalizeLinks,
  className,
}: TBreadCrumbProps) => {
  const { t } = useTranslation('common');
  const paths = usePathname();
  const pathNames = paths.split('/').filter((path) => path);

  return (
    <div className={clsx('flex', className)}>
      <ul className={containerClasses}>
        <li className={listClasses}>
          <Link href='/'>{t('breadcrumb.home')}</Link>
        </li>
        {pathNames.length > 0 && separator}
        {pathNames.map((link, index) => {
          const href = `/${pathNames.slice(0, index + 1).join('/')}`;
          const itemClasses =
            paths === href ? `${listClasses} ${activeClasses}` : listClasses;
          const itemLink = capitalizeLinks
            ? link[0].toUpperCase() + link.slice(1, link.length)
            : link;
          return (
            <React.Fragment key={index}>
              <li className={itemClasses}>
                <Link className='line-clamp-1' href={href}>
                  {itemLink}
                </Link>
              </li>
              {pathNames.length !== index + 1 && separator}
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default NextBreadcrumb;
