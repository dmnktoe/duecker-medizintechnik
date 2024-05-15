import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'next-i18next';
import * as React from 'react';

import clsxm from '@/lib/clsxm';

import { MegaMenuContext } from '@/components/helpers/MegaMenuContext';
import { Container } from '@/components/layout';
import { AspectRatio } from '@/components/ui/AspectRatio';
import UnstyledLink from '@/components/ui/Links/UnstyledLink';
import { SubItem } from '@/components/ui/Nav';
import { Body, Title } from '@/components/ui/Typography';

export const MegaMenu = () => {
  const currentRoute = usePathname();
  const { t } = useTranslation('common', { useSuspense: false });
  const { subItems } = React.useContext(MegaMenuContext);

  return (
    <div className='mega-menu absolute left-0 z-50 hidden w-full border-t border-neutral-100 bg-white py-6 drop-shadow-sm xl:flex'>
      <Container>
        <div className='flex h-96 w-full flex-row gap-4'>
          <div className='flex w-6/12 flex-col'>
            <Title size='four'>Unser Leistungsspektrum</Title>
            <div className='grid flex-grow grid-cols-2 gap-4'>
              {subItems.map((subItem: SubItem) => (
                <UnstyledLink
                  key={subItem.text}
                  href={subItem.href}
                  className={clsxm(
                    'group/megaMenuItemHover flex flex-grow flex-col justify-between bg-neutral-50 p-3 hover:cursor-pointer hover:bg-neutral-100',
                    currentRoute === subItem.href && 'bg-primary-100',
                  )}
                >
                  <div className='flex h-5 w-5 items-center justify-center rounded-full border border-dark p-2'>
                    <Body margin={false} size='xs'>
                      {subItems.indexOf(subItem) + 1}
                    </Body>
                  </div>
                  <Title
                    size='five'
                    margin={false}
                    className='group-hover/megaMenuItemHover:underline'
                  >
                    {subItem.text}
                  </Title>
                </UnstyledLink>
              ))}
              <UnstyledLink
                href='/leistungen'
                className='group/megaMenuItemHover flex items-end bg-neutral-50 p-3 hover:cursor-pointer hover:bg-neutral-100'
              >
                <Title
                  size='five'
                  margin={false}
                  className='group-hover/megaMenuItemHover:underline'
                >
                  Alle Leistungen im Überblick. →
                </Title>
              </UnstyledLink>
            </div>
          </div>
          <div className='flex w-2/12 flex-col'>
            <Title size='four'>&nbsp;</Title>
            <div className='flex flex-1 flex-grow bg-neutral-50 p-0'>
              <AspectRatio ratio={3 / 4} className='bg-muted'>
                <Image
                  src='https://picsum.photos/900?random=2'
                  alt='kontakt'
                  fill
                  className='object-cover object-center'
                />
              </AspectRatio>
            </div>
          </div>
          <div className='flex w-4/12 flex-col'>
            <Title size='four'>Pressemitteilungen</Title>
            <div className='flex flex-1 flex-grow flex-col justify-between bg-primary-50 p-3'>
              <Body size='xs'>
                Entdecken Sie unser breites Spektrum an Produkten und
                Dienstleistungen für Reparatur und Werterhaltung von
                chirurgischen Instrumentarium. Erfahren Sie, wie wir Ihnen dabei
                helfen, eine optimale Versorgung im medizinischen
              </Body>
              <UnstyledLink href='/news'>
                <Title size='five' margin={false} className='hover:underline'>
                  Alle Beiträge ansehen. →
                </Title>
              </UnstyledLink>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
