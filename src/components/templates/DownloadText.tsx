import { Body, Title } from '@/components/ui/Typography';

export const DownloadText = () => {
  return (
    <div className='flex flex-col gap-6'>
      <div>
        <Title renderAs='h3' size='five'>
          EN ISO 13485:2016 + AC:2018 + A11:2021
        </Title>
        <Body>
          Wir sind stolz darauf, die Zertifizierung nach EN ISO 13485:2016 +
          AC:2018 + A11:2021 zu besitzen. Diese international anerkannte Norm
          legt die Anforderungen für ein umfassendes Qualitätsmanagementsystem
          für die Herstellung von Medizinprodukten fest. Sie stellt sicher, dass
          wir stets die gesetzlichen und regulatorischen Anforderungen erfüllen
          und darüber hinaus unseren Kunden Produkte und Dienstleistungen von
          höchster Qualität bieten. Unser Zertifikat Nr. 50277-21-00_DE
          bestätigt unsere Konformität und unser Engagement für die
          kontinuierliche Verbesserung unserer Prozesse und Produkte.
        </Body>
      </div>
      <div>
        <Title renderAs='h3' size='five'>
          Infektionsschutz
        </Title>
        <Body>
          Unser Infektionsschutzverfahren gewährleistet höchste Standards in
          Hygiene und Sicherheit für unsere Mitarbeiter und Kunden. Vor jeder
          Reparatur oder Überarbeitung müssen alle Produkte einer gründlichen
          Reinigung, Desinfektion und gegebenenfalls Sterilisation unterzogen
          werden. Dieser Prozess, integraler Bestandteil unseres
          Qualitätsmanagements, entspricht den gesetzlichen Anforderungen und
          aktuellen wissenschaftlichen Erkenntnissen. Wir bitten unsere Kunden,
          bei jeder Lieferung zu bestätigen, dass die Produkte diesen Standards
          entsprechen. Unser Engagement für die Gesundheit und Sicherheit führt
          dazu, dass Ware, die nicht den Hygienestandards entspricht, abgelehnt
          wird oder eine separate Dekontaminationsgebühr erhoben wird.
        </Body>
      </div>
    </div>
  );
};
