import { RefObject, useEffect, useRef } from 'react';

type UseOuterClickOptions = {
  enabled?: boolean;
  ignoreRefs?: RefObject<Element | null>[];
};

/**
 * Invokes `onOuterClick` when the user presses/touches outside `ref`.
 * Optional `ignoreRefs` (e.g. menu trigger) avoid treating those nodes as “outside”.
 */
export const useOuterClick = (
  ref: RefObject<Element | null>,
  onOuterClick: () => void,
  options?: UseOuterClickOptions,
) => {
  const { enabled = true, ignoreRefs = [] } = options ?? {};
  const onOuterClickRef = useRef(onOuterClick);
  onOuterClickRef.current = onOuterClick;
  const ignoreRefsRef = useRef(ignoreRefs);
  ignoreRefsRef.current = ignoreRefs;

  useEffect(() => {
    if (!enabled) return;

    const handle = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (ref.current?.contains(target)) return;
      for (const r of ignoreRefsRef.current) {
        if (r.current?.contains(target)) return;
      }
      onOuterClickRef.current();
    };

    document.addEventListener('mousedown', handle);
    document.addEventListener('touchstart', handle);
    return () => {
      document.removeEventListener('mousedown', handle);
      document.removeEventListener('touchstart', handle);
    };
  }, [enabled, ref]);
};
