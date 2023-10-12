import clsx from 'clsx';
import { useRouter } from 'next/router';
import { i18n } from 'next-i18next';
import * as React from 'react';

import * as LOCALES from '../../../next-i18next.config';

type Props = {
  className?: string;
};

const LanguagePicker = ({ className }: Props) => {
  const router = useRouter();

  if (!router.isReady) {
    return null;
  }

  function handleLanguageChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newLocale = e.target.value;
    const currentPath = router.asPath.includes(router.locale ?? '')
      ? router.asPath.split(`/${router.locale}`)[1]
      : router.asPath;
    const newPath =
      newLocale === 'de' ? currentPath : `/${newLocale}${currentPath}`;

    router.push(newPath, newPath, { locale: false });
  }

  return (
    <>
      <select
        className={clsx(className)}
        name=''
        id=''
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
              {displayName}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default LanguagePicker;
