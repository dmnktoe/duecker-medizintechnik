import { Container } from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/layout/Seo';

export default function CommercePage() {
  return (
    <Layout>
      <Seo templateTitle='Handel' />
      <section className='py-16 md:py-24 lg:py-32'>
        <Container>
          <h1 className='text-dark text-4xl font-semibold tracking-tight md:text-5xl xl:text-6xl xl:leading-[1.1]'>
            Handel
          </h1>
          <p className='mt-6 text-lg font-medium leading-8 text-gray-700 '>
            Wir bieten Ihnen eine große Auswahl an Produkten für den täglichen
            Bedarf. Von Lebensmitteln über Haushaltswaren bis hin zu
          </p>
        </Container>
      </section>
    </Layout>
  );
}
