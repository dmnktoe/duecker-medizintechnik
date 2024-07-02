import { fireEvent, render } from '@testing-library/react';
import { useRouter } from 'next/router';

import LanguagePicker from '@/components/templates/LanguagePicker';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('next-i18next', () => ({
  i18n: { language: 'de' },
}));

jest.mock('flagsmith/react', () => ({
  useFlags: () => ({ language_picker: { enabled: true } }),
}));

describe('LanguagePicker', () => {
  it('should render correctly and respond to user interaction', () => {
    const mockRouter = {
      push: jest.fn(),
      asPath: '/en',
      locale: 'en',
      isReady: true,
    };

    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    const { getByRole } = render(<LanguagePicker />);

    const select = getByRole('combobox');
    expect(select).toBeInTheDocument();

    fireEvent.change(select, { target: { value: 'en' } });

    expect(mockRouter.push).toHaveBeenCalledWith('/en', '/en', {
      locale: false,
    });
  });
});
