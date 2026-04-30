import { setVisualEditorAttr } from '@/lib/directus-visual-editor';

describe('setVisualEditorAttr', () => {
  it('formats attributes for @directus/visual-editing (semicolon-separated key:value)', () => {
    expect(
      setVisualEditorAttr({
        collection: 'posts',
        item: 42,
        fields: 'title',
        mode: 'popover',
      }),
    ).toBe('collection:posts;item:42;fields:title;mode:popover');
  });

  it('joins multiple field names with commas', () => {
    expect(
      setVisualEditorAttr({
        collection: 'posts',
        item: 'x',
        fields: ['title', 'excerpt'],
      }),
    ).toBe('collection:posts;item:x;fields:title,excerpt');
  });
});
