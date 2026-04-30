'use client';

import clsx from 'clsx';
import { useFlags } from 'flagsmith/react';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';
import { useId } from 'react';
import { VscChevronDown } from 'react-icons/vsc';

import { i18nConfig } from '@/i18n/settings';

type Variant = 'default' | 'field';

type Props = {
  className?: string;
  showDisplayName?: boolean;
  /** If set, used instead of an auto-generated id (for <label htmlFor> pairing). */
  id?: string;
  name?: string;
  /** Accessible name for the select. */
  ariaLabel?: string;
  /** "field" = bordered control (header bar); "default" = text link style. */
  variant?: Variant;
};

const LanguagePicker = ({
  className,
  showDisplayName,
  id: idProp,
  name = 'languages',
  ariaLabel,
  variant = 'default',
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

  const selectClassName = clsx(
    'text-dark w-full min-w-0 max-w-full cursor-pointer outline-none',
    variant === 'default' &&
      'text-sm transition md:text-base rounded-sm bg-transparent hover:underline focus-visible:ring-2 focus-visible:ring-primary-500/30 focus-visible:ring-offset-2',
    variant === 'field' && [
      'appearance-none text-sm font-medium',
      'h-8 pl-2.5 pr-8',
      'rounded-md border border-gray-200/90 bg-white',
      'text-left shadow-sm',
      'hover:border-primary-500/30 hover:bg-gray-50/80',
      'focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20',
    ],
    className,
  );

  const select = (
    <select
      className={selectClassName}
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

  if (variant === 'field') {
    return (
      <div className='inline-flex w-full min-w-0 max-w-full'>
        <div className='relative w-full'>
          {select}
          <VscChevronDown
            className='text-light-gray/80 pointer-events-none absolute top-1/2 right-2.5 h-3.5 w-3.5 -translate-y-1/2'
            aria-hidden
          />
        </div>
      </div>
    );
  }

  return select;
};

export default LanguagePicker;
