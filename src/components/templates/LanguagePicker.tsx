import clsx from 'clsx';
import { useRouter } from 'next/router';
import { i18n } from 'next-i18next';
import * as React from 'react';

import * as LOCALES from '../../../next-i18next.config';

type Props = {
  className?: string;
  showDisplayName?: boolean;
};

const LanguagePicker = ({ className, showDisplayName }: Props) => {
  const router = useRouter();

  function handleLanguageChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newLocale = e.target.value;
    const currentPath = router.asPath.includes(router.locale ?? '')
      ? router.asPath.replace(`/${router.locale}`, '')
      : router.asPath;
    const newPath =
      newLocale === 'de' ? currentPath : `/${newLocale}${currentPath}`;

    router.push(newPath, newPath, { locale: false });
  }

  return (
    <select
      className={clsx(className, 'bg-transparent text-sm md:text-base')}
      name='languages'
      id='languages'
      onChange={handleLanguageChange}
      value={LOCALES.i18n.locales.find((locale) => locale === i18n?.language)}
    >
      {LOCALES.i18n.locales.map((lang) => {
        const nameGenerator = new Intl.DisplayNames(lang, {
          type: 'language',
        });
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
