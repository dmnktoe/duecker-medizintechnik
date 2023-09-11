import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';

import { Container } from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/layout/Seo';
import PrimaryLink from '@/components/ui/links/PrimaryLink';
import UnderlineLink from '@/components/ui/links/UnderlineLink';

import { data } from '@/constant/data';

const ImprintPage = (
  _props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  const { t } = useTranslation('imprint');
  return (
    <Layout>
      <Seo templateTitle={t('seo.title')} />
      <main className='py-16 md:py-24'>
        <Container className='max-w-4xl'>
          <h1 className='mb-8'>{t('headline')}</h1>
          <div className='privacy__content'>
            <p>
              <strong>{t('provider')}</strong>
            </p>
            <p>
              <strong>{data.companyName}</strong>
              <br />
              {data.street}
              <br />
              {data.city}
            </p>
            <p>
              {t('phone')}: {data.phone}
              <br />
              {t('fax')}: {data.fax}
            </p>
            <p>
              {t('email')}:{' '}
              <PrimaryLink href={`mailto:${data.email}`}>
                {data.email}
              </PrimaryLink>
              <br />
              {t('web')}:{' '}
              <PrimaryLink href={'https://' + data.url}>{data.url}</PrimaryLink>
            </p>
            <p>
              Steuernummer: 02522835460
              <br />
              Amtsgericht Kassel HRB 16493
            </p>
            <p>Bildquellen: Patrick Dücker, Unsplash, Pexels</p>
            <p>
              <strong>Copyright</strong>
            </p>
            <p>
              Alle Rechte vorbehalten. Die auf der Website verwendeten Texte,
              Bilder, Grafiken, Dateien usw. unterliegen dem Urheberrecht und
              anderen Gesetzen zum Schutz des geistigen Eigentums. Ihre
              Weitergabe, Veränderung, gewerbliche Nutzung oder Verwendung in
              anderen Websites oder Medien ist nicht gestattet.
            </p>
            <p>
              <strong>Datenschutz</strong>
            </p>
            <p>
              Wir erheben, verarbeiten und nutzen Ihre Daten nur im Rahmen der
              gesetzlichen Bestimmungen. Diese Datenschutzerklärung gilt
              ausschließlich für die Nutzung der von uns angebotenen Webseiten.
              Sie gilt nicht für die Webseiten anderer Dienstanbieter, auf die
              wir lediglich durch einen Link verweisen. Bei der Nutzung unserer
              Webseiten bleiben Sie anonym, solange Sie uns nicht von sich aus
              freiwillig personenbezogene Daten zur Verfügung stellen.
              Personenbezogene Daten werden nur dann erhoben, wenn dies für die
              Nutzung der auf der Webseite angebotenen Leistungen, insbesondere
              Formularangebote, erforderlich ist.
            </p>
            <p>
              Die rechtlichen Grundlagen sind in unserer{' '}
              <UnderlineLink href='/datenschutz'>
                Datenschutzerklärung
              </UnderlineLink>{' '}
              (DSGVO) ersichtlich.
            </p>
            <p>
              <strong>Online-Streitschlichtungsplattform</strong>
            </p>
            <p>
              Die Online-Streitschlichtungsplattform (OS-Plattform) der EU ist
              unter folgendem Link erreichbar:&nbsp;
              <UnderlineLink href='https://ec.europa.eu/consumers/odr/'>
                https://ec.europa.eu/consumers/odr/
              </UnderlineLink>
            </p>
            <p>
              Zur Teilnahme an einem Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle sind wir nicht verpflichtet und
              grundsätzlich nicht bereit.
            </p>
            <p>
              <strong>Hinweis gemäß Teledienstgesetz</strong>
            </p>
            <p>
              Für Websites Dritter, auf die der Herausgeber durch sogenannte
              Links verweist, tragen die jeweiligen Anbieter die Verantwortung.
              Der Herausgeber ist für den Inhalt solcher Sites Dritter nicht
              verantwortlich. Des weiteren kann die Website des Herausgebers
              ohne dessen Wissen von anderen Websites mittels sogenannter Links
              angelinkt werden. Der Herausgeber übernimmt keine Verantwortung
              für Darstellungen, Inhalt oder irgendeine Verbindung zur
              Parteigliederung des Herausgebers in Websites Dritter. Für fremde
              Inhalte ist der Herausgeber nur dann verantwortlich, wenn er von
              ihnen (d.h. auch von einem rechtswidrigen oder strafbaren Inhalt)
              positive Kenntnis hat und es dem Herausgeber technisch möglich und
              zumutbar ist, deren Nutzung zu verhindern. Der Herausgeber ist
              nach dem Teledienstgesetz jedoch nicht verpflichtet, die fremden
              Inhalte ständig zu überprüfen.
            </p>
            <p>
              <strong>Haftungsausschluss</strong>
            </p>
            <p>
              Die Inhalte des Internetauftritts wurden mit größtmöglicher
              Sorgfalt und nach bestem Gewissen erstellt. Dennoch übernimmt der
              Anbieter dieser Webseite keine Gewähr für die Aktualität,
              Vollständigkeit und Richtigkeit der bereitgestellten Seiten und
              Inhalte.
            </p>
            <p>
              Als Diensteanbieter ist der Anbieter dieser Webseite gemäß § 7
              Abs. 1 TMG für eigene Inhalte und bereitgestellte Informationen
              auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich;
              nach den §§ 8 bis 10 TMG jedoch nicht verpflichtet, die
              übermittelten oder gespeicherten fremden Informationen zu
              überwachen. Eine Entfernung oder Sperrung dieser Inhalte erfolgt
              umgehend ab dem Zeitpunkt der Kenntnis einer konkreten
              Rechtsverletzung. Eine Haftung ist erst ab dem Zeitpunkt der
              Kenntniserlangung möglich.
            </p>
            <p>
              <strong>Wichtige Hinweise zu Links</strong>
            </p>
            <p>
              Mit Urteil vom 12.05.1998 Az. 312 O 85/98 hat das LG Hamburg
              entschieden, dass durch die Anbringung eines Links die auf dieser
              Seite enthaltenen Informationen ggf. mit zu verantworten sind.
              Dies könne nach Auffassung des LG Hamburg nur dadurch vermieden
              werden, dass eine ausdrückliche Distanzierung erfolge.
              Dementsprechend distanzieren wir uns vorsorglich ausdrücklich von
              den Inhalten der Seiten, deren Links Sie hier finden oder die
              sonst über unsere Seite erreichbar sind. Die Inhalte dieser Seiten
              unterliegen ausschließlich dem Verantwortungsbereich Dritter. Wir
              haben auf die Inhalte keinen Einfluss, weshalb wir keinerlei
              Haftung für dort enthaltene Informationen übernehmen können und
              wollen.
            </p>
            <p>
              <strong>Konzeption &amp; Realisation</strong>
            </p>
            <p>Fotos: Patrick Dücker, Web: Domenik Töfflinger</p>
          </div>
        </Container>
      </main>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'de', ['common', 'imprint'])),
    },
  };
};

export default ImprintPage;
