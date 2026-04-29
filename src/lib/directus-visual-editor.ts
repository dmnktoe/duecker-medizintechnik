/**
 * Thin wrapper around `@directus/visual-editing` so we can:
 *  - safely import it on the client only,
 *  - share an `initializeVisualEditor` helper across pages, and
 *  - keep `setAttr` available for SSR templates without pulling the runtime
 *    code into server bundles.
 *
 * `setAttr` is a pure helper (it just builds a JSON string) so we re-export
 * it for both server and client components.
 */

import { directusUrl } from '@/constant/env';

type Mode = 'drawer' | 'modal' | 'popover';

export type VisualEditorAttr = {
  collection: string;
  item: number | string;
  fields?: string | readonly string[] | string[];
  mode?: Mode;
};

/**
 * Builds the value for a `data-directus` attribute. We use a pure JSON
 * implementation so it can run on the server without importing the
 * client-only Visual Editor runtime.
 */
export function setVisualEditorAttr(attr: VisualEditorAttr): string {
  const payload: Record<string, unknown> = {
    collection: attr.collection,
    item: attr.item,
  };
  if (attr.fields !== undefined) {
    payload.fields = Array.isArray(attr.fields) ? attr.fields : [attr.fields];
  }
  if (attr.mode) {
    payload.mode = attr.mode;
  }
  return JSON.stringify(payload);
}

let isApplied = false;

/**
 * Lazily loads the Directus Visual Editing runtime and registers it with the
 * current page. Safe to call from `useEffect` – does nothing on the server
 * and is a no-op when called more than once.
 */
export async function initializeVisualEditor(options?: {
  onSaved?: (data: unknown) => void;
}): Promise<void> {
  if (typeof window === 'undefined' || isApplied) return;

  try {
    const { apply } = await import('@directus/visual-editing');
    await apply({
      directusUrl,
      onSaved: async (data) => {
        if (options?.onSaved) {
          options.onSaved(data);
          return;
        }
        // Default: refresh the route so RSC fetches the latest data.
        window.location.reload();
      },
    });
    isApplied = true;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[directus-visual-editor] failed to initialize:', error);
  }
}

export async function cleanupVisualEditor(): Promise<void> {
  if (typeof window === 'undefined' || !isApplied) return;
  try {
    const { remove } = await import('@directus/visual-editing');
    remove();
  } finally {
    isApplied = false;
  }
}
