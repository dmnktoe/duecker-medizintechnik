import * as React from 'react';

import { Footer, Header, InfoBar } from '@/components/layout';
import { CallToAction } from '@/components/templates/CallToAction';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <InfoBar />
      <Header />
      {children}
      <CallToAction />
      <Footer />
    </>
  );
}
