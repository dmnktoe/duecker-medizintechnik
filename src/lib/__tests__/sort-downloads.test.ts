import { sortDownloads } from '@/lib/sort-downloads';

import type { Download } from '@/types/Download';

describe('sortDownloads', () => {
  it('returns an empty object when given no downloads', () => {
    expect(sortDownloads(null)).toEqual({});
    expect(sortDownloads(undefined)).toEqual({});
    expect(sortDownloads([])).toEqual({});
  });

  it('groups downloads by category name', () => {
    const downloads: Download[] = [
      {
        id: 1,
        name: 'Datasheet A',
        category: { id: 1, name: 'Datasheets' },
        files: [
          {
            id: 'f1',
            title: 'a.pdf',
            size: '120 KB',
            url: 'https://example.com/a.pdf',
            type: 'pdf',
          },
        ],
      },
      {
        id: 2,
        name: 'Manual B',
        category: { id: 2, name: 'Manuals' },
        files: [],
      },
      {
        id: 3,
        name: 'Datasheet C',
        category: { id: 1, name: 'Datasheets' },
        files: [],
      },
    ];

    const grouped = sortDownloads(downloads);
    expect(Object.keys(grouped)).toEqual(['Datasheets', 'Manuals']);
    expect(grouped['Datasheets'].items).toHaveLength(2);
    expect(grouped['Datasheets'].items[0].title).toBe('Datasheet A');
    expect(grouped['Datasheets'].items[0].files[0]).toEqual({
      title: 'a.pdf',
      size: '120 KB',
      url: 'https://example.com/a.pdf',
      type: 'pdf',
    });
  });

  it('falls back to a default bucket when no category is set', () => {
    const grouped = sortDownloads([
      {
        id: 1,
        name: 'Lonely file',
        category: null,
        files: [],
      },
    ]);
    expect(Object.values(grouped)).toHaveLength(1);
    expect(Object.values(grouped)[0].sectionTitle).toBeTruthy();
  });
});
