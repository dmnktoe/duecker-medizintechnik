import {
  type OpeningHoursTime,
  type OpeningHoursTimeRange,
  type OpeningHoursWeek,
  openingHoursWeek,
  type WeekdayKey,
  weekdayOrder,
} from '@/constants/opening-hours';

export type OpeningHoursStatus =
  | { isOpen: true; closesAt: OpeningHoursTime }
  | { isOpen: false; opensAt: OpeningHoursTime | null };

export type { WeekdayKey };

function pad2(value: number) {
  return String(value).padStart(2, '0');
}

export function formatTime(t: OpeningHoursTime) {
  return `${pad2(t.hour)}:${pad2(t.minute)}`;
}

export function formatTimeRange(range: OpeningHoursTimeRange) {
  return `${formatTime(range.start)}–${formatTime(range.end)}`;
}

function minutesSinceMidnight(t: OpeningHoursTime) {
  return t.hour * 60 + t.minute;
}

function toBerlinParts(date: Date) {
  // Use stable `formatToParts` so we don't depend on server timezone.
  const dtf = new Intl.DateTimeFormat('de-DE', {
    timeZone: 'Europe/Berlin',
    hour12: false,
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
  });
  const parts = dtf.formatToParts(date);
  const map = Object.fromEntries(parts.map((p) => [p.type, p.value]));
  return {
    weekdayLong: map.weekday,
    hour: Number(map.hour),
    minute: Number(map.minute),
  };
}

const weekdayMapDeLongToKey: Record<string, WeekdayKey> = {
  montag: 'mon',
  dienstag: 'tue',
  mittwoch: 'wed',
  donnerstag: 'thu',
  freitag: 'fri',
  samstag: 'sat',
  sonntag: 'sun',
};

export function getTodayWeekdayBerlin(now = new Date()): WeekdayKey {
  const parts = toBerlinParts(now);
  return weekdayMapDeLongToKey[parts.weekdayLong.toLowerCase()];
}

export function getOpenStatusNowBerlin(
  week: OpeningHoursWeek = openingHoursWeek,
  now = new Date(),
): { weekday: WeekdayKey; status: OpeningHoursStatus } {
  const parts = toBerlinParts(now);
  const weekday = weekdayMapDeLongToKey[parts.weekdayLong.toLowerCase()];
  const minutesNow = parts.hour * 60 + parts.minute;
  const ranges = week[weekday]?.ranges ?? [];

  for (const r of ranges) {
    const startMin = minutesSinceMidnight(r.start);
    const endMin = minutesSinceMidnight(r.end);
    // Treat end as exclusive, so 16:00 exactly is "closed".
    if (minutesNow >= startMin && minutesNow < endMin) {
      return {
        weekday,
        status: { isOpen: true, closesAt: r.end },
      };
    }
  }

  // Find next opening today (or null if closed all day / already past).
  const upcoming =
    ranges
      .map((r) => ({ start: r.start, startMin: minutesSinceMidnight(r.start) }))
      .filter((x) => x.startMin > minutesNow)
      .sort((a, b) => a.startMin - b.startMin)[0] ?? null;

  return {
    weekday,
    status: { isOpen: false, opensAt: upcoming ? upcoming.start : null },
  };
}

export function labelDayRange(
  day: WeekdayKey,
  locale: 'de' | 'en',
  week: OpeningHoursWeek = openingHoursWeek,
): string {
  const info = week[day];
  if (info.closed || !info.ranges.length) {
    return locale === 'de' ? 'Geschlossen' : 'Closed';
  }
  // If a custom label is set and locale is German, use it (existing content expectation).
  // Otherwise, compute a label from time ranges.
  if (locale === 'de' && info.label) return info.label;
  return info.ranges.map(formatTimeRange).join(', ');
}

export function listWeekdays(): WeekdayKey[] {
  return weekdayOrder;
}
