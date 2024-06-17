import { formatDate } from '@/lib/format-date';

describe('formatDate function', () => {
  it('should return the correct date format', () => {
    const result = formatDate(new Date('2022-01-01'));
    expect(result).toBe('1. Januar 2022');
  });
});
