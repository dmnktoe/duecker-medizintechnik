import * as React from 'react';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { CallToAction } from '@/components/templates/CallToAction';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <CallToAction />
      <Footer />
    </>
  );
}
