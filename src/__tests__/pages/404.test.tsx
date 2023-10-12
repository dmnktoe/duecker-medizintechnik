jest.mock('@/lib/fetch-api', () => ({
  fetchAPI: () =>
    Promise.resolve({
      data: [{ id: 1, attributes: { slug: 'test', title: 'Test' } }],
    }),
}));

import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import NotFoundPage from '@/pages/404';
import initializeI18n from '@/utils/i18n-testing';

describe('404', () => {
  beforeEach(async () => {
    await initializeI18n(['common', 'notFound']);
    await act(async () => render(<NotFoundPage />));
  });
  it('should render 404 heading', async () => {
    expect(await screen.findByText('Seite nicht gefunden')).toBeInTheDocument();
  });
});
