import * as React from 'react';

import { Footer, Header } from '@/components/layout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/*
        <InfoBar />
      */}
      <Header />
      {children}
      {/*
        <CallToAction />
      */}
      <Footer />
    </>
  );
}
