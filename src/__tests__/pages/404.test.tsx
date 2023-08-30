import { render, screen } from '@testing-library/react';

import NotFoundPage from '@/pages/404';
import initializeI18n from '@/utils/i18n-testing';

describe('404', () => {
  beforeEach(async () => {
    await initializeI18n(['notFound']);
    render(<NotFoundPage />);
  });
  it('should render 404 heading', async () => {
    expect(await screen.findByText('Seite nicht gefunden')).toBeInTheDocument();
  });
});
