import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';

import { Container } from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/layout/Seo';

const ImprintPage = (
  _props: InferGetStaticPropsType<typeof getStaticProps>,
) => {
  const { t } = useTranslation('termsAndConditions');
  return (
    <Layout>
      <Seo
        templateTitle={t('meta.pageTitle')}
        description={t('meta.seo.description')}
        title={t('meta.seo.title')}
      />
      <main className='mx-auto max-w-5xl py-16 md:py-24'>
        <Container>
          <h1 className='mb-8'>
            Allgemeine Verkaufsbedingungen
            <br /> Dücker Medizintechnik{' '}
          </h1>
          <div className='privacy__content'>
            <p>
              <strong>
                Sämtlichen Verträgen und Geschäftsvorfällen liegen unsere
                nachstehenden Verkaufs-, Lieferungs- und Zahlungsbedingungen
                zugrunde.
              </strong>
            </p>
            <p>
              <strong>I. Allgemeiner Vertragsinhalt</strong>
            </p>
            <p>
              1. Unsere Verkaufs-, Lieferungs- und Zahlungsbedingungen sind für
              den gesamten Geschäftsverkehr mit dem Besteller verbindlich und
              werden durch Auftragserteilung anerkannt. Einkaufsbedingungen des
              Abnehmers, die wir nicht ausdrücklich anerkennen, sind für uns
              unverbindlich, auch wenn wir Ihnen nicht ausdrücklich
              widersprechen. Katalogangaben, Abbildungen und Eigenschaften sind
              nur annähernd maßgebend, sofern sie nicht ausdrücklich als
              verbindlich bestätigt werden.
            </p>
            <p>
              2. Sondervereinbarungen erlangen erst mit schriftlicher
              Bestätigung durch uns Gültigkeit und beziehen sich immer nur auf
              den einzelnen Vorgang, für den die Sondervereinbarung getroffen
              wurde.
            </p>
            <p>
              3. Allgemeine Geschäftsbedingungen des Käufers sind für uns
              unverbindlich, auch dann, wenn wir diesen nicht widersprechen.
            </p>
            <p>
              <strong>II. Vertragsabschluss und Preise</strong>
            </p>
            <p>
              1. Angebote und Preise gemäß unserer Preisliste sind stets
              freibleibend.
            </p>
            <p>
              2. Im Übrigen sind Angebote freibleibend, falls deren Annahme
              nicht innerhalb von 14 Tagen uns gegenüber erklärt ist. Die
              angegebenen Preise gelten bis zum Erscheinen einer neuen Liste,
              soweit wir nicht durch Preiserhöhungen der Hersteller oder
              Rohwaren für die Produktion, zu vorzeitigen Preiskorrekturen
              gezwungen werden.
            </p>
            <p>
              3. Alle Preise verstehen sich mangels anderweitiger schriftlicher
              Vereinbarung stets unverpackt ab Lager zuzüglich der jeweils
              gültigen gesetzlichen Mehrwertsteuer. Verpackungs-, Porto- und
              sonstige Versendungskosten werden, sofern nicht anders angeboten
              bzw. auf der Rechnung vermerkt, gesondert ausgewiesen und
              zusätzlich berechnet.
            </p>
            <p>
              4. Erfolgt die Lieferung später als 4 Monate nach
              Vertragsabschluss und haben sich die Preise inzwischen erhöht, so
              werden die zum Lieferzeitpunkt gültigen Preise berechnet.
            </p>
            <p>
              <strong>III. Konstruktions- und Formänderungen</strong>
            </p>
            <p>
              Konstruktions- und Formänderungen an den angebotenen oder
              verkauften Produkten sind – soweit die Änderung dem jeweiligen
              Stand der Technik entspricht – vorbehalten und ohne vorherigen
              Hinweis zulässig.
            </p>
            <p>
              <strong>IV. Zahlungsbedingungen, Verzugszinsen</strong>
            </p>
            <p>
              1. Alle Reparaturrechnungen sind sofort fällig, um übrigen
              gewähren wir ein Zahlungsziel von 30 Tagen ab Rechnungsdatum.
            </p>
            <p>
              2. Soweit es sich nicht um Reparaturrechnungen, amtliche Gebühren
              oder ausgewiesene Nettopreise handelt, gewähren wir bei Zahlung
              innerhalb von 10 Tagen 2 % Skonto.
            </p>
            <p>
              3. Bei Zahlungsverzug sind wir unbeschadet weiterer Ansprüche und
              eines Gegenbeweises, dass der Verzugsschaden wesentlich niedriger
              sei, berechtigt, Zinsen in Höhe von 5 % über dem jeweiligen
              Diskontsatz der deutschen Bundesbank zu fordern.
            </p>
            <p>
              4. Teilleistungen sind zulässig. Die Rechnungen dafür sind
              entsprechend vorstehender Zahlungsbedingungen zu begleichen.
            </p>
            <p>
              5. Wir behalten uns das Eigentumsrecht an der gelieferten Sache
              bis zur vollständigen Zahlung ausdrücklich vor.
            </p>
            <p>
              6. Der Besteller ist verpflichtet, solange das Eigentum noch nicht
              auf ihn übergegangen ist, die Kaufsache pfleglich zu behandeln.
              Insbesondere ist er verpflichtet, diese auf eigene Kosten gegen
              Diebstahl-, Feuer- und Wasserschäden ausreichend zum Neuwert zu
              versichern. Müssen Wartungs- und Inspektionsarbeiten durchgeführt
              werden, hat der Besteller diese auf eigene Kosten rechtzeitig
              auszuführen. Solange das Eigentum noch nicht übergegangen ist, hat
              uns der Besteller unverzüglich in Textform zu benachrichtigen,
              wenn der gelieferte Gegenstand gepfändet oder sonstigen Eingriffen
              Dritter ausgesetzt ist. Soweit der Dritte nicht in der Lage ist,
              uns die gerichtlichen und außergerichtlichen Kosten einer Klage
              gemäß § 771 ZPO zu erstatten, haftet der Besteller für den uns
              entstandenen Ausfall.
            </p>
            <p>
              7. Falls wir uns – worauf kein Anspruch besteht – mit dem Umtausch
              oder der Rückgabe der Ware einverstanden erklären, sind wir
              berechtigt eine Bearbeitungsgebühr von 15 % des Netto-Warenwertes
              zuzüglich Mehrwertsteuer zu berechnen.
            </p>
            <p>
              8. Bei einem Nettobestellwert unter 25,00 € behalten wir uns vor,
              einen Mindermengen- Zuschlag in Höhe von 5,00 € zu berechnen. Bei
              eingehenden Reparaturaufträgen mit einem Rechnungswert unter 25,00
              € (Kleinstmengenaufträge) berechnen wir automatisch eine Pauschale
              in Höhe von 25,00 € zzgl. der gesetzlichen Mehrwertsteuer.
            </p>
          </div>
        </Container>
      </main>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'de', [
        'common',
        'termsAndConditions',
      ])),
    },
  };
};

export default ImprintPage;
