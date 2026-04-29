import {
  getBerlinPublicHolidayId,
  getBerlinWallClock,
} from '@/lib/german-public-holidays';

/** Berlin calendar Y-M-D in local wall time */
const atBerlinYMD = (y: number, m1: number, d: number) =>
  // 12:00 UTC = reliable calendar date in most zones; Berlin uses the matching civil date
  new Date(
    `${y}-${String(m1).padStart(2, '0')}-${String(d).padStart(2, '0')}T12:00:00.000Z`,
  );

describe('getBerlinWallClock', () => {
  it('interprets Berlin civil date and weekday (Monday=0) for 2024-12-16', () => {
    // Monday in Berlin
    const d = atBerlinYMD(2024, 12, 16);
    const w = getBerlinWallClock(d);
    expect(w.year).toBe(2024);
    expect(w.month).toBe(12);
    expect(w.day).toBe(16);
    expect(w.weekdayMon0).toBe(0);
  });
});

describe('getBerlinPublicHolidayId', () => {
  it('detects New Year in Berlin', () => {
    expect(getBerlinPublicHolidayId(atBerlinYMD(2026, 1, 1))).toBe('newYear');
  });

  it('detects May 1 (Tag der Arbeit)', () => {
    expect(getBerlinPublicHolidayId(atBerlinYMD(2026, 5, 1))).toBe('laborDay');
  });

  it('detects Good Friday 2024 (Easter 31 Mar, Karfreitag 29 Mar)', () => {
    expect(getBerlinPublicHolidayId(atBerlinYMD(2024, 3, 29))).toBe(
      'goodFriday',
    );
  });

  it('detects Good Friday 2023 (9 Apr, Karfreitag 7 Apr)', () => {
    expect(getBerlinPublicHolidayId(atBerlinYMD(2023, 4, 7))).toBe(
      'goodFriday',
    );
  });

  it('returns null on a normal workday in Berlin', () => {
    expect(getBerlinPublicHolidayId(atBerlinYMD(2026, 4, 15))).toBeNull();
  });
});
