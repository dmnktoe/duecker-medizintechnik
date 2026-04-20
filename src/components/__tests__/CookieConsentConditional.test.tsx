/* eslint-disable @typescript-eslint/no-explicit-any */

jest.mock('cobe', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('next/script', () => ({
  __esModule: true,
  default: function MockScript({
    id,
    src,
    dangerouslySetInnerHTML,
    ...rest
  }: {
    id?: string;
    src?: string;
    dangerouslySetInnerHTML?: { __html: string };
    [key: string]: unknown;
  }) {
    if (src) {
      /* eslint-disable-next-line @next/next/no-sync-scripts -- test double for next/script */
      return <script id={id} src={src} {...rest} />;
    }
    return (
      /* eslint-disable-next-line @next/next/no-sync-scripts -- test double for next/script */
      <script
        id={id}
        dangerouslySetInnerHTML={dangerouslySetInnerHTML}
        {...rest}
      />
    );
  },
}));

jest.mock('next/navigation', () => ({
  usePathname: () => '/de/kontakt',
}));

const consentFlags = {
  measurement: false,
  marketing: false,
};

const mockHas = jest.fn((category: string) => {
  if (category === 'measurement') return consentFlags.measurement;
  if (category === 'marketing') return consentFlags.marketing;
  return false;
});

const mockSetSelectedConsent = jest.fn();
const mockSaveConsents = jest.fn();
const mockSetActiveUI = jest.fn();

jest.mock('@c15t/nextjs', () => ({
  useConsentManager: () => ({
    has: mockHas,
    setSelectedConsent: mockSetSelectedConsent,
    saveConsents: mockSaveConsents,
    setActiveUI: mockSetActiveUI,
    consents: { necessary: true, measurement: false, marketing: false },
    getDisplayedConsents: () => [
      { name: 'necessary', disabled: true },
      { name: 'measurement', disabled: false },
      { name: 'marketing', disabled: false },
    ],
    selectedConsents: {},
  }),
}));

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React, { act } from 'react';

import createIntlWrapper from '@/lib/i18n-testing';

import GoogleAnalytics from '@/components/helpers/GoogleAnalytics';
import Hotjar from '@/components/helpers/Hotjar';
import { ContactMap } from '@/components/templates/ContactMap';
import ContactView from '@/components/templates/ContactView';

describe('Cookie / consent conditional renders', () => {
  beforeEach(() => {
    consentFlags.measurement = false;
    consentFlags.marketing = false;
    jest.clearAllMocks();
    document.querySelectorAll('script').forEach((el) => el.remove());
  });

  describe('GoogleAnalytics', () => {
    it('renders nothing without measurement consent', () => {
      consentFlags.measurement = false;
      const { container } = render(
        <GoogleAnalytics GA_MEASUREMENT_ID='GA_X' />,
      );
      expect(container.querySelectorAll('script')).toHaveLength(0);
    });

    it('renders nothing when GA_MEASUREMENT_ID is missing', () => {
      consentFlags.measurement = true;
      const { container } = render(
        <GoogleAnalytics GA_MEASUREMENT_ID={undefined} />,
      );
      expect(container.querySelectorAll('script')).toHaveLength(0);
    });

    it('renders gtag scripts when id is set and measurement consent is granted', () => {
      consentFlags.measurement = true;
      render(<GoogleAnalytics GA_MEASUREMENT_ID='GA_TEST' />);
      const scripts = document.querySelectorAll('script');
      expect(scripts.length).toBeGreaterThanOrEqual(2);
      expect(scripts[0].getAttribute('src')).toContain('googletagmanager.com');
      expect(scripts[0].getAttribute('src')).toContain('GA_TEST');
    });
  });

  describe('Hotjar', () => {
    it('renders nothing without measurement consent', () => {
      consentFlags.measurement = false;
      const { container } = render(<Hotjar HOTJAR_ID='HJ_1' />);
      expect(container.querySelector('#hotjar')).toBeNull();
    });

    it('renders nothing when HOTJAR_ID is missing', () => {
      consentFlags.measurement = true;
      const { container } = render(<Hotjar HOTJAR_ID={undefined} />);
      expect(container.querySelector('#hotjar')).toBeNull();
    });

    it('renders Hotjar snippet when id is set and measurement consent is granted', () => {
      consentFlags.measurement = true;
      render(<Hotjar HOTJAR_ID='HJ_TEST' />);
      const el = document.getElementById('hotjar');
      expect(el).not.toBeNull();
      expect(el?.innerHTML).toContain('HJ_TEST');
    });

    it('removes Hotjar script when measurement consent is withdrawn after mount', async () => {
      consentFlags.measurement = true;
      const { rerender } = render(<Hotjar HOTJAR_ID='HJ_OPT' />);
      expect(document.getElementById('hotjar')).not.toBeNull();

      consentFlags.measurement = false;
      await act(async () => {
        rerender(<Hotjar HOTJAR_ID='HJ_OPT' />);
      });

      await waitFor(() => {
        expect(document.getElementById('hotjar')).toBeNull();
      });
    });
  });

  describe('ContactView (marketing-gated contact form)', () => {
    let wrapper: React.ComponentType<{ children: React.ReactNode }>;

    beforeEach(async () => {
      wrapper = await createIntlWrapper(['common', 'contact']);
    });

    it('shows reCAPTCHA cookie notice when marketing consent is off', async () => {
      consentFlags.marketing = false;
      render(<ContactView />, { wrapper });

      expect(
        await screen.findByText(/Marketing-Cookies aktiviert sind/i),
      ).toBeInTheDocument();
      expect(screen.queryByLabelText(/Ihr Vor- & Nachname/i)).toBeNull();
    });

    it('renders ContactForm when marketing consent is granted', async () => {
      consentFlags.marketing = true;
      render(<ContactView />, { wrapper });

      expect(
        await screen.findByLabelText(/Ihr Vor- & Nachname/i),
      ).toBeInTheDocument();
    });
  });

  describe('ContactMap (marketing-gated iframe)', () => {
    let wrapper: React.ComponentType<{ children: React.ReactNode }>;

    beforeEach(async () => {
      wrapper = await createIntlWrapper(['common', 'contact']);
    });

    it('shows cookie banner when marketing consent is off', async () => {
      consentFlags.marketing = false;
      render(<ContactMap />, { wrapper });

      expect(
        await screen.findByText(/Google Maps geladen/i),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /Marketing-Cookies akzeptieren/i }),
      ).toBeInTheDocument();
      expect(screen.queryByTitle(/Google Maps/i)).toBeNull();
    });

    it('embeds Google Maps iframe when marketing consent is granted', async () => {
      consentFlags.marketing = true;
      render(<ContactMap />, { wrapper });

      const iframe = await screen.findByTitle(/Google Maps/i);
      expect(iframe).toBeInTheDocument();
      expect(iframe.getAttribute('src')).toContain('maps.google');
    });

    it('accept button saves custom consent with marketing enabled', async () => {
      consentFlags.marketing = false;
      render(<ContactMap />, { wrapper });

      await screen.findByText(/Google Maps geladen/i);

      await act(async () => {
        fireEvent.click(
          screen.getByRole('button', {
            name: /Marketing-Cookies akzeptieren/i,
          }),
        );
      });

      expect(mockSetSelectedConsent).toHaveBeenCalledWith('measurement', false);
      expect(mockSetSelectedConsent).toHaveBeenCalledWith('marketing', true);
      expect(mockSaveConsents).toHaveBeenCalledWith('custom');
    });

    it('cookie settings opens consent dialog', async () => {
      consentFlags.marketing = false;
      render(<ContactMap />, { wrapper });

      await screen.findByText(/Google Maps geladen/i);

      await act(async () => {
        fireEvent.click(
          screen.getByRole('button', { name: /Cookie-Einstellungen/i }),
        );
      });

      expect(mockSetActiveUI).toHaveBeenCalledWith('dialog');
    });
  });
});
