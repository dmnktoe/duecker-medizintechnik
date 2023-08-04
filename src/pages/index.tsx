import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import { BlogPosts } from '@/components/templates/BlogPosts';
import { Features } from '@/components/templates/Features';
import { Intro } from '@/components/templates/Intro';
import { StickyScroll } from '@/components/templates/StickyScroll/StickyScroll';

export default function HomePage() {
  return (
    <Layout>
      <Seo templateTitle='Handel, Produktion, Reperatur für OP-Lösungen und Sterilisierungen' />
      <main>
        <Intro />
        <StickyScroll />
        <Features />
        <BlogPosts />
      </main>
    </Layout>
  );
}
