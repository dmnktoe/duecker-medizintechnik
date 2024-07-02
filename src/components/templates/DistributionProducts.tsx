import { StaticImageData } from 'next/image';
import { useTranslation } from 'next-i18next';
import * as React from 'react';

import { Container } from '@/components/layout';
import { ProductCard } from '@/components/templates/ProductCard';
import { Body, Title } from '@/components/ui';

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
    title: 'ORBITARIS Bipolare Koagulationszange',
    text: 'Der Griff mit dem Dreh – Unabhängig von der Position des Chirurgen zum Patienten kann diese neuartige Bipolarzange durch einfaches Verdrehen des Griffs immer in eine ergonomisch optimale Position gebracht werden. Dadurch wird eine frühzeitige Ermüdung vermieden und ein entspannteres, präziseres Operieren ermöglicht.',
    image: ProductBissinger,
    manufacturer: 'Bissinger',
    url: 'https://www.bissinger.com/de/produkte/bipolare-instrumente-mic/koagulationszange-5mm/orbitaris',
    manual: '',
  },
  {
    title: 'Shaversystem Eberle C3',
    text: 'Das Eberle C3 ist ein fortschrittliches Steuergerät, das motorgetriebene Handstücke für die Arthroskopie steuert. Es ist mit einem 5-Zoll-Touchdisplay ausgestattet, das eine automatische Helligkeitsanpassung bietet und Softkeys für Grundfunktionen bereitstellt. Zu den Funktionen gehören eine einstellbare Oszillation und die Wahl zwischen Umdrehungen oder Frequenz im Oszillationsmodus.',
    image: ProductEberle,
    manufacturer: 'Eberle',
    url: 'https://www.eberle-med.de/produkte/antriebssystemeundzubehr/',
    manual: '',
  },
  {
    title: 'Container- und Sterilguttransportwagen',
    text: 'Bestes Handling und sichere Nutzung in der Ver- und Entsorgung von Sterilgütern: Unsere Transportwagen erfüllen die maximalen Anforderungen.',
    image: ProductHupfer,
    manufacturer: 'Hupfer',
    url: 'https://www.hupfer.com/de/medical/transportloesungen/container-und-sterilguttransportwagen/?p=1',
    manual: '',
  },
  {
    title: 'Spreizersystem „piccolino“',
    text: 'Das „piccolino“ Wirbelsäulen-Spreizersystem eignet sich sowohl für miniaturisierte subperiostale paravertebrale Zugangstechniken, als auch für transmuskuläre. Aufgrund der distal betonten Öffnung des Spekulums ergibt sich trotz der reduzierten Abmessungen keine eingeschränkte Darstellung des operativen Zielgebietes im Vergleich zu konventionellen Techniken.',
    image: ProductMedicon,
    manufacturer: 'Medicon',
    url: 'https://medicon.de/produkte/spreizersystem-piccolino/',
    manual: '',
  },
  {
    title:
      'HighSurg 30, Highspeed Motorensystem mit Dualmotor-Prinzip für vielfältige Anwendungen',
    text: 'Das HighSurg 30 Motorensystem ermöglicht dank des Dualmotor-Prinzips eine effiziente Arbeitsweise. Verbinden Sie bis zu zwei Elektronikmotoren und nutzen Sie das gewünschte Handstück für komfortables und präzises Arbeiten.',
    image: ProductNouvag,
    manufacturer: 'Nouvag',
    url: 'https://nouvag.com/produkte/set-und-steuereinheiten/highsurg-30/',
    manual: '',
  },
  {
    title: 'CLEAN WAVE - Stanzen & Rongeure',
    text: 'Die CLEAN WAVE Laminektomie Stanzen & Rongeure sind einteilige Modelle, somit ist eine Demontage zu Reinigungszwecken nicht notwendig. Im Vergleich zu mehrteiligen Instrumenten, kann es somit auch nicht zum Verlust von Komponenten während des Reinigungs- und Sterilisations-prozesses kommen. Die wellenförmigen Schaftflächen ermöglichen zudem eine deutliche Reduzierung der Reibung.',
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
        <div className='flex flex-col gap-10 bg-white lg:flex-row'>
          <div className='mx-auto lg:min-w-[480px]'>
            <Title size='two'>{t('content.features.title')}</Title>
            <Body size='sm' color='light'>
              {t('content.features.text')}
            </Body>
          </div>
          <div className='mx-auto grid gap-1 lg:grid-cols-2'>
            {products.map((product) => (
              <ProductCard
                manufacturer={product.manufacturer}
                key={product.manufacturer}
                title={product.title}
                description={product.text}
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
