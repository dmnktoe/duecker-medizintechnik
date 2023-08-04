import { Container } from '@/components/layout/Container';

export const BlogPosts = () => {
  return (
    <>
      <section className='bg-coolGray-50 overflow-hidden py-12 md:py-24'>
        <Container>
          <div className='-mx-4 mb-20 flex flex-wrap items-center'>
            <div className='mb-8 w-full px-4 md:mb-0 md:w-1/2'>
              <h1 className='font-heading text-4xl tracking-tighter lg:text-6xl'>
                Neuigkeiten und Wissenswertes
              </h1>
            </div>
            <div className='w-full px-4 md:w-1/2'>
              <div className='flex items-center justify-end'>
                <a
                  className='sm:h-18 sm:w-18 mr-8 inline-flex h-16 w-16 items-center justify-center rounded-full border border-black text-black transition duration-200 hover:bg-black hover:text-white'
                  href='#'
                >
                  <svg
                    width={27}
                    height={27}
                    viewBox='0 0 27 27'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M10.7051 7.12817L4.15732 13.6759L10.7051 20.2237'
                      stroke='currentColor'
                      strokeWidth='1.61806'
                      strokeMiterlimit={10}
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M22.4941 13.6759H4.33949'
                      stroke='currentColor'
                      strokeWidth='1.61806'
                      strokeMiterlimit={10}
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </a>
                <a
                  className='sm:h-18 sm:w-18 inline-flex h-16 w-16 items-center justify-center rounded-full border border-black text-black transition duration-200 hover:bg-black hover:text-white'
                  href='#'
                >
                  <svg
                    width={27}
                    height={27}
                    viewBox='0 0 27 27'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M16.2949 7.12817L22.8427 13.6759L16.2949 20.2237'
                      stroke='currentColor'
                      strokeWidth='1.61806'
                      strokeMiterlimit={10}
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M4.50586 13.6759H22.6605'
                      stroke='currentColor'
                      strokeWidth='1.61806'
                      strokeMiterlimit={10}
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className='mb-20 flex'>
            <div className='w-full md:mr-10 md:max-w-lg md:flex-shrink-0'>
              <a className='group block' href='#'>
                <div className='rounded-4xl relative mb-6 overflow-hidden'>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className='block h-72 w-full object-cover'
                    src='asitrastudio-assets/blog/blog-third1.png'
                    alt=''
                  />
                  <div className='absolute left-0 top-0 h-full w-full transition duration-200 group-hover:bg-black group-hover:bg-opacity-10' />
                </div>
                <div className='max-w-xs sm:max-w-md'>
                  <div className='mb-3'>
                    <span className='border-1.5 mr-6 inline-block rounded-full border-black px-3 py-2 text-sm leading-none text-black transition duration-200 group-hover:bg-black group-hover:text-white'>
                      Interior
                    </span>
                    <span className='text-coolGray-600 inline-block text-sm font-medium'>
                      9 min read
                    </span>
                  </div>
                  <h4 className='mb-6 text-3xl tracking-tight sm:text-4xl'>
                    How to decorating ourdoor sofa
                  </h4>
                  <p className='max-w-sm'>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout.
                  </p>
                </div>
              </a>
            </div>
            <div className='mr-10 hidden w-full max-w-lg md:block md:flex-shrink-0'>
              <a className='group block' href='#'>
                <div className='rounded-4xl relative mb-6 overflow-hidden'>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className='block h-72 w-full object-cover'
                    src='asitrastudio-assets/blog/blog-third2.png'
                    alt=''
                  />
                  <div className='absolute left-0 top-0 h-full w-full transition duration-200 group-hover:bg-black group-hover:bg-opacity-10' />
                </div>
                <div className='max-w-md'>
                  <div className='mb-3'>
                    <span className='border-1.5 mr-6 inline-block rounded-full border-black px-3 py-2 text-sm leading-none text-black transition duration-200 group-hover:bg-black group-hover:text-white'>
                      Interior
                    </span>
                    <span className='text-coolGray-600 inline-block text-sm font-medium'>
                      9 min read
                    </span>
                  </div>
                  <h4 className='mb-6 text-4xl tracking-tight'>
                    How to decorating ourdoor sofa
                  </h4>
                  <p className='max-w-sm'>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout.
                  </p>
                </div>
              </a>
            </div>
            <div className='hidden w-full max-w-lg md:block md:flex-shrink-0'>
              <a className='group block' href='#'>
                <div className='rounded-4xl relative mb-6 overflow-hidden'>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className='block h-72 w-full object-cover'
                    src='asitrastudio-assets/blog/blog-third3.png'
                    alt=''
                  />
                  <div className='absolute left-0 top-0 h-full w-full transition duration-200 group-hover:bg-black group-hover:bg-opacity-10' />
                </div>
                <div className='max-w-md'>
                  <div className='mb-3'>
                    <span className='border-1.5 mr-6 inline-block rounded-full border-black px-3 py-2 text-sm leading-none text-black transition duration-200 group-hover:bg-black group-hover:text-white'>
                      Interior
                    </span>
                    <span className='text-coolGray-600 inline-block text-sm font-medium'>
                      9 min read
                    </span>
                  </div>
                  <h4 className='mb-6 text-4xl tracking-tight'>
                    How to decorating ourdoor sofa
                  </h4>
                  <p className='max-w-sm'>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout.
                  </p>
                </div>
              </a>
            </div>
          </div>
          <div className='text-center'>
            <a
              className='group inline-flex items-center border-b-2 border-black pb-2 font-medium leading-none'
              href='#'
            >
              <span className='mr-4'>See our blog</span>
              <span className='transform transition duration-100 group-hover:rotate-45'>
                <svg
                  width={11}
                  height={11}
                  viewBox='0 0 11 11'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M9.5 1.5L1.5 9.5'
                    stroke='black'
                    strokeWidth='1.3'
                    strokeMiterlimit={10}
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M9.5 8.83571V1.5H2.16429'
                    stroke='black'
                    strokeWidth='1.3'
                    strokeMiterlimit={10}
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </span>
            </a>
          </div>
        </Container>
      </section>
    </>
  );
};
