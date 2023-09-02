import { Container } from '@/components/layout/Container';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/layout/Seo';

export default function RepairPage() {
  return (
    <Layout>
      <Seo templateTitle='Reparatur' />
      <section className='py-16 md:py-24 lg:py-32'>
        <Container>
          <h1 className='text-dark text-4xl font-semibold tracking-tight md:text-5xl xl:text-6xl xl:leading-[1.1]'>
            Reparatur
          </h1>
          <p className='mt-6 text-lg font-medium leading-8 text-gray-700 '>
            Reparatur von Haushaltsgeräten
          </p>
        </Container>
      </section>
    </Layout>
  );
}
