import { notFound } from 'next/navigation';

// next-intl: unknown paths under `[locale]` only hit `not-found` after `notFound()`.
export default function CatchAllUnknownLocaleRoute() {
  notFound();
}
