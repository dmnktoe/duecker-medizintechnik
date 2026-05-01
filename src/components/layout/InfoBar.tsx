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

import { company } from '@/constants/company';

export const InfoBar = () => {
  return (
    <div className='bg-dark relative hidden py-2 text-xs text-white xl:block xl:w-auto'>
      <Container>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-x-2'>
            <VscGlobe className='text-primary-500 h-4 w-4' />
            <LanguagePicker className='relative h-6 cursor-pointer border-0 bg-transparent p-0 text-xs outline-none hover:underline focus:border-0 focus:ring-0 focus:outline-none' />
            <VscChevronDown className='relative inline-block text-xs' />
          </div>
          <div className='flex gap-x-4'>
            <div className='flex items-center gap-x-2'>
              <VscLocation className='text-primary-500 h-4 w-4' />
              {company.street}, {company.city}
            </div>
            <div className='flex items-center gap-x-2'>
              <VscDeviceMobile className='text-primary-500 h-4 w-4' />
              {company.phone}
            </div>
            <div className='flex items-center gap-x-2'>
              <VscMail className='text-primary-500 h-4 w-4' />
              <Link
                href={`mailto:${company.email}`}
                className='hover:underline'
              >
                {company.email}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
