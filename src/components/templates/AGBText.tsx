import { useTranslation } from 'next-i18next';
import * as React from 'react';

import { Container } from '@/components/layout';
import { Body, Title } from '@/components/ui';

export default function AGBText() {
  const { t } = useTranslation('termsAndConditions');
  return (
    <section className='mx-auto max-w-6xl pb-16 lg:pb-24'>
      <Container>
        <Title>{t('content.title')}</Title>
        <Body isStrong>
          Sämtlichen Verträgen und Geschäftsvorfällen liegen unsere
          nachstehenden Verkaufs-, Lieferungs- und Zahlungsbedingungen zugrunde.
        </Body>
        <Body>
          <strong>I. Allgemeiner Vertragsinhalt</strong>
        </Body>
        <Body>
          1. Unsere Verkaufs-, Lieferungs- und Zahlungsbedingungen sind für den
          gesamten Geschäftsverkehr mit dem Besteller verbindlich und werden
          durch Auftragserteilung anerkannt. Einkaufsbedingungen des Abnehmers,
          die wir nicht ausdrücklich anerkennen, sind für uns unverbindlich,
          auch wenn wir Ihnen nicht ausdrücklich widersprechen. Katalogangaben,
          Abbildungen und Eigenschaften sind nur annähernd maßgebend, sofern sie
          nicht ausdrücklich als verbindlich bestätigt werden.
        </Body>
        <Body>
          2. Sondervereinbarungen erlangen erst mit schriftlicher Bestätigung
          durch uns Gültigkeit und beziehen sich immer nur auf den einzelnen
          Vorgang, für den die Sondervereinbarung getroffen wurde.
        </Body>
        <Body>
          3. Allgemeine Geschäftsbedingungen des Käufers sind für uns
          unverbindlich, auch dann, wenn wir diesen nicht widersprechen.
        </Body>
        <Body>
          <strong>II. Vertragsabschluss und Preise</strong>
        </Body>
        <Body>
          1. Angebote und Preise gemäß unserer Preisliste sind stets
          freibleibend.
        </Body>
        <Body>
          2. Im Übrigen sind Angebote freibleibend, falls deren Annahme nicht
          innerhalb von 14 Tagen uns gegenüber erklärt ist. Die angegebenen
          Preise gelten bis zum Erscheinen einer neuen Liste, soweit wir nicht
          durch Preiserhöhungen der Hersteller oder Rohwaren für die Produktion,
          zu vorzeitigen Preiskorrekturen gezwungen werden.
        </Body>
        <Body>
          3. Alle Preise verstehen sich mangels anderweitiger schriftlicher
          Vereinbarung stets unverpackt ab Lager zuzüglich der jeweils gültigen
          gesetzlichen Mehrwertsteuer. Verpackungs-, Porto- und sonstige
          Versendungskosten werden, sofern nicht anders angeboten bzw. auf der
          Rechnung vermerkt, gesondert ausgewiesen und zusätzlich berechnet.
        </Body>
        <Body>
          4. Erfolgt die Lieferung später als 4 Monate nach Vertragsabschluss
          und haben sich die Preise inzwischen erhöht, so werden die zum
          Lieferzeitpunkt gültigen Preise berechnet.
        </Body>
        <Body>
          <strong>III. Konstruktions- und Formänderungen</strong>
        </Body>
        <Body>
          Konstruktions- und Formänderungen an den angebotenen oder verkauften
          Produkten sind – soweit die Änderung dem jeweiligen Stand der Technik
          entspricht – vorbehalten und ohne vorherigen Hinweis zulässig.
        </Body>
        <Body>
          <strong>IV. Zahlungsbedingungen, Verzugszinsen</strong>
        </Body>
        <Body>
          1. Alle Reparaturrechnungen sind sofort fällig, um übrigen gewähren
          wir ein Zahlungsziel von 30 Tagen ab Rechnungsdatum.
        </Body>
        <Body>
          2. Soweit es sich nicht um Reparaturrechnungen, amtliche Gebühren oder
          ausgewiesene Nettopreise handelt, gewähren wir bei Zahlung innerhalb
          von 10 Tagen 2 % Skonto.
        </Body>
        <Body>
          3. Bei Zahlungsverzug sind wir unbeschadet weiterer Ansprüche und
          eines Gegenbeweises, dass der Verzugsschaden wesentlich niedriger sei,
          berechtigt, Zinsen in Höhe von 5 % über dem jeweiligen Diskontsatz der
          deutschen Bundesbank zu fordern.
        </Body>
        <Body>
          4. Teilleistungen sind zulässig. Die Rechnungen dafür sind
          entsprechend vorstehender Zahlungsbedingungen zu begleichen.
        </Body>
        <Body>
          5. Wir behalten uns das Eigentumsrecht an der gelieferten Sache bis
          zur vollständigen Zahlung ausdrücklich vor.
        </Body>
        <Body>
          6. Der Besteller ist verpflichtet, solange das Eigentum noch nicht auf
          ihn übergegangen ist, die Kaufsache pfleglich zu behandeln.
          Insbesondere ist er verpflichtet, diese auf eigene Kosten gegen
          Diebstahl-, Feuer- und Wasserschäden ausreichend zum Neuwert zu
          versichern. Müssen Wartungs- und Inspektionsarbeiten durchgeführt
          werden, hat der Besteller diese auf eigene Kosten rechtzeitig
          auszuführen. Solange das Eigentum noch nicht übergegangen ist, hat uns
          der Besteller unverzüglich in Textform zu benachrichtigen, wenn der
          gelieferte Gegenstand gepfändet oder sonstigen Eingriffen Dritter
          ausgesetzt ist. Soweit der Dritte nicht in der Lage ist, uns die
          gerichtlichen und außergerichtlichen Kosten einer Klage gemäß § 771
          ZPO zu erstatten, haftet der Besteller für den uns entstandenen
          Ausfall.
        </Body>
        <Body>
          7. Falls wir uns – worauf kein Anspruch besteht – mit dem Umtausch
          oder der Rückgabe der Ware einverstanden erklären, sind wir berechtigt
          eine Bearbeitungsgebühr von 15 % des Netto-Warenwertes zuzüglich
          Mehrwertsteuer zu berechnen.
        </Body>
        <Body>
          8. Bei einem Nettobestellwert unter 25,00 € behalten wir uns vor,
          einen Mindermengen- Zuschlag in Höhe von 5,00 € zu berechnen. Bei
          eingehenden Reparaturaufträgen mit einem Rechnungswert unter 25,00 €
          (Kleinstmengenaufträge) berechnen wir automatisch eine Pauschale in
          Höhe von 25,00 € zzgl. der gesetzlichen Mehrwertsteuer.
        </Body>
        <Body>
          <strong>V. Haftung, Gefahrübergang und Gewährleistung</strong>
        </Body>
        <Body>
          1. Höhere Gewalt, sowie betriebsfremde Einflüsse befreien uns von der
          Verpflichtung zu Lieferung. Schadenersatzansprüche des Kunden bei
          Lieferungsverzug sind ausgeschlossen, soweit sie nicht auf einer
          vorsätzlichen oder grob fahrlässigen Vertragsverletzung unsererseits
          oder unserer Erfüllungsgehilfen beruhen.
        </Body>
        <Body>
          2. Die Gefahr des zufälligen Untergangs geht auf den Besteller über,
          wenn die Ware unsere Firma in Melsungen verlässt.
        </Body>
        <Body>
          3. Offensichtliche Mängel, ferner Transport- und Verpackungsschäden
          müssen direkt bei Empfang von dem Transportunternehmen quittiert
          werden. Durch die sogenannte reine Quittung erlöschen alle Ansprüche
          auf Schadensersatz - siehe § 438 HGB. Sogenannte verdeckte Schäden
          müssen uns innerhalb 48 Stunden, dokumentiert mit Fotos, gemeldet
          werden. Stark äußerlich beschädigte Sendungen sind sofort zu
          kontrollieren oder zurückzuweisen, da die Ware sonst als anerkannt
          gilt.
        </Body>
        <Body>
          4. Wir verpflichten uns, die Ware bei Fabrikationsfehlern nach
          vorheriger Begutachtung – nach unserer Wahl – entweder nachzubessern,
          oder – falls es sich nicht um eine Sonderanfertigung handelt –
          umzutauschen. Zur Begutachtung ist die beanstandetet Ware franko an
          uns einzusenden. Weitere Ansprüche des Käufers auf Minderung oder
          Wandlung sind ausgeschlossen, es sei denn, dass die Nachbesserung oder
          Ersatzlieferung fehlschlägt. Ansprüche auf Schadenersatz und wegen
          etwaiger Folgeschäden sind gänzlich ausgeschlossen, es sei denn, sie
          beruhen nachweislich auf vorsätzlicher oder grob fahrlässiger
          Vertragsverletzung unsererseits. Im Falle von unverschuldeten
          Fehlfunktionen und Störungen von technischen Einrichtungen, derer wir
          uns zum Einlesen, Übertragen, Speichern und Verarbeiten von Daten
          bedienen, haften wir nicht.
        </Body>
        <Body>
          <strong>VI. Erfüllungsort und Gerichtsstand</strong>
        </Body>
        <Body>
          1. Erfüllungsort für Lieferung und Zahlung und alle beiderseitigen
          Verpflichtungen aus dem Vertrag ist Melsungen.
        </Body>
        <Body>
          2. Ist der Vertragspartner Vollkaufmann oder eine juristische Person
          des öffentlichen Rechts oder ein Öffentlich-rechtliches
          Sondervermögen, so ist ausschließlicher Gerichtsstand für alle
          eventuellen Streitigkeiten über das Zustandekommen, die Abwicklung
          oder Beendigung des jeweiligen Vertrages Melsungen.
        </Body>
        <Body>
          <strong>VII. Gültigkeit</strong>
        </Body>
        <Body>
          Die Unwirksamkeit einzelner Bestimmungen dieser Verkaufs-, Lieferungs-
          und Zahlungsbedingungen lässt die Wirksamkeit der übrigen Bestimmungen
          unberührt.
        </Body>
        <Body className='text-sm text-gray-400'>Stand März 2024</Body>
      </Container>
    </section>
  );
}
