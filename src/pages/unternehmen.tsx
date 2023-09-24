import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';
import Marquee from 'react-fast-marquee';
import StaggerText from 'react-stagger-text';

import { Container } from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/layout/Seo';
import ImageBanner from '@/components/templates/ImageBanner/ImageBanner';
import UnderlineLink from '@/components/ui/links/UnderlineLink';
import { Title } from '@/components/ui/typography/Title';

import { customerLogos } from '@/constant/customerLogos';

import aboutUsImg1 from '../public/images/about-us/duecker-medizintechnik_about-us_1.webp';
import aboutUsImg2 from '../public/images/about-us/duecker-medizintechnik_about-us_2.webp';
import heroImg from '../public/images/about-us/duecker-medizintechnik_about-us_hero.webp';

const AboutUsPage = (
  _props: InferGetStaticPropsType<typeof getStaticProps>,
) => {
  const { t } = useTranslation('aboutUs');
  return (
    <Layout>
      <Seo templateTitle={t('seo.title')} description={t('seo.description')} />
      <ImageBanner
        role='hero'
        delay={0}
        priority={true}
        src={heroImg}
        className='flex-1'
      />
      <main className='py-16 md:py-24'>
        <Container>
          <div className='mx-auto mb-16 max-w-5xl'>
            <Title size='two' isAnimated>
              {t('headline')}
            </Title>
            <p className='mb-4'>
              Schnell wurde sich am Markt ein guter Name geschaffen, da die
              Kunden mit bester Qualität und Service bedient wurden. Um den
              Ansprüchen der Kunden gewachsen zu sein, wurde das Lager der Firma
              Dücker-Medizintechnik ständig erweitert. Aus diesem Grund wurde
              1994 der Standort gewechselt. Es erfolgte der Umzug in das jetzige
              Büro und Produktionshaus in Melsungen. Hier entstand ein Reinraum
              der ISO Klasse 8 zur Produktion von medizinischen
              Einweg-Produkten.
            </p>
            <p className='mb-4'>
              Dücker Medizintechnik ist zertifizierter Hersteller von sterilen-
              und unsterilen Schlauch-Sets und beliefert den Deutschen und
              Europäischen Markt für namhafte Hersteller und Set-Packern. 2001
              wurde der Service-Bereich erweitert. Es wurden Chirurgiemechaniker
              eingestellt, die die Reparaturen von chir.-Instrumenten
              durchführen. Dieser Schritt war Richtungsweisend für unser
              Unternehmen.
            </p>
            <p className='mb-4 font-medium'>
              Dücker Medizintechnik ist mit dem eigenem Reparatur-Service der
              Ansprechpartner für Kliniken, ambulante Praxen und externe
              Medizintechniken geworden.
            </p>
            <p className='mb-4'>
              Seit dem 01.01.2003 wird das Unternehmen von Herrn Marc Dücker als
              Geschäftsführer geleitet.
            </p>
            <p className='mb-4'>
              Heute sind wir Ihr Ansprechpartner für Handelsvermittlung von
              pharmazeutischen Erzeugnissen, medizinischen und orthopädischen
              Artikeln und Laborbedarf, Ärztebedarf, Dentalbedarf,
              zahnärztlichen Instrumenten, Krankenhaus- und Altenpflegebedarf
            </p>
            <hr className='my-10' />
            <p className='mb-4'>
              Bei Dücker Medizintechnik legen wir großen Wert auf{' '}
              <span className='font-medium'> Qualität und Transparenz</span>.
              Unsere Zertifikate und Downloads sind ein Beweis für unser
              Engagement in diesen Bereichen. Möchten Sie mehr über unsere
              Zertifikate und Downloads erfahren? Besuchen Sie unsere{' '}
              <UnderlineLink href='/downloads'>
                Zertifikate und Downloads-Seite
              </UnderlineLink>
              , um detaillierte Informationen und die entsprechenden Dokumente
              herunterzuladen. Bei Fragen stehen wir Ihnen gerne zur Verfügung.
              Mit uns sind Sie in guter Gesellschaft.
            </p>
            <div className='pt-16'>
              <Marquee gradient={true} autoFill={true} speed={25}>
                {customerLogos.map((logo) => (
                  <div key={logo.name} className='px-12 opacity-40'>
                    <Link
                      href={logo.url}
                      target='_blank'
                      className='text-gray-300'
                    >
                      <Image
                        src={logo.image}
                        width='120'
                        height='100'
                        alt='Icon'
                      />
                    </Link>
                  </div>
                ))}
              </Marquee>
            </div>
          </div>
          <div className='mx-auto max-w-5xl items-center gap-16 py-8 lg:grid lg:grid-cols-2 lg:pb-16 lg:pt-32'>
            <div>
              <h2 className='mb-4 text-4xl font-bold tracking-tight text-gray-900'>
                <StaggerText>
                  Qualität, Innovation und Kundenzufriedenheit
                </StaggerText>
              </h2>
              <p className='mb-4'>
                Die Medizintechnik entwickelt sich ständig weiter, und wir
                stehen an vorderster Front dieses Wandels. Unsere Fähigkeit,
                innovative Lösungen zu entwickeln und in die Produktion
                umzusetzen, hat uns zu einem anerkannten Akteur in der Branche
                gemacht. Wir investieren kontinuierlich in Forschung und
                Entwicklung, um sicherzustellen, dass unsere Kunden stets von
                den neuesten Entwicklungen profitieren.
              </p>
              <p>
                We are strategists, designers and developers. Innovators and
                problem solvers. Small enough to be simple and quick.
              </p>
            </div>
            <div className='mt-8 grid grid-cols-2 gap-4'>
              <Image
                alt='hero'
                src={aboutUsImg1}
                placeholder='blur'
                className='w-full rounded-lg'
                width={600}
                height={500}
                loading='lazy'
              />
              <Image
                alt='hero'
                src={aboutUsImg2}
                placeholder='blur'
                className='mt-4 w-full rounded-lg lg:mt-10'
                width={600}
                height={500}
                loading='lazy'
              />
            </div>
          </div>
          <div className='mx-auto max-w-screen-xl px-4 py-8 text-center lg:px-6 lg:py-16'>
            <dl className='mx-auto grid max-w-screen-md gap-8 text-gray-900 sm:grid-cols-3'>
              <div className='flex flex-col items-center justify-center'>
                <dt className='mb-2 text-3xl font-extrabold md:text-4xl'>
                  <StaggerText staggerType='letter'>73M+</StaggerText>
                </dt>
                <dd className='font-light text-gray-500'>Set-Packer</dd>
              </div>
              <div className='flex flex-col items-center justify-center'>
                <dt className='mb-2 text-3xl font-extrabold md:text-4xl'>
                  <StaggerText staggerType='letter'>1B+</StaggerText>
                </dt>
                <dd className='font-light text-gray-500'>contributors</dd>
              </div>
              <div className='flex flex-col items-center justify-center'>
                <dt className='mb-2 text-3xl font-extrabold md:text-4xl'>
                  <StaggerText staggerType='letter'>4M+</StaggerText>
                </dt>
                <dd className='font-light text-gray-500'>organizations</dd>
              </div>
            </dl>
          </div>
        </Container>
      </main>
      <div className='relative'>
        <div className='after:from-primary-500/10 after:to-primary-600/0 after:absolute after:bottom-0 after:-z-10 after:h-[52rem] after:w-full after:rounded-tl-[15rem] after:bg-gradient-to-b'></div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'de', ['common', 'aboutUs'])),
    },
  };
};

export default AboutUsPage;
