import { fireEvent, render } from '@testing-library/react';
import { usePathname, useRouter } from 'next/navigation';

import LanguagePicker from '@/components/templates/LanguagePicker';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

jest.mock('flagsmith/react', () => ({
  useFlags: () => ({ language_picker: { enabled: true } }),
}));

describe('LanguagePicker', () => {
  it('should render correctly and respond to user interaction', () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (usePathname as jest.Mock).mockReturnValue('/de/datenschutz');

    const { getByRole } = render(<LanguagePicker />);

    const select = getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect((select as HTMLSelectElement).value).toBe('de');

    fireEvent.change(select, { target: { value: 'en' } });

    expect(mockPush).toHaveBeenCalledWith('/en/datenschutz');
  });
});
