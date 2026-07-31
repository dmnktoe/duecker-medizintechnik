import {
  formatTime,
  formatTimeRange,
  getOpenStatusNowBerlin,
  getTodayWeekdayBerlin,
  labelDayRange,
  listWeekdays,
} from '@/lib/opening-hours';

import { openingHoursWeek } from '@/constants/opening-hours';

// Every case pins `now` explicitly. The helpers default to `new Date()`, so
// leaving it out would make both the assertions and the coverage report depend
// on the wall clock at test time.
const at = (iso: string) => new Date(iso);

describe('formatTime', () => {
  it('pads hours and minutes to two digits', () => {
    expect(formatTime({ hour: 7, minute: 30 })).toBe('07:30');
    expect(formatTime({ hour: 16, minute: 0 })).toBe('16:00');
  });
});

describe('formatTimeRange', () => {
  it('joins start and end with an en dash', () => {
    expect(
      formatTimeRange({
        start: { hour: 7, minute: 30 },
        end: { hour: 14, minute: 30 },
      }),
    ).toBe('07:30–14:30');
  });
});

describe('getTodayWeekdayBerlin', () => {
  it('resolves the weekday in Europe/Berlin, not UTC', () => {
    // 23:30 Berlin on Friday is still 21:30 UTC on Friday.
    expect(getTodayWeekdayBerlin(at('2026-07-31T21:30:00Z'))).toBe('fri');
    // 00:30 Berlin on Saturday is 22:30 UTC, still Friday in UTC.
    expect(getTodayWeekdayBerlin(at('2026-07-31T22:30:00Z'))).toBe('sat');
  });
});

describe('getOpenStatusNowBerlin', () => {
  it('reports open during business hours', () => {
    const { weekday, status } = getOpenStatusNowBerlin(
      openingHoursWeek,
      at('2026-07-31T06:00:00Z'), // Friday 08:00 Berlin
    );
    expect(weekday).toBe('fri');
    expect(status).toEqual({
      isOpen: true,
      closesAt: { hour: 14, minute: 30 },
    });
  });

  it('treats the opening time itself as open', () => {
    const { status } = getOpenStatusNowBerlin(
      openingHoursWeek,
      at('2026-07-31T05:30:00Z'), // Friday 07:30 Berlin
    );
    expect(status.isOpen).toBe(true);
  });

  it('treats the closing time itself as closed', () => {
    const { status } = getOpenStatusNowBerlin(
      openingHoursWeek,
      at('2026-07-31T12:30:00Z'), // Friday 14:30 Berlin
    );
    expect(status).toEqual({ isOpen: false, opensAt: null });
  });

  it('reports the next opening when the day has not started yet', () => {
    const { status } = getOpenStatusNowBerlin(
      openingHoursWeek,
      at('2026-07-31T04:00:00Z'), // Friday 06:00 Berlin
    );
    expect(status).toEqual({
      isOpen: false,
      opensAt: { hour: 7, minute: 30 },
    });
  });

  it('reports no further opening once the day is over', () => {
    const { status } = getOpenStatusNowBerlin(
      openingHoursWeek,
      at('2026-07-31T15:00:00Z'), // Friday 17:00 Berlin
    );
    expect(status).toEqual({ isOpen: false, opensAt: null });
  });

  it('reports closed all day on weekends', () => {
    const { weekday, status } = getOpenStatusNowBerlin(
      openingHoursWeek,
      at('2026-08-01T10:00:00Z'), // Saturday 12:00 Berlin
    );
    expect(weekday).toBe('sat');
    expect(status).toEqual({ isOpen: false, opensAt: null });
  });

  it('uses the longer closing time on weekdays other than Friday', () => {
    const { weekday, status } = getOpenStatusNowBerlin(
      openingHoursWeek,
      at('2026-08-03T09:00:00Z'), // Monday 11:00 Berlin
    );
    expect(weekday).toBe('mon');
    expect(status).toEqual({ isOpen: true, closesAt: { hour: 16, minute: 0 } });
  });

  it('honours standard time as well as daylight saving time', () => {
    // January is CET (UTC+1); 07:00 UTC is 08:00 Berlin.
    const { status } = getOpenStatusNowBerlin(
      openingHoursWeek,
      at('2026-01-05T07:00:00Z'), // Monday 08:00 Berlin
    );
    expect(status).toEqual({ isOpen: true, closesAt: { hour: 16, minute: 0 } });
  });

  it('falls back to closed for a weekday without configured ranges', () => {
    const { status } = getOpenStatusNowBerlin(
      { ...openingHoursWeek, fri: { label: 'Geschlossen', ranges: [] } },
      at('2026-07-31T06:00:00Z'),
    );
    expect(status).toEqual({ isOpen: false, opensAt: null });
  });
});

describe('labelDayRange', () => {
  it('prefers the configured German label', () => {
    expect(labelDayRange('fri', 'de')).toBe('07:30–14:30');
  });

  it('computes the label from the ranges for English', () => {
    expect(labelDayRange('mon', 'en')).toBe('07:30–16:00');
  });

  it('localises closed days', () => {
    expect(labelDayRange('sat', 'de')).toBe('Geschlossen');
    expect(labelDayRange('sun', 'en')).toBe('Closed');
  });
});

describe('listWeekdays', () => {
  it('returns the seven weekdays in display order', () => {
    expect(listWeekdays()).toEqual([
      'mon',
      'tue',
      'wed',
      'thu',
      'fri',
      'sat',
      'sun',
    ]);
  });
});
