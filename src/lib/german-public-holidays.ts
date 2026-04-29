const BERLIN = 'Europe/Berlin';

const EN_WEEKDAY_TO_MONDAY_FIRST_INDEX: Record<string, number> = {
  Monday: 0,
  Tuesday: 1,
  Wednesday: 2,
  Thursday: 3,
  Friday: 4,
  Saturday: 5,
  Sunday: 6,
};

export type BerlinWallClock = {
  year: number;
  month: number;
  day: number;
  hours: number;
  minutes: number;
  /** Monday = 0 … Sunday = 6 (matches opening-hours schedule order) */
  weekdayMon0: number;
};

/**
 * Calendar and clock in German local time, independent of the device timezone.
 * Used for opening hours, holiday checks, and “now open” logic.
 */
export function getBerlinWallClock(date: Date): BerlinWallClock {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: BERLIN,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    weekday: 'long',
  }).formatToParts(date);

  const by: Record<string, string> = {};
  for (const p of parts) {
    if (p.type !== 'literal') {
      by[p.type] = p.value;
    }
  }

  const weekday = EN_WEEKDAY_TO_MONDAY_FIRST_INDEX[by.weekday ?? ''];
  if (weekday === undefined) {
    throw new Error(`Unknown weekday: ${by.weekday}`);
  }

  return {
    year: Number(by.year),
    month: Number(by.month),
    day: Number(by.day),
    hours: Number(by.hour),
    minutes: Number(by.minute),
    weekdayMon0: weekday,
  };
}

/**
 * Meeus/Jones/Butcher — Easter Sunday (month: 3 = March, 4 = April; day 1..31)
 */
function easterSundayMonthAndDay(y: number): { month: number; day: number } {
  const a = y % 19;
  const b = Math.floor(y / 100);
  const c = y % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const n = h + l - 7 * m + 114;
  const month = Math.floor(n / 31);
  const p = n % 31;
  return { month, day: p + 1 };
}

const FIXED: { m: number; d: number; id: string }[] = [
  { m: 1, d: 1, id: 'newYear' },
  { m: 5, d: 1, id: 'laborDay' },
  { m: 10, d: 3, id: 'germanUnity' },
  { m: 12, d: 25, id: 'christmas1' },
  { m: 12, d: 26, id: 'christmas2' },
];

function ymdInBerlinAfter(
  y: number,
  month1to12: number,
  d: number,
  offsetDays: number,
): { year: number; month: number; day: number } {
  const utc = Date.UTC(y, month1to12 - 1, d) + offsetDays * 24 * 60 * 60 * 1000;
  const t = new Intl.DateTimeFormat('en-CA', {
    timeZone: BERLIN,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .formatToParts(new Date(utc))
    .reduce<Record<string, string>>((acc, p) => {
      if (p.type !== 'literal') {
        acc[p.type] = p.value;
      }
      return acc;
    }, {});

  return {
    year: Number(t.year),
    month: Number(t.month),
    day: Number(t.day),
  };
}

/**
 * National public holidays + Fronleichnam (Hesse) where the business is based.
 * Uses Europe/Berlin for all calendar rules.
 */
export function getBerlinPublicHolidayId(date: Date): string | null {
  const { year, month, day } = getBerlinWallClock(date);

  for (const f of FIXED) {
    if (f.m === month && f.d === day) {
      return f.id;
    }
  }

  const e = easterSundayMonthAndDay(year);
  const movable: { offset: number; id: string }[] = [
    { offset: -2, id: 'goodFriday' },
    { offset: 1, id: 'easterMonday' },
    { offset: 39, id: 'ascension' },
    { offset: 50, id: 'whitMonday' },
    { offset: 60, id: 'corpusChristi' },
  ];

  for (const m of movable) {
    const ymd = ymdInBerlinAfter(year, e.month, e.day, m.offset);
    if (ymd.year === year && ymd.month === month && ymd.day === day) {
      return m.id;
    }
  }

  return null;
}
