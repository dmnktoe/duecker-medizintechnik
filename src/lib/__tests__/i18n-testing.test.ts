import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import initializeI18n from '@/lib/i18n-testing';

jest.mock('i18next', () => ({
  use: jest.fn().mockReturnThis(),
  init: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  initReactI18next: jest.fn(),
}));

describe('initializeI18n', () => {
  it('should initialize i18n with correct parameters', async () => {
    const namespaces = ['common', 'home'];
    const locale = 'en';

    await initializeI18n(namespaces, locale);

    expect(i18n.use).toHaveBeenCalledWith(initReactI18next);
    expect(i18n.init).toHaveBeenCalledWith({
      lng: locale,
      fallbackLng: locale,
      debug: false,
      ns: namespaces,
      defaultNS: namespaces[0],
      resources: expect.any(Object),
      interpolation: { escapeValue: false },
    });
  });

  it('should throw an error when namespace file does not exist', async () => {
    const namespaces = ['nonexistent'];
    const locale = 'en';

    await expect(initializeI18n(namespaces, locale)).rejects.toThrow(
      'Could not load translations for locale: en, namespace: nonexistent',
    );
  });
});
