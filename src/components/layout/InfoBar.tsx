import Link from 'next/link';
import * as React from 'react';
import {
  VscChevronDown,
  VscDeviceMobile,
  VscGlobe,
  VscLocation,
  VscMail,
} from 'react-icons/vsc';

import { Container } from '@/components/layout/Container';
import LanguagePicker from '@/components/templates/LanguagePicker';

import { company } from '@/constant/company';

export const InfoBar = () => {
  return (
    <div className='relative hidden bg-dark py-2 xl:block xl:w-auto'>
      <Container>
        <div className='flex items-center justify-between text-xs font-medium tracking-normal text-white'>
          <div className='flex items-center gap-x-2'>
            <VscGlobe className='h-4 w-4 text-primary-500' />
            <LanguagePicker className='relative h-6 cursor-pointer rounded-lg border-0 bg-transparent p-0 text-xs outline-none hover:underline focus:border-0 focus:outline-none focus:ring-0' />
            <VscChevronDown className='relative inline-block text-xs' />
          </div>
          <div className='flex gap-x-4'>
            <div className='flex items-center gap-x-2'>
              <VscLocation className='h-4 w-4 text-primary-500' />
              {company.street}, {company.city}
            </div>
            <div className='flex items-center gap-x-2'>
              <VscDeviceMobile className='h-4 w-4 text-primary-500' />
              {company.phone}
            </div>
            <div className='flex items-center gap-x-2'>
              <VscMail className='h-4 w-4 text-primary-500' />
              <p>
                <Link
                  href={`mailto:${company.email}`}
                  className='hover:underline'
                >
                  {company.email}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
