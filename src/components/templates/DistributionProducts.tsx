import { StaticImageData } from 'next/image';
import { useTranslation } from 'next-i18next';
import * as React from 'react';

import { Container } from '@/components/layout';
import { ProductCard } from '@/components/templates/ProductCard';
import { Body, Title, UnderlineLink } from '@/components/ui';

import { company } from '@/constant/company';

import ProductBissinger from '/public/images/distribution/products/distribution_products-bissinger.webp';
import ProductEberle from '/public/images/distribution/products/distribution_products-eberle.webp';
import ProductHupfer from '/public/images/distribution/products/distribution_products-hupfer.webp';
import ProductMedicon from '/public/images/distribution/products/distribution_products-medicon.webp';
import ProductNouvag from '/public/images/distribution/products/distribution_products-nouvag.webp';
import ProductTontarra from '/public/images/distribution/products/distribution_products-tontarra.webp';

export interface Product {
  title: string;
  text: string;
  image: StaticImageData;
  manufacturer: string;
  url: string;
  manual: string;
}

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
  const { t } = useTranslation('distribution');

  return (
    <section className='pt-16 md:pt-24 lg:pt-32'>
      <Container>
        <div className='flex flex-col gap-10 bg-white xl:flex-row'>
          <div className='mx-auto xl:max-w-[480px]'>
            <Title size='one' renderAs='h3'>
              {t('content.products.title')}
            </Title>
            <Body size='sm' color='light'>
              {t('content.products.text')}
            </Body>
            <UnderlineLink underline='always' href='/kontakt'>
              {t('content.products.button')}
            </UnderlineLink>
            <div className='mt-8 hidden bg-gray-100 p-3 xl:block'>
              <Body>
                {company.street} <br />
                {company.city}
              </Body>
              <Body>
                <UnderlineLink href={`tel:${company.phone}`} underline='hover'>
                  {company.phone}
                </UnderlineLink>
                <br />

                <UnderlineLink
                  href={'mailto:' + company.email}
                  underline='hover'
                >
                  {company.email}
                </UnderlineLink>
              </Body>
            </div>
          </div>
          <div className='mx-auto grid gap-4 md:grid-cols-2'>
            {products.map((product) => (
              <ProductCard
                manufacturer={product.manufacturer}
                key={product.manufacturer}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                title={t(product.title)}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                description={t(product.text)}
                image={product.image}
                url={product.url}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
