import { RefObject, useCallback, useEffect, useState } from 'react';

import { useOuterClick } from '@/utils/useOuterClick';

type UseMobileMenuArgs = {
  menuPanelRef: RefObject<Element | null>;
  menuButtonRef: RefObject<Element | null>;
};

export const useMobileMenu = ({
  menuPanelRef,
  menuButtonRef,
}: UseMobileMenuArgs) => {
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);
  const open = useCallback(() => setIsOpen(true), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle('overflow-hidden', isOpen);
    return () => html.classList.remove('overflow-hidden');
  }, [isOpen]);

  useEffect(() => {
    const onViewportChange = () => close();
    window.addEventListener('orientationchange', onViewportChange);
    window.addEventListener('resize', onViewportChange);
    return () => {
      window.removeEventListener('orientationchange', onViewportChange);
      window.removeEventListener('resize', onViewportChange);
    };
  }, [close]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [close]);

  useOuterClick(menuPanelRef, close, {
    enabled: isOpen,
    ignoreRefs: [menuButtonRef],
  });

  return { isOpen, open, close, toggle };
};
