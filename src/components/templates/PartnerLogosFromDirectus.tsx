'use client';

import Image from 'next/image';
import Link from 'next/link';

import clsxm from '@/lib/clsxm';
import { setVisualEditorAttr } from '@/lib/directus-visual-editor';

import Marquee from '@/components/templates/Marquee';

import type { PartnerLogoItem } from '@/types/PartnerLogo';

const GRID_IMG_CLASS =
  'hover:opacity-90 h-6 w-20 object-contain transition-all ease-in-out md:h-10 md:w-32';

const MARQUEE_IMG_CLASS = 'h-6 w-20 md:h-10 md:w-32';

const PARTNER_VISUAL_FIELDS = ['logo', 'link_url', 'name'] as const;

function isSvgMime(mime: string | null): boolean {
  return (mime ?? '').toLowerCase().includes('svg');
}

function LogoAsset({
  item,
  className,
}: {
  item: PartnerLogoItem;
  className: string;
}) {
  if (isSvgMime(item.mimeType)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- SVG from Directus
      <img src={item.logoUrl} alt={item.alt} className={clsxm(className, 'object-contain')} />
    );
  }
  return (
    <Image
      src={item.logoUrl}
      alt={item.alt}
      width={160}
      height={64}
      className={clsxm(className, 'object-contain')}
      unoptimized
    />
  );
}

type PartnerLogosFromDirectusProps = {
  items: PartnerLogoItem[];
  layout: 'grid' | 'marquee';
  /** Passed to `Marquee` when `layout` is `marquee`. */
  marqueeClassName?: string;
};

/**
 * Renders partner logos from Directus (`partners`) with Visual Editor markers.
 */
export function PartnerLogosFromDirectus({
  items,
  layout,
  marqueeClassName,
}: PartnerLogosFromDirectusProps) {
  const editorAttr = (item: PartnerLogoItem) =>
    setVisualEditorAttr({
      collection: 'partners',
      item: item.directusItemId,
      fields: [...PARTNER_VISUAL_FIELDS],
      mode: 'modal',
    });

  if (layout === 'grid') {
    return (
      <div className='text-muted flex flex-wrap gap-8'>
        {items.map((item) => (
          <div
            key={item.id}
            className='flex flex-grow items-center justify-center px-6'
            data-directus={editorAttr(item)}
          >
            {item.linkUrl ? (
              <Link href={item.linkUrl} target='_blank' rel='noreferrer'>
                <LogoAsset item={item} className={GRID_IMG_CLASS} />
              </Link>
            ) : (
              <LogoAsset item={item} className={GRID_IMG_CLASS} />
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <Marquee
      className={
        marqueeClassName ??
        '[mask-image:linear-gradient(to_right,transparent_0%,#000_15%,#000_85%,transparent_100%)]'
      }
    >
      {items.map((item) => (
        <div key={item.id} className='px-6 lg:px-12' data-directus={editorAttr(item)}>
          {item.linkUrl ? (
            <Link
              href={item.linkUrl}
              target='_blank'
              rel='noreferrer'
              className='text-muted'
            >
              <LogoAsset item={item} className={MARQUEE_IMG_CLASS} />
            </Link>
          ) : (
            <span className='text-muted inline-block'>
              <LogoAsset item={item} className={MARQUEE_IMG_CLASS} />
            </span>
          )}
        </div>
      ))}
    </Marquee>
  );
}
