import React from 'react';

import {
  BissingerIcon,
  EberleIcon,
  HupferIcon,
  MediconIcon,
  NouvagIcon,
  SterisIcon,
  TontarraIcon,
} from '@/components/ui/icons/partners';

export type Partner = {
  name: string;
  image: React.FC<React.SVGProps<SVGSVGElement>>;
  url: string;
};

export const partners: Partner[] = [
  {
    name: 'Bissinger',
    image: BissingerIcon,
    url: 'https://www.bissinger.com/de',
  },
  {
    name: 'Eberle',
    image: EberleIcon,
    url: 'https://www.eberle-med.de/eberle-medizin/',
  },
  {
    name: 'Hupfer',
    image: HupferIcon,
    url: 'https://www.hupfer.com/de/medical',
  },
  {
    name: 'Medicon',
    image: MediconIcon,
    url: 'https://medicon.de/',
  },
  {
    name: 'Nouvag',
    image: NouvagIcon,
    url: 'https://www.nouvag.com/de/',
  },
  {
    name: 'STERIS',
    image: SterisIcon,
    url: 'https://www.steris.com/',
  },
  {
    name: 'Tontarra',
    image: TontarraIcon,
    url: 'https://tontarra.de/',
  },
];
