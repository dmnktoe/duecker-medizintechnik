'use client';

import clsx from 'clsx';
import { useFlags } from 'flagsmith/react';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';
import { useId } from 'react';

import { i18nConfig } from '@/i18n/settings';

type Props = {
  className?: string;
  showDisplayName?: boolean;
  id?: string;
  name?: string;
  ariaLabel?: string;
};

const LanguagePicker = ({
  className,
  showDisplayName,
  id: idProp,
  name = 'languages',
  ariaLabel,
}: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const autoId = useId();
  const id = idProp ?? autoId;
  const flags = useFlags(['language_picker']);

  const segments = pathname.split('/').filter(Boolean);
  const currentLocale =
    i18nConfig.locales.find((l) => l === segments[0]) ??
    i18nConfig.defaultLocale;

  function handleLanguageChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newLocale = e.target.value;
    const pathSegments = pathname.split('/');
    pathSegments[1] = newLocale;
    router.push(pathSegments.join('/'));
  }

  if (!flags.language_picker.enabled) return null;

  return (
    <select
      className={clsx(
        'text-dark cursor-pointer bg-transparent text-sm font-medium',
        'w-auto min-w-0 max-w-none border-0 p-0',
        'shadow-none ring-0 outline-none',
        'decoration-inherit',
        'transition hover:underline',
        'focus-visible:ring-2 focus-visible:ring-primary-500/30 focus-visible:ring-offset-2',
        'md:text-base',
        className,
      )}
      name={name}
      id={id}
      aria-label={ariaLabel}
      onChange={handleLanguageChange}
      value={currentLocale}
    >
      {i18nConfig.locales.map((lang) => {
        const nameGenerator = new Intl.DisplayNames(lang, { type: 'language' });
        const displayName = nameGenerator.of(lang);
        return (
          <option key={lang} value={lang}>
            {lang.toUpperCase()} {showDisplayName && `(${displayName})`}
          </option>
        );
      })}
    </select>
  );
};

export default LanguagePicker;
