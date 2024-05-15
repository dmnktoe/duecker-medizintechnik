import React from 'react';

import { SubItem } from '@/components/ui/Nav';

type MegaMenuContextType = {
  isMegaMenuVisible: boolean;
  setIsMegaMenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
  subItems: SubItem[];
};

export const MegaMenuContext = React.createContext<MegaMenuContextType>({
  isMegaMenuVisible: false,
  setIsMegaMenuVisible: () => {},
  subItems: [],
});
