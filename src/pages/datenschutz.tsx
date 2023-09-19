import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';

import { Container } from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/layout/Seo';
import UnderlineLink from '@/components/ui/links/UnderlineLink';

import { data } from '@/constant/data';

const PrivacyPage = (
  _props: InferGetStaticPropsType<typeof getStaticProps>,
) => {
  const { t } = useTranslation('privacy');
  return (
    <Layout>
      <Seo templateTitle={t('seo.title')} />
      <main className='py-16 md:py-24'>
        <Container className='max-w-4xl'>
          <h1 className='mb-8'>{t('headline')}</h1>
          <div className='privacy__content'>
            <p>
              <strong>1. Geltungsbereich</strong>
            </p>
            <p>
              Diese Datenschutzerklärung klärt Nutzer über die Art, den Umfang
              und Zwecke der Erhebung, Verwendung sowie Verarbeitung
              personenbezogener Daten durch den verantwortlichen Anbieter{' '}
              {data.companyName}, {data.street},{data.city},{' '}
              <UnderlineLink href={'mailto:' + data.email}>
                {data.email}
              </UnderlineLink>
              , Telefon: {data.phone} auf. Wir bitten Sie daher, die
              nachfolgenden Ausführungen sorgfältig durchzulesen.
            </p>
            <p>
              Die rechtlichen Grundlagen des Datenschutzes finden sich in der
              Datenschutzgrundverordnung (DSGVO) im Bundesdatenschutzgesetz
              (BDSG) und dem Telemediengesetz (TMG).
            </p>
            <p>
              <strong>2. Erläuterungen der verwendeten Begriffe:</strong>
            </p>
            <p>
              <em>Personenbezogene Daten</em> sind alle Informationen, die sich
              auf eine identifizierte oder identifizierbare natürliche Person
              beziehen. Hierzu zählen z.B. Ihr Name, Ihre Adress- und
              Kommunikationsdaten oder Ihre E-Mailadresse.
            </p>
            <p>
              <em>Verarbeiten</em> meint jeden mit oder ohne Hilfe
              automatisierter Verfahren ausgeführten Vorgang oder jede solche
              Vorgangsreihe im Zusammenhang mit personenbezogenen Daten wie das
              Erheben, das Erfassen, die Organisation, das Ordnen, die
              Speicherung, die Anpassung oder Veränderung, das Auslesen, das
              Abfragen, die Verwendung, die Offenlegung durch Übermittlung,
              Verbreitung oder eine andere Form der Bereitstellung, den Abgleich
              oder die Verknüpfung, die Einschränkung, das Löschen oder die
              Vernichtung.
            </p>
            <p>
              <em>Betroffene Person</em> ist jede identifizierte oder
              identifizierbare natürliche Person, deren personenbezogene Daten
              von dem für die Verarbeitung Verantwortlichen verarbeitet werden.
            </p>
            <p>
              <em>Verantwortlicher</em> oder „für die Verarbeitung
              Verantwortlicher“ ist die natürliche oder juristische Person,
              Behörde, Einrichtung oder andere Stelle, die allein oder gemeinsam
              mit anderen über die Zwecke und Mittel der Verarbeitung von
              personenbezogenen Daten entscheidet.
            </p>
            <p>
              <em>Nutzer</em> umfasst alle Kategorien von der Datenverarbeitung
              betroffener Personen. Zu ihnen gehören unsere Geschäftspartner und
              sonstige Besucher unserer Webseite.
            </p>
            <p>
              Bei den verwendeten Begrifflichkeiten verweisen wir darüber hinaus
              auf die Definitionen in Art. 4 der Datenschutzgrundverordnung
              (DSGVO). Die verwendeten Begrifflichkeiten wie z.B. „Nutzer“ sind
              geschlechtsneutral zu verstehen.
            </p>
            <p>
              <strong>3. Name und Anschrift des Verantwortlichen</strong>
            </p>
            <p>
              {data.companyName}
              <br />
              {data.street}
              <br />
              {data.city}
            </p>
            <p>Geschäftsführer: {data.ceo}</p>
            <p>
              Tel.: {data.phone}
              <br />
              Fax: {data.fax}
            </p>
            <p>
              E-Mail:{' '}
              <UnderlineLink href={'mailto:' + data.email}>
                {data.email}
              </UnderlineLink>
            </p>
            <p>
              Vertreter des Verantwortlichen ist der Datenschutzbeauftragte Marc
              Dücker.
            </p>
            <p>
              <strong>4. Datenschutzbeauftragter</strong>
            </p>
            <p>
              Sie können unseren Datenschutzbeauftragten über die E-Mailadresse{' '}
              <UnderlineLink href={'mailto:' + data.email}>
                {data.email}
              </UnderlineLink>{' '}
              oder über unsere Postadresse mit dem Zusatz „der
              Datenschutzbeauftragte“ kontaktieren.
            </p>
            <p>
              <strong>5. Minderjährige</strong>
            </p>
            <p>
              Personen unter 18 Jahren dürfen ohne Zustimmung ihrer Eltern oder
              Erziehungsberechtigten unsere Webseiten nicht nutzen und keine
              personenbezogenen Daten an uns übermitteln. Wir sammeln daher
              wissentlich keine personenbezogenen Daten von Minderjährigen. Wenn
              wir erkennen, dass Minderjährige ohne Zustimmung über unsere
              Webseiten personenbezogenen Daten eingeben oder über diese
              personenbezogenen Daten eingegeben werden, löschen wir diese Daten
              unverzüglich.
            </p>
            <p>
              <strong>6. Verarbeitung personenbezogener Daten</strong>
            </p>
            <p>
              <strong>6.1. Besuch unserer Website</strong>
            </p>
            <p>
              <strong>6.1.1. Umfang der Datenverarbeitung</strong>
            </p>
            <p>
              Wenn Sie unsere Website besuchen, überträgt Ihr Browser auch
              technischen Gründen bestimmte Daten an unseren Webserver. Dabei
              handelt es sich um folgende Daten (sogenannte Serverlogfiles):
            </p>
            <ul>
              <li>IP-Adresse</li>
              <li>Datum und Uhrzeit der Anfrage</li>
              <li>Zeitzonendifferenz zur Greenwich Mean Time (GMT)</li>
              <li>Inhalt der Anforderung (konkrete Seite)</li>
              <li>
                Betriebssystem und dessen Zugriffsstatus / HTTP-Statuscode
              </li>
              <li>Übertragene Datenmenge</li>
              <li>Website, von der die Anforderung kommt („Referrer-URL“)</li>
              <li>Browser, Sprache und Version der Browsersoftware</li>
            </ul>
            <p>
              <strong>6.1.2. Zweck der Datenverarbeitung</strong>
            </p>
            <p>
              Die Speicherung dieser Daten in Logfiles ist notwendig, um die
              Funktionsfähigkeit der Website sicherzustellen. Sie dienen uns zur
              Optimierung der Website und zur Sicherstellung der Sicherheit
              unserer informationstechnischen Systeme.
            </p>
            <p>
              <strong>6.1.3. Rechtsgrundlage der Verarbeitung</strong>
            </p>
            <p>
              Diese Daten erheben wir auf Grundlage unseres berechtigten
              Interesses im Sinne des Art. 6 Abs. 1 lit. f) DSGVO, um unsere
              Website anzeigen zu können und ihre Sicherheit zu gewährleisten.
            </p>
            <p>
              <strong>6.1.4. Dauer der Speicherung</strong>
            </p>
            <p>
              Informationen in den Logfiles werden aus Sicherheitsgründen (z.B.
              zur Aufklärung von Missbrauchs- oder Betrugshandlungen) für die
              Dauer von maximal sieben Tagen gespeichert und danach gelöscht.
              Daten, deren weitere Aufbewahrung zu Beweiszwecken erforderlich
              ist, sind bis zur endgültigen Klärung des jeweiligen Vorfalls von
              der Löschung ausgenommen.
            </p>
            <p>
              <strong>6.1.5. Widerspruchs- und Beseitigungsmöglichkeit</strong>
            </p>
            <p>
              Die Erfassung der Daten zur Bereitstellung der Website und ihre
              Speicherung in Logfiles ist für den Betrieb aus technischen
              Gründen zwingend erforderlich. Es besteht folglich seitens des
              Nutzers keine Widerspruchsmöglichkeit.
            </p>
            <p>
              <strong>6.2. Kontaktformular und E-Mail-Kontakt</strong>
            </p>
            <p>
              <strong>6.2.1. Umfang der Datenverarbeitung</strong>
            </p>
            <p>
              Wenn Sie das Kontaktformular auf unserer Website benutzen, werden
              folgende Daten an uns übermittelt: Ihr Name*, Ihre E-Mailadresse*,
              Betreff*, Thema, Ihre Nachricht. Die mit * gekennzeichneten Felder
              sind Pflichtfelder.
            </p>
            <p>
              Alternativ ist eine Kontaktaufnahme über von uns – je nach
              Anliegen – zur Verfügung gestellten E-Mailadressen möglich. In
              diesen Fällen werden die mit der E-Mail übermittelten
              personenbezogenen Daten des Absenders verarbeitet.
            </p>
            <p>
              Es erfolgt in diesem Zusammenhang keine Weitergabe der Daten an
              Dritte. Die Daten werden ausschließlich für die Verarbeitung der
              Konversation und zur Bearbeitung des Anliegens verwendet.
            </p>
            <p>
              <strong>6.2.2. Zweck der Datenverarbeitung</strong>
            </p>
            <p>
              Die Verarbeitung der personenbezogenen Daten aus der Eingabemaske
              dient uns zur Bearbeitung der Kontaktaufnahme. Im Falle einer
              Kontaktaufnahme per E-Mail liegt hieran auch das erforderliche
              berechtigte Interesse an der Verarbeitung der Daten. Die sonstigen
              während des Absendevorgangs verarbeiteten personenbezogenen Daten
              (z.B. IP-Adresse, Datum, Uhrzeit) dienen dazu, einen Missbrauch
              des Kontaktformulars zu verhindern und die Sicherheit unserer
              informationstechnischen Systeme sicherzustellen.
            </p>
            <p>
              <strong>6.2.3. Rechtsgrundlage der Verarbeitung</strong>
            </p>
            <p>
              Bei der Kontaktaufnahme mit uns (per Kontaktformular oder E-Mail)
              werden die Angaben des Nutzers zur Bearbeitung der Kontaktanfrage
              und deren Abwicklung gem. Art. 6 Abs. 1 lit. b) DSGVO verarbeitet.
            </p>
            <p>
              <strong>6.2.4. Dauer der Speicherung</strong>
            </p>
            <p>
              Wir löschen personenbezogene Daten, wenn sie für die Erreichung
              des Zweckes ihrer Erhebung nicht mehr erforderlich sind. Für die
              personenbezogenen Daten aus der Eingabemaske des Kontaktformulars
              und diejenigen, die per E-Mail übersandt wurden, ist dies dann der
              Fall, wenn die jeweilige Konversation mit dem Nutzer beendet ist.
              Beendet ist die Konversation dann, wenn sich aus den Umständen
              entnehmen lässt, dass der betroffene Sachverhalt oder das
              Informationsbegehren abschließend geklärt ist.
            </p>
            <p>
              <strong>6.2.5. Widerspruchs- und Beseitigungsmöglichkeit</strong>
            </p>
            <p>
              Sie haben jederzeit die Möglichkeit, Ihre Einwilligung zur
              Verarbeitung der personenbezogenen Daten zu widerrufen.
            </p>
            <p>
              Wenn Sie mit uns über E-Mail kontaktieren, können Sie der
              Speicherung Ihrer personenbezogener Daten jederzeit widersprechen.
              In diesem Fall kann unsere Konversation natürlich nicht mehr
              fortgeführt werden. Einen solchen Widerruf richten Sie bitte an{' '}
              <UnderlineLink href={'mailto:' + data.email}>
                {data.email}
              </UnderlineLink>
              . Alle personenbezogenen Daten, die im Zuge der Kontaktaufnahme
              gespeichert wurden, werden dann gelöscht.
            </p>
            <p>
              <strong>
                6.3. Vertragliche Leistungen für Gesundheitsvorsorge,
                therapeutische Dienstleistungen und Coaching
              </strong>
            </p>
            <p>
              <strong>6.3.1. Umfang der Datenverarbeitung</strong>
            </p>
            <p>
              Wir verarbeiten die Daten unserer Patienten und Interessenten
              sowie anderer Auftraggeber oder Vertragspartner entsprechend Art.
              6 Abs. 1 lit. b) DSGVO, um unsere vertraglichen oder
              vorvertraglichen Leistungen zu erbringen. Die hierbei
              verarbeiteten Daten, die Art, der Umfang und der Zweck und die
              Erforderlichkeit ihrer Verarbeitung, bestimmen sich nach dem
              zugrundeliegenden Vertragsverhältnis. Zu den verarbeiteten Daten
              gehören grundsätzlich Bestands- und Stammdaten der Patienten
              (z.B., Name, Adresse, etc.), als auch die Kontaktdaten (z.B.,
              E-Mailadresse, Telefon, etc.), die Vertragsdaten (z.B., in
              Anspruch genommene Leistungen, erworbene Produkte, Kosten, Namen
              von Kontaktpersonen) und Zahlungsdaten (z.B., Bankverbindung,
              Zahlungshistorie, etc.).
            </p>
            <p>
              Im Rahmen unserer Leistungen, können wir ferner besondere
              Kategorien von Daten gem. Art. 9 Abs. 1 DSGVO, hier insbesondere
              Angaben zur Gesundheit der Patienten, verarbeiten. Hierzu holen
              wir, sofern erforderlich, gem. Art. 6 Abs. 1 lit. a., Art. 7, Art.
              9 Abs. 2 lit. a. DSGVO eine ausdrückliche Einwilligung der
              Patienten ein und verarbeiten die besonderen Kategorien von Daten
              ansonsten zu Zwecken der Gesundheitsvorsorge auf Grundlage des
              Art. 9 Abs. 2 lit h. DSGVO, § 22 Abs. 1 Nr. 1 b. BDSG.
            </p>
            <p>
              Ferner speichern wir auf Grundlage unserer
              betriebswirtschaftlichen Interessen Angaben zu Lieferanten,
              Veranstaltern und sonstigen Geschäftspartnern, z.B. zwecks
              späterer Kontaktaufnahme. Diese mehrheitlich unternehmensbezogenen
              Daten, speichern wir grundsätzlich dauerhaft.
            </p>
            <p>
              <strong>6.3.2. Zweck der Datenverarbeitung</strong>
            </p>
            <p>
              Sofern für die Vertragserfüllung oder gesetzlich erforderlich,
              offenbaren oder übermitteln wir die Daten der Patienten im Rahmen
              der Kommunikation mit medizinischen Fachkräften, an der
              Vertragserfüllung erforderlicherweise oder typischerweise
              beteiligten Dritten, wie z.B. Labore, Abrechnungsstellen oder
              vergleichbare Dienstleister, sofern dies der Erbringung unserer
              Leistungen gem. Art. 6 Abs. 1 lit b. DSGVO dient, gesetzlich gem.
              Art. 6 Abs. 1 lit c. DSGVO vorgeschrieben ist, unseren Interessen
              oder denen der Patienten an einer effizienten und kostengünstigen
              Gesundheitsversorgung als berechtigtes Interesse gem. Art. 6 Abs.
              1 lit f. DSGVO dient oder gem. Art. 6 Abs. 1 lit d. DSGVO
              notwendig ist, um lebenswichtige Interessen der Patienten oder
              einer anderen natürlichen Person zu schützen oder im Rahmen einer
              Einwilligung gem. Art. 6 Abs. 1 lit. a., Art. 7 DSGVO.
            </p>
            <p>
              <strong>6.3.3. Rechtsgrundlage der Verarbeitung</strong>
            </p>
            <p>
              Diese Daten verarbeiten wir zur Durchführung vertraglicher
              Dienstleistungen. Rechtsgrundlage hierfür ist Art. 6 Abs. 1 lit.
              b. DSGVO.
            </p>
            <p>
              <strong>6.3.4. Dauer der Speicherung</strong>
            </p>
            <p>
              Die bei uns gespeicherten Daten werden gelöscht, sobald sie für
              ihre Zweckbestimmung nicht mehr erforderlich sind und der Löschung
              keine gesetzlichen Fürsorgepflichten, Aufbewahrungspflichten sowie
              etwaigen Gewährleistungs- und vergleichbaren Pflichten
              entgegenstehen. Aufbewahrungspflichten ergeben sich aus handels-
              und steuerrechtlichen Gründen. Nach gesetzlichen Vorgaben erfolgt
              die Aufbewahrung für 6 Jahre gemäß § 257 Abs. 1 HGB
              (Handelsbriefe, Buchungsbelege.) sowie für 10 Jahre gemäß § 147
              Abs. 1 AO (z.B. Buchungsbelege, Handels- und Geschäftsbriefe, für
              Besteuerung relevante Unterlagen). Die Erforderlichkeit der
              Aufbewahrung der Daten wird alle drei Jahre überprüft.
            </p>
            <p>
              <strong>6.3.5. Widerspruchs- und Beseitigungsmöglichkeit</strong>
            </p>
            <p>
              Die im Zusammenhang mit einer Bestellung verarbeiteten Daten
              unterliegen handels- und steuerrechtlichen Aufbewahrungspflichten.
              Es besteht folglich Seitens des Nutzers keine
              Widerspruchsmöglichkeit.
            </p>
            <p>
              <strong>6.4. Bewerbungen</strong>
            </p>
            <p>
              <strong>6.4.1. Umfang der Datenverarbeitung</strong>
            </p>
            <p>
              Wenn Sie an einer Mitarbeit in unserem Unternehmen interessiert
              sind, können Sie sich bei uns online bewerben. Unter dem Menüpunkt
              „Karriere“ werden bei Verfügbarkeit Stellenangebote
              ausgeschrieben. Sie können sich auch initiativ bewerben. Wenn Sie
              sich per E-Mail bei uns bewerben, verarbeiten wir die Daten, die
              Sie uns übermittelt haben, zur Durchführung des
              Bewerbungsverfahrens.
            </p>
            <p>
              <strong>6.4.2. Zweck der Datenverarbeitung</strong>
            </p>
            <p>
              Wir verarbeiten die Daten, die Sie uns im Zusammenhang mit Ihrer
              Bewerbung zugesendet haben, um Ihre Eignung für die Stelle (oder
              ggf. andere offene Positionen in unseren Unternehmen) zu prüfen
              und das Bewerbungsverfahren durchzuführen.
            </p>
            <p>
              <strong>6.4.3. Rechtsgrundlage der Verarbeitung</strong>
            </p>
            <p>
              Rechtsgrundlage ist § 26 Abs. 1 BDSG-neu. Danach ist die
              Verarbeitung der Daten zulässig, die im Zusammenhang mit der
              Entscheidung über die Begründung eines Beschäftigungsverhältnisses
              erforderlich sind. Sollten die Daten nach Abschluss des
              Bewerbungsverfahrens ggf. zur Rechtsverfolgung erforderlich sein,
              kann eine Datenverarbeitung auf Basis der Voraussetzungen von Art.
              6 DSGVO, insbesondere zur Wahrnehmung von berechtigten Interessen
              nach Art. 6 Abs. 1 lit. f) DSGVO erfolgen. Unser Interesse besteht
              dann in der Geltendmachung oder Abwehr von Ansprüchen
            </p>
            <p>
              <strong>6.4.4. Empfänger der Datenverarbeitung</strong>
            </p>
            <p>
              Ihre Bewerberdaten werden nach Eingang Ihrer Bewerbung von der
              Personalabteilung gesichtet. Geeignete Bewerbungen werden dann
              intern an die Abteilungsverantwortlichen für die jeweils offene
              Position weitergeleitet. Dann wird der weitere Ablauf abgestimmt.
              Im Unternehmen haben grundsätzlich nur die Personen Zugriff auf
              Ihre Daten, die dies für den ordnungsgemäßen Ablauf unseres
              Bewerbungsverfahrens benötigen.
            </p>
            <p>
              <strong>6.4.5. Dauer der Speicherung</strong>
            </p>
            <p>
              Wenn die Bewerbung zu einem Beschäftigungsverhältnis führt,
              verarbeiten wir diese Daten für die Durchführung eines
              Beschäftigungsverhältnisses. Diese werden dann in unser
              Personalverwaltungssystem aufgenommen.
            </p>
            <p>
              Wenn die Bewerbung zu keinem Beschäftigungsverhältnis führt,
              werden diese Daten unter Berücksichtigung der Klagefrist des AGG 3
              Monate nach Beendigung des Bewerbungsverfahrens gelöscht, es sei
              denn, der Bewerber hat eine Einwilligung nach Art. 6 Abs. 1 lit a)
              DSGVO und Art. 7 DSGVO zur längerfristigen Aufbewahrung seiner
              personenbezogenen Daten erteilt, um ggf. bei neuen
              Stellenangeboten berücksichtigt werden zu können.
            </p>
            <p>
              <strong>6.4.6. Widerspruchs- und Beseitigungsmöglichkeit</strong>
            </p>
            <p>
              Die von Ihnen an uns übermittelten Informationen können Sie
              jederzeit auf Anfrage erneuern oder löschen lassen. Hierfür senden
              Sie uns bitte eine E-Mail an{' '}
              <UnderlineLink href={'mailto:' + data.email}>
                {data.email}
              </UnderlineLink>
              . Dies gilt nicht, soweit Sie sich in einem laufenden
              Bewerbungsverfahren um eine konkrete Position bei uns beworben
              haben. In diesem Fall speichern wir die von Ihnen für diese
              Position angegebenen Informationen bis zum Ablauf der gesetzlichen
              Klagefristen (insbes. § 15 AGG).
            </p>
            <p>
              <strong>6.5. Cookies</strong>
            </p>
            <p>
              <strong>6.5.1. Umfang der Datenverarbeitung</strong>
            </p>
            <p>
              Unsere Website verwendet Cookies. Cookies sind kleine Textdateien,
              die beim Aufruf unserer Webseite auf Ihrem Rechner gespeichert
              werden. Cookies richten auf Ihrem Computer keinen Schaden an und
              enthalten keine Schadsoftware wie z.B. Viren. Cookies enthalten
              eine charakteristische Zeichenfolge, die eine eindeutige
              Identifizierung des Browsers beim erneuten Aufrufen der Website
              ermöglicht. Einige Elemente unserer Website erfordern es, dass der
              aufrufende Browser auch nach einem Seitenwechsel identifiziert
              werden kann.
            </p>
            <p>
              Dies erfolgt nicht durch eine Zuordnung zu Ihnen persönlich,
              sondern durch Zuweisung einer Identifikationsnummer zu dem Cookie
              („Cookie-ID“). Eine Zusammenführung der Cookie-ID mit Ihrem Namen,
              Ihrer IP-Adresse oder mit ähnlichen Daten, die eine Zuordnung des
              Cookies zu Ihnen ermöglichen würden, erfolgt nicht.
            </p>
            <p>Diese Website nutzt transiente und persistente Cookies.</p>
            <p>
              1. Transiente Cookies werden automatisch gelöscht, wenn Sie den
              Browser schließen. Dazu zählen insbesondere sogenannte
              Session-Cookies. Diese speichern eine sogenannte Session-ID, mit
              der sich verschiedene Anfragen Ihres Browsers der gemeinsamen
              Sitzung zuordnen lassen. Wenn Sie auf unsere Website zurückkehren,
              kann Ihr Rechner wiedererkannt werden. Die Session-Cookies werden
              gelöscht, wenn Sie sich ausloggen bzw. den Browser schließen.
            </p>
            <p>
              2. Persistente Cookies werden automatisiert nach einer
              vorgegebenen Dauer gelöscht, die sich je nach Cookie unterscheiden
              kann. Sie können die Cookies in den Sicherheitseinstellungen Ihres
              Browsers jederzeit löschen.
            </p>
            <p>
              <strong>6.5.2. Zweck der Datenverarbeitung</strong>
            </p>
            <p>
              Wir verwenden Cookies um unsere Website attraktiv und
              nutzerfreundlich zu gestalten, sie zu verbessern und Anfragen zu
              beschleunigen.
            </p>
            <p>
              Einige Elemente unserer Internetseite erfordern es, dass der
              aufrufende Browser auch nach einem Seitenwechsel identifiziert
              werden kann. Für diese ist es erforderlich, dass der Browser auch
              nach einem Seitenwechsel wiedererkannt wird.
            </p>
            <p>
              <strong>6.5.3. Rechtsgrundlage der Datenverarbeitung</strong>
            </p>
            <p>
              Die Rechtsgrundlage für die Verarbeitung personenbezogener Daten
              unter Verwendung der technisch notwendigen Cookies ist Art. 6 Abs.
              1 lit. f DSGVO.
            </p>
            <p>
              <strong>6.5.4. Dauer der Speicherung</strong>
            </p>
            <p>
              Session-Cookies werden gelöscht, sobald der Browser geschlossen
              wird.
            </p>
            <p>
              Persistente Cookies werden automatisiert nach einer vorgegebenen
              Dauer gelöscht.
            </p>
            <p>
              <strong>6.5.5. Widerspruchs- und Beseitigungsmöglichkeit</strong>
            </p>
            <p>
              Sie haben als Nutzer die volle Kontrolle über die Verwendung von
              Cookies. Durch eine Änderung der Einstellungen in Ihrem
              Internetbrowser können Sie diesen so einstellen, dass Cookies gar
              nicht gespeichert oder am Ende Ihrer Internetsitzung automatisch
              gelöscht werden. Hierzu wählen sie in den Einstellungen Ihres
              Browsers „keine Cookies akzeptieren“. Im Microsoft
              Internet-Explorer wählen Sie hierzu „Extras &gt; Internetoptionen
              &gt; Datenschutz &gt; Einstellung“; In Firefox wählen Sie „Extras
              &gt; Einstellungen &gt; Datenschutz &gt; Cookies“); Wenn Sie einen
              anderen Internet-Browser verwenden, dann entnehmen Sie bitte der
              Hilfefunktion des Browser die Anweisungen bezüglich der
              Verhinderung sowie Löschung von Cookies.
            </p>
            <p>
              Bitte beachten Sie dabei aber, dass Sie in diesem Fall
              gegebenenfalls nicht sämtliche Funktionen unserer Webseite nutzen
              können.
            </p>
            <p>
              <strong>6.6. Webanalyse</strong>
            </p>
            <p>
              <strong>6.6.1. Umfang der Datenverarbeitung</strong>
            </p>
            <p>
              Wir verwenden auf unserer Website Google Analytics, einen
              Webanalysedienst der Google Inc., 1600 Amphitheatre Parkway,
              Mountain View, CA 94043, United States („Google“).
            </p>
            <p>
              Google analysiert in unserem Auftrag Ihre Nutzung unserer Website.
              Hierfür verwenden wir u.a. Cookies. Was Cookies sind und wie diese
              gelöscht werden können, haben wir oben im Kapitel „Cookies“
              beschrieben.
            </p>
            <p>
              Die dabei von Google erhobenen Informationen über Ihre Nutzung
              dieser Website (z.B. die bei uns besuchte Seiten) werden an einen
              Server von Google in die USA übertragen, dort gespeichert,
              analysiert und das Ergebnis uns in anonymisierter Form zur
              Verfügung gestellt.
            </p>
            <p>
              Auf unserer Website verwenden wir die von Google angebotene
              IP-Anonymisierung. Hierbei wird Ihre IP-Adresse von Google
              innerhalb von Mitgliedstaaten der Europäischen Union oder in
              anderen Vertragsstaaten des Abkommens über den Europäischen
              Wirtschaftsraum zuvor gekürzt. Nur in Ausnahmefällen wird die
              volle IP-Adresse an einen Server von Google in den USA übertragen
              und dort gekürzt.
            </p>
            <p>
              Google ist im EU-US Privacy Shield{' '}
              <UnderlineLink href='https://www.privacyshield.gov/participant?id=a2zt000000001L5AAI'>
                https://www.privacyshield.gov/participant?id=a2zt000000001L5AAI
              </UnderlineLink>{' '}
              zertifiziert, das für Daten bei Google in den USA ein angemessenes
              Datenschutzniveau gewährleistet.
            </p>
            <p>
              <strong>6.6.2. Zweck der Datenverarbeitung</strong>
            </p>
            <p>
              In unserem Auftrag benutzt Google diese Informationen, um die
              Nutzung unserer Website auszuwerten und um Reports über die
              Aktivitäten innerhalb unserer Website zusammenzustellen. Dies
              ermöglicht uns Ihre Online-Erfahrung besser zu gestalten und die
              Nutzerfreundlichkeit unserer Website zu erhöhen.
            </p>
            <p>
              <strong>6.6.3. Rechtsgrundlage der Verarbeitung</strong>
            </p>
            <p>
              In den oben genannten Zwecken liegt unser berechtigtes Interesse
              an der Datenverarbeitung durch Google Analytics. Rechtsgrundlage
              ist Art. 6 Abs. 1 lit. f DSGVO.
            </p>
            <p>
              <strong>6.6.4. Dauer der Speicherung</strong>
            </p>
            <p>
              Sitzungen und Kampagnen werden nach Ablauf einer bestimmten
              Zeitspanne beendet. Standardmäßig werden Sitzungen nach 30 Minuten
              ohne Aktivität und Kampagnen nach sechs Monaten beendet. Das
              Zeitlimit für Kampagnen kann maximal zwei Jahre betragen.
            </p>
            <p>
              <strong>6.6.5. Widerspruchs- und Beseitigungsmöglichkeit</strong>
            </p>
            <p>
              Die von Ihrem Browser übermittelte IP-Adresse wird nicht mit
              anderen Daten von Google zusammengeführt. Sie können der
              Speicherung der Cookies durch eine entsprechende Einstellung ihrer
              Browser-Software verhindern, wie oben im Kapitel „cookies“
              beschrieben. Sie können darüber hinaus die Erfassung der durch das
              Cookie erzeugten und auf ihre Nutzung unserer Website bezogenen
              Daten an Google sowie die Verarbeitung dieser Daten durch Google
              verhindern, indem sie das verfügbare Browser-Plugin von Google
              herunterladen und installieren:{' '}
              <UnderlineLink href='https://tools.google.com/dlpage/gaoptout?hl=de'>
                https://tools.google.com/dlpage/gaoptout?hl=de
              </UnderlineLink>
              .
            </p>
            <p>
              Wenn Sie die zukünftige Erfassung Ihrer Daten durch Google
              Analytics beim Besuch unserer Webseite über verschiedene Geräte
              (insbesondere mobile Geräte wie Smartphones oder Tablets)
              verhindern möchten, müssen Sie das Opt-Out auf allen genutzten
              Systemen durchführen. Wenn Sie hier klicken, wird dieses
              Opt-Out-Cookie gesetzt.
            </p>
            <p>
              Bitte beachten Sie, dass dieses Opt-Out-Cookie nur so lange eine
              Webanalyse verhindert, wie sie es nicht gelöscht haben. Weitere
              Informationen zu Google Analytics erhalten Sie in den Google
              Analytics Nutzungsbedingungen{' '}
              <UnderlineLink href='https://www.google.de/analytics/terms/de.html'>
                https://www.google.de/analytics/terms/de.html
              </UnderlineLink>
              , in den Sicherheits- und Datenschutzgrundsätzen von Google
              Analytics{' '}
              <UnderlineLink href='https://support.google.com/analytics/answer/6004245?hl=de'>
                https://support.google.com/analytics/answer/6004245?hl=de
              </UnderlineLink>{' '}
              sowie in der der Google Datenschutzerklärung{' '}
              <UnderlineLink href='https://www.google.de/intl/de/policies/privacy/'>
                https://www.google.de/intl/de/policies/privacy/
              </UnderlineLink>
              .
            </p>
            <p>
              <strong>7. Datensicherheit</strong>
            </p>
            <p>
              Wir treffen technische, vertragliche und organisatorische
              Maßnahmen zur Sicherheit der Datenverarbeitung entsprechend dem
              Stand der Technik. Damit stellen wir sicher, dass die Vorschriften
              der Datenschutzgesetze, insbesondere der
              Datenschutz-Grundverordnung, eingehalten werden und die durch uns
              verarbeiteten Daten gegen Vernichtung, Verlust, Veränderung und
              unberechtigte Zugriffe geschützt sind. Zu diesen
              Sicherheitsmaßnahmen zählt auch die verschlüsselte Übertragung von
              Daten zwischen Ihrem Browser und unseren Servern. Bitte beachten
              Sie, dass die SSL-Verschlüsselung bei über das Internet
              ausgeführten Übertragungen nur dann aktiviert ist, wenn das
              Schlüsselsymbol in der unteren Menüleiste Ihres Browserfensters
              erscheint und die Adresse mit https:// beginnt. Durch SSL (Secure
              Socket Layer) wird die Datenübertragung mit einer
              Verschlüsselungstechnologie vor illegalem Datenzugriff Dritter
              geschützt. Sollte diese Option nicht zur Verfügung stehen, können
              Sie sich auch dafür entscheiden, bestimmte Daten nicht über das
              Internet zu versenden.
            </p>
            <p>
              Alle Informationen, die Sie an uns übermitteln, werden auf unseren
              Servern in der Bundesrepublik Deutschland gespeichert und
              verarbeitet.
            </p>
            <p>
              <strong>
                8. Weitergabe von Daten an Dritte und Drittanbieter
              </strong>
            </p>
            <p>
              Eine Weitergabe von Daten an Dritte erfolgt nur im Rahmen der
              gesetzlichen Vorgaben. Wir geben die Daten der Nutzer an Dritte
              nur dann weiter, wenn dies z.B. auf Grundlage des Art. 6 Abs. 1
              lit. b) DSGVO für Vertragszwecke erforderlich ist, wir dazu
              gesetzliche verpflichtet sind (Art. 6 Abs.1 lit. c) DSGVO oder auf
              Grundlage berechtigter Interessen gem. Art. 6 Abs. 1 lit. f. DSGVO
              am wirtschaftlichen und effektivem Betrieb unseres
              Geschäftsbetriebes.
            </p>
            <p>
              Wir setzen im Rahmen einer Auftragsverarbeitung gem. Art. 28 DSGVO
              Subunternehmer für die Erbringung unserer Leistungen, insbesondere
              für den Betrieb, die Wartung und das Hosting der Website ein. Wir
              haben geeignete rechtliche Vorkehrungen sowie entsprechende
              technische und organisatorische Maßnahmen getroffen, um für den
              Schutz der personenbezogenen Daten gemäß den einschlägigen
              gesetzlichen Vorschriften zu sorgen.
            </p>
            <p>
              <strong>
                9. Externe Dienste und Inhalte auf unserer Website
              </strong>
            </p>
            <p>
              Wir binden externe Dienste oder Inhalte auf unserer Website ein.
              Dies erfolgt auf Grundlage unserer berechtigten Interessen an der
              Analyse, Optimierung und wirtschaftlichen Betrieb unsers
              Onlineangebots im Sinne des Art. 6 Abs. 1 lit. f) DSGVO.
            </p>
            <p>
              Bei Verwendung eines solchen Dienstes oder der Anzeige Inhalte
              Dritter werden aus technischen Gründen Kommunikationsdaten wie
              z.B. Datum, Uhrzeit und IP-Adresse zwischen Ihnen und dem
              jeweiligen Anbieter ausgetauscht. Hierbei handelt es sich
              insbesondere um Ihre IP-Adresse, die für die Darstellung von
              Inhalten in Ihrem Browser erforderlich ist. Weitere Informationen
              über Zweck und Umfang der Erhebung und Verarbeitung Ihrer Daten
              entnehmen Sie daher bitte den Datenschutzhinweisen der jeweils
              datenschutzrechtlich verantwortlichen Anbieter der von uns
              eingebundenen Dienste bzw. Inhalte. Die nachfolgende Aufzählung
              bietet eine Übersicht von Drittanbietern sowie ihrer Inhalte und
              Links zu deren Datenschutzerklärungen, die weitere Hinweise zur
              Verarbeitung von Daten und Widerspruchsmöglichkeiten enthalten.
            </p>
            <ul>
              <li>
                Google Maps zur Darstellung von Karten, Standorten und für die
                Routenplanung. Angeboten von: Google Inc., 1600 Amphitheatre
                Parkway, Mountain View, CA 94043, USA. Datenschutzerklärung:
                <UnderlineLink href='https://www.google.com/policies/privacy/'>
                  https://www.google.com/policies/privacy/
                </UnderlineLink>
                , Hinweise / Widerspruch / Opt-Out-Möglichkeit:
                <UnderlineLink href='https://www.google.com/settings/ads/'>
                  https://www.google.com/settings/ads/
                </UnderlineLink>
                , Privacy-Shield-Abkommen:
                <UnderlineLink href='https://www.privacyshield.gov/participant?id=a2zt000000001L5AAI&amp;status=Active'>
                  https://www.privacyshield.gov/participant?id=a2zt000000001L5AAI&amp;status=Active
                </UnderlineLink>
              </li>
              <li>
                Google Tag Manager zur Verwaltung von Website-Tags über eine
                Oberfläche (z.B. Google Analytics und weitere
                Google-Marketing-Dienste). Angeboten von: Google Inc., 1600
                Amphitheatre Parkway, Mountain View, CA 94043, USA.
                Datenschutzerklärung:
                <UnderlineLink href='https://www.google.com/intl/de/tagmanager/use-policy.html'>
                  https://www.google.com/intl/de/tagmanager/use-policy.html
                </UnderlineLink>
                , Hinweise / Widerspruch / Opt-Out-Möglichkeit:
                <UnderlineLink href='https://www.google.com/settings/ads/'>
                  https://www.google.com/settings/ads/
                </UnderlineLink>
                Privacy-Shield-Abkommen:
                <UnderlineLink href='https://www.privacyshield.gov/participant?id=a2zt000000001L5AAI&amp;status=Active'>
                  https://www.privacyshield.gov/participant?id=a2zt000000001L5AAI&amp;status=Active
                </UnderlineLink>
              </li>
              <li>
                Google AdWords zur Platzierung von Anzeigen im
                Google-Werbe-Netzwerk (z.B. in Suchergebnissen, in Videos, auf
                Webseiten, etc.). Angeboten von: Google Inc., 1600 Amphitheatre
                Parkway, Mountain View, CA 94043, USA. Datenschutzerklärung:
                <UnderlineLink href='https://policies.google.com/technologies/ads'>
                  https://policies.google.com/technologies/ads
                </UnderlineLink>
                , Hinweise / Widerspruch / Opt-Out-Möglichkeit:
                <UnderlineLink href='https://adssettings.google.com/authenticated'>
                  https://adssettings.google.com/authenticated
                </UnderlineLink>
                , Privacy-Shield-Abkommen:
                <UnderlineLink href='https://www.privacyshield.gov/participant?id=a2zt000000001L5AAI&amp;status=Active'>
                  https://www.privacyshield.gov/participant?id=a2zt000000001L5AAI&amp;status=Active
                </UnderlineLink>
              </li>
              <li>
                Google Fonts zur Darstellung der Schriftarten Google Fonts.
                Angeboten von: Google Inc., 1600 Amphitheatre Parkway, Mountain
                View, CA 94043, USA, ein. Datenschutzerklärung:
                <UnderlineLink href='https://www.google.com/policies/privacy/'>
                  https://www.google.com/policies/privacy/
                </UnderlineLink>
                , Hinweise / Widerspruch / Opt-Out-Möglichkeit:
                <UnderlineLink href='https://adssettings.google.com/authenticated'>
                  https://adssettings.google.com/authenticated
                </UnderlineLink>
                , Privacy-Shield-Abkommen:
                <UnderlineLink href='https://www.privacyshield.gov/participant?id=a2zt000000001L5AAI&amp;status=Active'>
                  https://www.privacyshield.gov/participant?id=a2zt000000001L5AAI&amp;status=Active
                </UnderlineLink>
                .
              </li>
              <li>
                Adobe Typekit zur Darstellung der Schriftarten Typekit.
                Angeboten von: Adobe Systems Software Ireland Limited, 4-6
                Riverwalk, Citywest Business Campus, Dublin 24, Ireland.
                Datenschutzerklärung:
                <UnderlineLink
                  href='https://www.adobe.com/de/privacy/policy.html'
                  className='broken_link'
                >
                  https://www.adobe.com/de/privacy/policy.html
                </UnderlineLink>
                , Hinweise / Widerspruch / Opt-Out-Möglichkeit:
                <UnderlineLink
                  href='https://www.adobe.com/de/privacy/opt-out.html'
                  className='broken_link'
                >
                  https://www.adobe.com/de/privacy/opt-out.html
                </UnderlineLink>
                , Privacy-Shield-Abkommen:
                <UnderlineLink href='https://www.privacyshield.gov/participant?id=a2zt0000000TNo9AAG&amp;status=Active'>
                  https://www.privacyshield.gov/participant?id=a2zt0000000TNo9AAG&amp;status=Active
                </UnderlineLink>
              </li>
              <li>
                Font Awesome zur Darstellung von schriftbasierten
                Symbolen/Icon-Sammlungen. Angeboten von: Fonticons Inc., 710
                Blackhorn Dr, Carl Junction, 64834 Mo, USA.
                Datenschutzerklärung:
                <UnderlineLink href='https://fontawesome.com/privacy'>
                  https://fontawesome.com/privacy
                </UnderlineLink>
                , Informationen zur Datenerhebung und zum Datenschutz:
                <UnderlineLink href='https://fontawesome.com/tos'>
                  https://fontawesome.com/tos
                </UnderlineLink>
                .
              </li>
              <li>
                Facebook-Pixels zur Bestimmung von Besuchern unseres
                Onlineangebotes als Zielgruppe für die Darstellung von Anzeigen
                (sog. Facebook-Ads). Angeboten von: Facebook Inc., 1 Hacker Way,
                Menlo Park, CA 94025, USA, bzw. innerhalb der EU: Facebook
                Ireland Ltd., 4 Grand Canal Square, Grand Canal Harbour, Dublin
                2, Irland. Datenschutzerklärung:
                <UnderlineLink href='https://www.facebook.com/policy.php'>
                  https://www.facebook.com/policy.php
                </UnderlineLink>
                , Hinweise / Widerspruch / Opt-Out-Möglichkeit:
                <UnderlineLink href='https://www.facebook.com/business/help/651294705016616'>
                  https://www.facebook.com/business/help/651294705016616
                </UnderlineLink>
                ,
                <UnderlineLink href='http://optout.networkadvertising.org/'>
                  http://optout.networkadvertising.org/
                </UnderlineLink>
                , Privacy-Shield-Abkommen:
                <UnderlineLink href='https://www.privacyshield.gov/EU-US-Framework'>
                  https://www.privacyshield.gov/EU-US-Framework
                </UnderlineLink>
                .
              </li>
              <li>
                YouTube zur Darstellung von Videos der Plattform YouTube.
                Angeboten von Google inc, 1600 Amphitheatre Parkway, Mountain
                View, CA 94043, USA. Datenschutzerklärung:
                <UnderlineLink href='https://www.google.com/policies/privacy/'>
                  https://www.google.com/policies/privacy/
                </UnderlineLink>
                , Hinweise / Widerspruch / Opt-Out-Möglichkeit:
                <UnderlineLink href='https://adssettings.google.com/authenticated'>
                  https://adssettings.google.com/authenticated
                </UnderlineLink>
                .
              </li>
              <li>
                Vimeo zur Darstellung von Videos der Plattform Vimeo. Angeboten
                von: Vimeo Inc., Attention: Legal Department, 555 West 18th
                Street New York, New York 10011, USA. Datenschutzerklärung:
                <UnderlineLink href='https://vimeo.com/privacy'>
                  https://vimeo.com/privacy
                </UnderlineLink>
                , Google Analytics Datenschutzerklärung (
                <UnderlineLink href='https://www.google.com/policies/privacy'>
                  https://www.google.com/policies/privacy
                </UnderlineLink>
                ). Hinweise / Widerspruch / Opt-Out-Möglichkeit:
                <UnderlineLink href='https://adssettings.google.com/'>
                  https://adssettings.google.com/
                </UnderlineLink>
                ,
                <UnderlineLink href='http://tools.google.com/dlpage/gaoptout?hl=de'>
                  http://tools.google.com/dlpage/gaoptout?hl=de
                </UnderlineLink>
                .
              </li>
              <li>
                DISQUS-Kommentarfunktion für eine sichere und nutzerfreundlichen
                Kommentarverwaltung. Angeboten von der DISQUS, Inc., 301 Howard
                St, Floor 3 San Francisco, California- 94105, USA.
                Datenschutzerklärung:
                <UnderlineLink href='https://help.disqus.com/terms-and-policies/disqus-privacy-policy'>
                  https://help.disqus.com/terms-and-policies/disqus-privacy-policy
                </UnderlineLink>
                , Hinweise / Widerspruch / Opt-Out-Möglichkeit:
                <UnderlineLink href='https://disqus.com/data-sharing-settings/'>
                  https://disqus.com/data-sharing-settings
                </UnderlineLink>
                , Privacy-Shield-Abkommen:
                <UnderlineLink href='https://www.privacyshield.gov/participant?id=a2zt0000000TRkEAAW&amp;status=Active'>
                  https://www.privacyshield.gov/participant?id=a2zt0000000TRkEAAW&amp;status=Active
                </UnderlineLink>
                .
              </li>
              <li>
                Akismet zur Unterscheidung von Kommentaren echter Menschen und
                Spam-Kommentaren. Angeboten von: Automattic Inc., 60 29th Street
                #343, San Francisco, CA 94110, USA. Informationen zur Erhebung
                und Nutzung der Daten durch Akismet finden sich in den
                Datenschutzhinweisen von Automattic:
                <UnderlineLink href='https://automattic.com/privacy/'>
                  https://automattic.com/privacy/
                </UnderlineLink>
                .
              </li>
              <li>
                Gravatar zur Anzeige von Profilbildern eines Nutzers. Angeboten
                von Automattic Inc., 60 29th Street #343, San Francisco, CA
                94110, USA. Informationen zur Erhebung und Nutzung der Daten
                durch Gravatar finden sich in den Datenschutzhinweisen von
                Automattic:
                <UnderlineLink href='https://automattic.com/privacy/'>
                  https://automattic.com/privacy/
                </UnderlineLink>
                .
              </li>
              <li>
                Soundcloud zur Wiedergabe von Podcasts. Angeboten von:
                SoundCloud Limited, Rheinsberger Str. 76/77, 10115 Berlin,
                Deutschland. Informationen zur Erhebung und Nutzung der Daten
                durch Soundcloud finden sich in den Datenschutzhinweisen von
                Soundcloud:
                <UnderlineLink href='https://soundcloud.com/pages/privacy'>
                  https://soundcloud.com/pages/privacy
                </UnderlineLink>
                .
              </li>
              <li>
                Jetpack zur statistischen Auswertung der Besucherzugriffe.
                Angeboten von: Automattic Inc., 60 29th Street #343, San
                Francisco, CA 94110, USA. Datenschutzerklärung:
                <UnderlineLink href='https://automattic.com/privacy/'>
                  https://automattic.com/privacy/
                </UnderlineLink>
                , Hinweise / Widerspruch / Opt-Out-Möglichkeit zu
                Jetpack-Cookies:
                <UnderlineLink href='https://jetpack.com/support/cookies/'>
                  https://jetpack.com/support/cookies/
                </UnderlineLink>
                .
              </li>
              <li>
                ReCaptcha zur Erkennung von Bots, z.B. bei Eingaben in
                Onlineformularen. Angeboten von Google Inc. 1600 Amphitheatre
                Parkway, Mountain View, CA 94043, USA, ein.
                Datenschutzerklärung:
                <UnderlineLink href='https://www.google.com/policies/privacy/'>
                  https://www.google.com/policies/privacy/
                </UnderlineLink>
                , Hinweise / Widerspruch / Opt-Out-Möglichkeit:
                <UnderlineLink href='https://adssettings.google.com/authenticated'>
                  https://adssettings.google.com/authenticated
                </UnderlineLink>
                , Privacy-Shield-Abkommen:
                <UnderlineLink href='https://www.privacyshield.gov/participant?id=a2zt000000001L5AAI&amp;status=Active'>
                  https://www.privacyshield.gov/participant?id=a2zt000000001L5AAI&amp;status=Active
                </UnderlineLink>
                .
              </li>
            </ul>
            <p>
              <strong>10. Social Plugins</strong>
            </p>
            <p>
              Wir setzen derzeit folgende Social-Media-Plug-ins ein: Facebook,
              Twitter, Instagram, XING, Linkedin, Pinterest, tumblr und Google+.
            </p>
            <p>
              Wenn Sie unsere Seite besuchen, werden zunächst keine
              personenbezogenen Daten an die Anbieter der Plug-ins
              weitergegeben. Den Anbieter des Plug-ins erkennen Sie über die
              Markierung auf dem Kasten über seinen Anfangsbuchstaben oder das
              Logo. Wir eröffnen Ihnen die Möglichkeit, über den Button direkt
              mit dem Anbieter des Plug-ins zu kommunizieren. Nur wenn Sie auf
              das markierte Feld klicken und es dadurch aktivieren, erhält der
              Plug-in-Anbieter die Information, dass Sie die entsprechende
              Website unseres Online-Angebots aufgerufen haben.
            </p>
            <p>
              Durch die Aktivierung des Plug-ins werden personenbezogene Daten
              von Ihnen an den jeweiligen Plug-in-Anbieter übermittelt und dort
              (bei US-amerikanischen Anbietern in den USA) gespeichert. Da der
              Plug-in-Anbieter die Datenerhebung insbesondere über Cookies
              vornimmt, empfehlen wir Ihnen, vor dem Klick auf den ausgegrauten
              Kasten über die Sicherheitseinstellungen Ihres Browsers alle
              Cookies zu löschen.
            </p>
            <p>
              Wir haben weder Einfluss auf die erhobenen Daten und
              Datenverarbeitungsvorgänge, noch sind uns der volle Umfang der
              Datenerhebung, die Zwecke der Verarbeitung, die Speicherfristen
              bekannt. Auch zur Löschung der erhobenen Daten durch den
              Plug-in-Anbieter liegen uns keine Informationen vor.
            </p>
            <p>
              Der Plug-in-Anbieter speichert die über Sie erhobenen Daten als
              Nutzungsprofile und nutzt diese für Zwecke der Werbung,
              Marktforschung und/oder bedarfsgerechten Gestaltung seiner
              Website. Eine solche Auswertung erfolgt insbesondere (auch für
              nicht eingeloggte Nutzer) zur Darstellung von bedarfsgerechter
              Werbung und um andere Nutzer des sozialen Netzwerks über Ihre
              Aktivitäten auf unserer Website zu informieren. Ihnen steht ein
              Widerspruchsrecht gegen die Bildung dieser Nutzerprofile zu, wobei
              Sie sich zur Ausübung dessen an den jeweiligen Plug-in-Anbieter
              wenden müssen. Über die Plug-ins bieten wir Ihnen die Möglichkeit,
              mit den sozialen Netzwerken und anderen Nutzern zu interagieren,
              so dass wir unser Angebot verbessern und für Sie als Nutzer
              interessanter ausgestalten können. Rechtsgrundlage für die Nutzung
              der Plug-ins ist Art. 6 Abs. 1 lit. f) DS-GVO.
            </p>
            <p>
              Die Datenweitergabe erfolgt unabhängig davon, ob Sie ein Konto bei
              dem Plug-in-Anbieter besitzen und dort eingeloggt sind. Wenn Sie
              bei dem Plug-in-Anbieter eingeloggt sind, werden Ihre bei uns
              erhobenen Daten direkt Ihrem beim Plug-in-Anbieter bestehenden
              Konto zugeordnet. Wenn Sie den aktivierten Button betätigen und z.
              B. die Seite verlinken, speichert der Plug-in-Anbieter auch diese
              Information in Ihrem Nutzerkonto und teilt sie Ihren Kontakten
              öffentlich mit. Wir empfehlen Ihnen, sich nach Nutzung eines
              sozialen Netzwerks regelmäßig auszuloggen, insbesondere jedoch vor
              Aktivierung des Buttons, da Sie so eine Zuordnung zu Ihrem Profil
              bei dem Plug-in-Anbieter vermeiden können.
            </p>
            <p>
              Weitere Informationen zu Zweck und Umfang der Datenerhebung und
              ihrer Verarbeitung durch den Plug-in-Anbieter erhalten Sie in den
              im Folgenden mitgeteilten Datenschutzerklärungen dieser Anbieter.
              Dort erhalten Sie auch weitere Informationen zu Ihren
              diesbezüglichen Rechten und Einstellungsmöglichkeiten zum Schutze
              Ihrer Privatsphäre.
            </p>
            <p>
              Adressen der jeweiligen Plug-in-Anbieter und URL mit deren
              Datenschutzhinweisen:
            </p>
            <ul>
              <li>
                Facebook Inc., 1601 S California Ave, Palo Alto, California
                94304, USA. Datenschutzerklärung:
                <UnderlineLink href='http://www.facebook.com/policy.php'>
                  http://www.facebook.com/policy.php
                </UnderlineLink>
                , Hinweise / Widerspruch / Opt-Out-Möglichkeit:
                <UnderlineLink href='http://www.facebook.com/about/privacy/your-info-on-other#applications'>
                  http://www.facebook.com/about/privacy/your-info-on-other#applications
                </UnderlineLink>
                ,
                <UnderlineLink href='http://www.facebook.com/about/privacy/your-info#everyoneinfo'>
                  http://www.facebook.com/about/privacy/your-info#everyoneinfo
                </UnderlineLink>
                , weitere Informationen zur Datenerhebung und zum Datenschutz:
                <UnderlineLink href='http://www.facebook.com/help/186325668085084'>
                  http://www.facebook.com/help/186325668085084
                </UnderlineLink>
                , Privacy-Shield-Abkommen:
                <UnderlineLink href='https://www.privacyshield.gov/EU-US-Framework'>
                  https://www.privacyshield.gov/EU-US-Framework
                </UnderlineLink>
              </li>
              <li>
                Twitter Inc., 1355 Market Street, Suite 900, San Francisco, CA
                94103, USA. Datenschutzerklärung:
                <UnderlineLink href='https://twitter.com/de/privacy'>
                  https://twitter.com/de/privacy
                </UnderlineLink>
                , Hinweise / Widerspruch / Opt-Out-Möglichkeit:
                <UnderlineLink href='https://twitter.com/personalization'>
                  https://twitter.com/personalization
                </UnderlineLink>
                , Privacy-Shield-Abkommen:
                <UnderlineLink href='https://www.privacyshield.gov/participant?id=a2zt0000000TORzAAO&amp;status=Active'>
                  https://www.privacyshield.gov/participant?id=a2zt0000000TORzAAO&amp;status=Active
                </UnderlineLink>
                ).
              </li>
              <li>
                Instagram Inc., 1601 Willow Road, Menlo Park, CA, 94025, USA.
                Datenschutzerklärung:
                <UnderlineLink
                  href='http://instagram.com/about/legal/privacy/'
                  className='broken_link'
                >
                  http://instagram.com/about/legal/privacy/
                </UnderlineLink>
                , Hinweise / Widerspruch / Opt-Out-Möglichkeit:
                <UnderlineLink
                  href='https://help.instagram.com/196883487377501'
                  className='broken_link'
                >
                  https://help.instagram.com/196883487377501
                </UnderlineLink>
              </li>
              <li>
                Xing AG, Gänsemarkt 43, 20354 Hamburg, DE. Datenschutzerklärung:
                <UnderlineLink href='https://privacy.xing.com/de/datenschutzerklaerung'>
                  https://privacy.xing.com/de/datenschutzerklaerung
                </UnderlineLink>
                , Hinweise / Widerspruch / Opt-Out-Möglichkeit:
                <UnderlineLink href='https://nats.xing.com/optout.html?popup=1&amp;locale=de_DE'>
                  https://nats.xing.com/optout.html?popup=1&amp;locale=de_DE
                </UnderlineLink>
                , weitere Informationen zur Datenerhebung und zum Datenschutz:
                <UnderlineLink href='http://www.xing.com/privacy'>
                  http://www.xing.com/privacy
                </UnderlineLink>
                .
              </li>
              <li>
                LinkedIn Corporation, 2029 Stierlin Court, Mountain View,
                California 94043, USA. Datenschutzerklärung:
                <UnderlineLink href='http://www.linkedin.com/legal/privacy-policy'>
                  http://www.linkedin.com/legal/privacy-policy
                </UnderlineLink>
                , Hinweise / Widerspruch / Opt-Out-Möglichkeit:
                <UnderlineLink href='https://www.linkedin.com/help/linkedin/answer/62931/manage-advertising-preferences?lang=en'>
                  https://www.linkedin.com/help/linkedin/answer/62931/manage-advertising-preferences?lang=en
                </UnderlineLink>
                , Privacy-Shield-Abkommen:
                <UnderlineLink href='https://www.privacyshield.gov/EU-US-Framework'>
                  https://www.privacyshield.gov/EU-US-Framework
                </UnderlineLink>
              </li>
              <li>
                Pinterest Inc., 635 High Street, Palo Alto, CA, 94301, USA.
                Datenschutzerklärung:
                <UnderlineLink href='https://about.pinterest.com/de/privacy-policy'>
                  https://about.pinterest.com/de/privacy-policy
                </UnderlineLink>
                , Hinweise / Widerspruch / Opt-Out-Möglichkeit:
                <UnderlineLink
                  href='https://help.pinterest.com/en/articles/opt-out-picked-you-pins#Web'
                  className='broken_link'
                >
                  https://help.pinterest.com/en/articles/opt-out-picked-you-pins#Web
                </UnderlineLink>
              </li>
              <li>
                Tumblr angeboten von Oath (EMEA) Limited (vormals Yahoo EMEA
                Limited) 5-7 Point Square, North Wall Quay, Dublin 1, Irland.
                Datenschutzerklärung:
                <UnderlineLink href='https://www.tumblr.com/privacy/de'>
                  https://www.tumblr.com/privacy/de
                </UnderlineLink>
                , Hinweise / Widerspruch / Opt-Out-Möglichkeit:
                <UnderlineLink
                  href='https://tumblr.zendesk.com/hc/de/articles/231707827-Du-und-Tumblr-Ads'
                  className='broken_link'
                >
                  https://tumblr.zendesk.com/hc/de/articles/231707827-Du-und-Tumblr-Ads
                </UnderlineLink>
              </li>
              <li>
                Google+, angeboten durch die Google LLC, 1600 Amphitheatre
                Parkway, Mountain View, CA 94043, USA. Datenschutzerklärung:
                <UnderlineLink href='https://policies.google.com/technologies/ads'>
                  https://policies.google.com/technologies/ads
                </UnderlineLink>
                , Hinweise / Widerspruch / Opt-Out-Möglichkeit:
                <UnderlineLink href='https://adssettings.google.com/authenticated'>
                  https://adssettings.google.com/authenticated
                </UnderlineLink>
                , Privacy-Shield-Abkommen:
                <UnderlineLink href='https://www.privacyshield.gov/participant?id=a2zt000000001L5AAI&amp;status=Active'>
                  https://www.privacyshield.gov/participant?id=a2zt000000001L5AAI&amp;status=Active
                </UnderlineLink>
              </li>
            </ul>
            <p>
              <strong>11. Ihre Rechte</strong>
            </p>
            <p>
              Wenn wir personenbezogenen Daten von Ihnen verarbeiten, sind Sie
              Betroffener i.S.d. Datenschutzgrundverordnung (DSGVO) und Sie
              haben gegenüber uns folgende Rechte der Sie betreffenden
              personenbezogenen Daten:
            </p>
            <ul>
              <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
              <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
              <li>Recht auf Löschung (Art. 17 DSGVO)</li>
              <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO),</li>
              <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>
                Recht auf Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)
              </li>
              <li>
                Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren
                (Art. 77 DSGVO)
              </li>
            </ul>
            <p>
              <strong>12. Änderungen der Datenschutzerklärung</strong>
            </p>
            <p>
              Wir behalten uns vor, die Datenschutzerklärung zu ändern, um sie
              an geänderte Rechtslagen, oder bei Änderungen des Dienstes sowie
              der Datenverarbeitung anzupassen. Dies gilt jedoch nur im Hinblick
              auf Erklärungen zur Datenverarbeitung. Sofern Einwilligungen der
              Nutzer erforderlich sind oder Bestandteile der
              Datenschutzerklärung Regelungen des Vertragsverhältnisses mit den
              Nutzern enthalten, erfolgen die Änderungen nur mit Zustimmung der
              Nutzer.
            </p>
            <p>
              Bitte informieren Sie sich regelmäßig über den Inhalt der
              Datenschutzerklärung.
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
      ...(await serverSideTranslations(locale ?? 'de', ['common', 'privacy'])),
    },
  };
};

export default PrivacyPage;
