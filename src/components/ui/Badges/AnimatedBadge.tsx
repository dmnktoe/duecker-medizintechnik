import React from 'react';

export const AnimatedBadge = ({ text }: { text: string }) => {
  return (
    <span className='group bg-dark relative mb-4 inline-block rounded-full p-px text-xs leading-6 font-semibold text-white no-underline'>
      <span className='absolute inset-0 overflow-hidden rounded-full'>
        <span className='absolute inset-0 z-30 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100'></span>
      </span>
      <div className='bg-dark relative z-10 flex items-center space-x-2 rounded-full px-4 py-0.5 ring-1 ring-white/10'>
        <span>{text}</span>
      </div>
      <span className='from-primary-400/0 via-primary-400/90 to-primary-400/0 absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r transition-opacity duration-500 group-hover:opacity-40'></span>
    </span>
  );
};
