import { Figtree, Sorts_Mill_Goudy } from 'next/font/google';

export const figtree = Figtree({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-figtree',
  weight: ['400', '500', '600', '700'],
});

export const sortsMillGoudy = Sorts_Mill_Goudy({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sortsMillGoudy',
  weight: ['400'],
});
