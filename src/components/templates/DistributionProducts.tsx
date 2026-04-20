'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import * as React from 'react';

import { Container } from '@/components/layout';
import { ProductCard } from '@/components/templates/ProductCard';
import { Body, Title, UnderlineLink } from '@/components/ui';

import { company } from '@/constant/company';

import { Product } from '@/types/Product';

import MicromedLogo from '~/images/distribution/partners/micromed-logo.png';
import ProductBissinger from '~/images/distribution/products/distribution_products-bissinger.webp';
import ProductEberle from '~/images/distribution/products/distribution_products-eberle.webp';
import ProductHupfer from '~/images/distribution/products/distribution_products-hupfer.webp';
import ProductMedicon from '~/images/distribution/products/distribution_products-medicon.webp';
import ProductNouvag from '~/images/distribution/products/distribution_products-nouvag.webp';
import ProductTontarra from '~/images/distribution/products/distribution_products-tontarra.webp';

const products: Product[] = [
  {
    title: 'content.products.bissinger.title',
    text: 'content.products.bissinger.text',
    image: ProductBissinger,
    manufacturer: 'Bissinger',
    url: 'https://www.bissinger.com/de/produkte/bipolare-instrumente-mic/koagulationszange-5mm/orbitaris',
    manual: '',
  },
  {
    title: 'content.products.eberle.title',
    text: 'content.products.eberle.text',
    image: ProductEberle,
    manufacturer: 'Eberle',
    url: 'https://www.eberle-med.de/produkte/antriebssystemeundzubehr/',
    manual: '',
  },
  {
    title: 'content.products.hupfer.title',
    text: 'content.products.hupfer.text',
    image: ProductHupfer,
    manufacturer: 'Hupfer',
    url: 'https://www.hupfer.com/de/medical/transportloesungen/container-und-sterilguttransportwagen/?p=1',
    manual: '',
  },
  {
    title: 'content.products.medicon.title',
    text: 'content.products.medicon.text',
    image: ProductMedicon,
    manufacturer: 'Medicon',
    url: 'https://medicon.de/produkte/spreizersystem-piccolino/',
    manual: '',
  },
  {
    title: 'content.products.nouvag.title',
    text: 'content.products.nouvag.text',
    image: ProductNouvag,
    manufacturer: 'Nouvag',
    url: 'https://nouvag.com/produkte/set-und-steuereinheiten/highsurg-30/',
    manual: '',
  },
  {
    title: 'content.products.tontarra.title',
    text: 'content.products.tontarra.text',
    image: ProductTontarra,
    manufacturer: 'Tontarra',
    url: 'https://tontarra.de/produkte/clean-wave-stanzen-rongeure/',
    manual: '',
  },
];

export default function DistributionProducts() {
  const t = useTranslations('distribution');

  const ProductsHelp = () => {
    return (
      <>
        <Title size='one' renderAs='h3'>
          {t('content.products.title')}
        </Title>
        <Body size='sm' color='light'>
          {t('content.products.text')}
        </Body>
        <UnderlineLink underline='always' href='/kontakt'>
          {t('content.products.button')}
        </UnderlineLink>
        <div className='mt-8'>
          <Link
            href='https://www.micromed.com/'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-block'
          >
            <Image
              src={MicromedLogo}
              alt={t('content.products.micromed.logoAlt')}
              className='h-12 w-auto max-w-[200px] object-contain opacity-90 transition-opacity hover:opacity-100'
            />
          </Link>
          <Body margin={false} size='sm' color='light' className='mt-4'>
            {t('content.products.micromed.intro')}
          </Body>
        </div>
        <div className='mt-8'>
          <Body size='sm' color='light'>
            {company.street} <br />
            {company.city}
          </Body>
          <Body size='sm' color='light' className='mt-2'>
            <UnderlineLink href={`tel:${company.phone}`} underline='hover'>
              {company.phone}
            </UnderlineLink>
            <br />
            <UnderlineLink href={'mailto:' + company.email} underline='hover'>
              {company.email}
            </UnderlineLink>
          </Body>
        </div>
      </>
    );
  };

  const ProductGrid = () => (
    <>
      {products.map((product) => (
        <ProductCard
          key={product.manufacturer}
          manufacturer={product.manufacturer}
          title={t(product.title as Parameters<typeof t>[0])}
          description={t(product.text as Parameters<typeof t>[0])}
          image={product.image}
          url={product.url}
        />
      ))}
    </>
  );

  return (
    <section className='pt-16 md:pt-24 lg:pt-32'>
      <Container>
        <div className='flex flex-col gap-8 bg-white lg:flex-row xl:gap-32 2xl:gap-48'>
          <div className='mx-auto w-full lg:w-2/5 xl:max-w-[500px]'>
            <ProductsHelp />
          </div>
          <div className='mx-auto grid gap-4 md:grid-cols-2 lg:w-3/5'>
            <ProductGrid />
          </div>
        </div>
      </Container>
    </section>
  );
}
