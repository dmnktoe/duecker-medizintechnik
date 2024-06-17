import * as React from 'react';

import { Container } from '@/components/layout';
import Breadcrumbs from '@/components/templates/Breadcrumbs';
import ContactDecorators from '@/components/templates/ContactDecorators';
import ContactForm from '@/components/templates/ContactForm';
import ContactInfo from '@/components/templates/ContactInfo';

export default function ContactView() {
  return (
    <section className='relative z-10 mx-auto max-w-5xl bg-white py-16 lg:py-24'>
      <Container>
        <div className='flex flex-wrap lg:justify-between'>
          <div className='w-full lg:w-6/12'>
            <div className='mb-12 lg:mb-0'>
              <Breadcrumbs />
              <ContactInfo />
            </div>
          </div>
          <div className='w-full lg:w-5/12'>
            <div className='relative rounded-lg bg-white p-8 shadow-lg sm:p-12'>
              <ContactForm />
              <ContactDecorators />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
