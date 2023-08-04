import * as React from 'react';

import { CTA } from '@/components/layout/CTA';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <CTA />
      <Footer />
    </>
  );
}
