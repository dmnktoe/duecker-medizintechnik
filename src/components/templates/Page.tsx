import { StaticImageData } from 'next/image';
import * as React from 'react';

import clsxm from '@/lib/clsxm';
import { formatDate } from '@/lib/helper';

import Seo from '@/components/helpers/Seo';
import { Container } from '@/components/layout';
import Layout from '@/components/layout/Layout';
import Breadcrumbs from '@/components/templates/Breadcrumbs';
import ImageBanner from '@/components/templates/ImageBanner/ImageBanner';

interface PageProps {
  children: React.ReactNode;
  date?: Date;
  layout: {
    background?: 'light' | 'dark' | 'primary' | 'gray';
    breadcrumbsClasses?: string;
    showBreadcrumbs?: boolean;
    showHero?: boolean;
    padding?: 'none' | 'default' | 'large';
  };
  image: StaticImageData;
  seo: {
    title: string;
    description: string;
  };
  title: string;
}

export default function Page({
  children,
  date,
  layout = {
    background: 'light',
    showBreadcrumbs: true,
    showHero: false,
    padding: 'default',
  },
  image,
  seo,
  title,
}: PageProps) {
  return (
    <Layout>
      <Seo
        date={date ? formatDate(date) : ''}
        image={image.src}
        templateTitle={title}
        /* This is a SEO-optimized meta.seo.title */
        description={seo.description}
        title={seo.title}
      />
      {image && layout.showHero && (
        <ImageBanner
          alt={title}
          className='flex-1'
          delay={0}
          priority={true}
          role='hero'
          src={image}
          staticAnimation
        />
      )}
      <main
        className={clsxm(
          layout.background === 'light' && 'bg-white',
          layout.background === 'dark' && 'bg-black',
          layout.background === 'primary' && 'bg-primary-500',
          layout.background === 'gray' && 'bg-gray-100',
          layout.padding === 'none' && 'pt-0',
          layout.padding === 'default' && 'pt-16 md:pt-24',
          layout.padding === 'large' && 'pt-32',
        )}
      >
        <section>
          <Container>
            {/* Breadcrumbs */}
            {layout.showBreadcrumbs && <Breadcrumbs />}
          </Container>
        </section>
        {children}
      </main>
    </Layout>
  );
}
