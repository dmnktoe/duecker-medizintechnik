import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';

import '@/styles/globals.css';

import MaintenancePage from '@/pages/maintenance';

function Duecker({ Component, pageProps }: AppProps) {
  if (process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true') {
    return <MaintenancePage />;
  }
  return <Component {...pageProps} />;
}

export default appWithTranslation(Duecker);
