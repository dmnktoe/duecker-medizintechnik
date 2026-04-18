import createIntlWrapper from '@/lib/i18n-testing';

describe('createIntlWrapper', () => {
  it('should return a wrapper component for valid namespaces', async () => {
    const wrapper = await createIntlWrapper(['common'], 'de');
    expect(typeof wrapper).toBe('function');
  });

  it('should throw an error when namespace file does not exist', async () => {
    await expect(createIntlWrapper(['nonexistent'], 'en')).rejects.toThrow(
      'Could not load translations for locale: en, namespace: nonexistent',
    );
  });
});
