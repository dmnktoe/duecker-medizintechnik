type Translations = Record<string, Record<string, unknown>>;

export async function loadTranslations(
  locale: string,
  namespaces: readonly string[],
): Promise<Translations> {
  const result: Translations = {};
  await Promise.all(
    namespaces.map(async (ns) => {
      try {
        result[ns] = (
          await import(`../../public/locales/${locale}/${ns}.json`)
        ).default;
      } catch {
        result[ns] = {};
      }
    }),
  );
  return result;
}

export async function getTranslation(locale: string, namespace: string) {
  let translations: Record<string, unknown> = {};
  try {
    translations = (
      await import(`../../public/locales/${locale}/${namespace}.json`)
    ).default;
  } catch {
    /* namespace not found, return empty */
  }

  const t = (key: string): string => {
    const parts = key.split('.');
    let current: unknown = translations;
    for (const part of parts) {
      if (typeof current !== 'object' || current === null) return key;
      current = (current as Record<string, unknown>)[part];
    }
    return typeof current === 'string' ? current : key;
  };

  return { t };
}
