'use client';

import * as React from 'react';

import { CallToAction } from '@/components/templates/CallToAction';

import { Footer } from './Footer';
import { Header } from './Header';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/*
        <InfoBar />
      */}
      <Header />
      {children}
      <CallToAction />
      <Footer />
    </>
  );
}

export default Layout;
