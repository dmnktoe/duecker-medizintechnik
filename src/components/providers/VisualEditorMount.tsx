'use client';

import { useEffect } from 'react';

import {
  cleanupVisualEditor,
  initializeVisualEditor,
} from '@/lib/directus-visual-editor';

/**
 * Mounts the Directus Visual Editing runtime when the page is rendered inside
 * the Directus preview iframe (or whenever Draft Mode is active).
 *
 * Render this anywhere inside a server component – it is a no-op outside the
 * browser and bails out automatically if the Visual Editor cannot be loaded.
 */
export function VisualEditorMount({ enabled = true }: { enabled?: boolean }) {
  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;
    void initializeVisualEditor().catch(() => {
      // initialisation already logs – swallow to avoid Next error overlay.
    });

    return () => {
      if (cancelled) return;
      cancelled = true;
      void cleanupVisualEditor();
    };
  }, [enabled]);

  return null;
}

export default VisualEditorMount;
