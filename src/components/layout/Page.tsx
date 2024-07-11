import { StaticImageData } from 'next/image';
import * as React from 'react';

import clsxm from '@/lib/clsxm';

import Seo from '@/components/helpers/Seo';
import { Container } from '@/components/layout/index';
import Layout from '@/components/layout/Layout';
import Breadcrumbs from '@/components/templates/Breadcrumbs';
import ImageBanner from '@/components/templates/ImageBanner/ImageBanner';

interface PageProps {
  children: React.ReactNode;
  className?: string;
  layout: {
    background?: 'light' | 'dark' | 'primary' | 'gray';
    containerWidth?: string;
    padding?: 'none' | 'tiny' | 'small' | 'default' | 'large';
    showBreadcrumbs?: boolean;
    showHero?: boolean;
    topContent?: React.ReactNode;
  };
  image?: StaticImageData;
  seo: {
    date?: Date;
    description: string;
    hreflangs: { rel: string; hrefLang: string; href: string }[];
    title: string;
  };
  title: string;
}

export default function Page({
  children,
  className,
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
        date={seo.date && new Date(seo.date).toISOString()}
        image={image ? image.src : ''}
        templateTitle={title}
        hreflangs={seo.hreflangs}
        /* This is a SEO-optimized meta.seo.title */
        title={seo.title}
        description={seo.description}
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
      {layout.topContent}
      <main
        className={clsxm(
          layout.background === 'light' && 'bg-white',
          layout.background === 'dark' && 'bg-black',
          layout.background === 'primary' && 'bg-primary-500',
          layout.background === 'gray' && 'bg-gray-100',
          layout.padding === 'none' && 'pt-0',
          layout.padding === 'tiny' && 'pt-4',
          layout.padding === 'small' && 'pt-8',
          layout.padding === 'default' && 'pt-8 md:pt-16 lg:pt-24',
          layout.padding === 'large' && 'pt-32',
          className,
        )}
      >
        {layout.showBreadcrumbs && (
          <section>
            <Container width={layout.containerWidth}>
              <Breadcrumbs />
            </Container>
          </section>
        )}
        {children}
      </main>
    </Layout>
  );
}
