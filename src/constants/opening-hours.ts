export type WeekdayKey = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export type OpeningHoursTime = { hour: number; minute: number };
export type OpeningHoursTimeRange = {
  start: OpeningHoursTime;
  end: OpeningHoursTime;
};

export type OpeningHoursDay = {
  /** Human-readable label to display, e.g. "07:30–16:00" */
  label: string;
  /** Concrete time ranges used for "open now" calculation */
  ranges: OpeningHoursTimeRange[];
  /** Explicit closed flag for easy rendering */
  closed?: boolean;
};

export type OpeningHoursWeek = Record<WeekdayKey, OpeningHoursDay>;

export const weekdayOrder: WeekdayKey[] = [
  'mon',
  'tue',
  'wed',
  'thu',
  'fri',
  'sat',
  'sun',
];

/**
 * Business opening hours in Europe/Berlin.
 */
export const openingHoursWeek: OpeningHoursWeek = {
  mon: {
    label: '07:30–16:00',
    ranges: [{ start: { hour: 7, minute: 30 }, end: { hour: 16, minute: 0 } }],
  },
  tue: {
    label: '07:30–16:00',
    ranges: [{ start: { hour: 7, minute: 30 }, end: { hour: 16, minute: 0 } }],
  },
  wed: {
    label: '07:30–16:00',
    ranges: [{ start: { hour: 7, minute: 30 }, end: { hour: 16, minute: 0 } }],
  },
  thu: {
    label: '07:30–16:00',
    ranges: [{ start: { hour: 7, minute: 30 }, end: { hour: 16, minute: 0 } }],
  },
  fri: {
    label: '07:30–14:30',
    ranges: [{ start: { hour: 7, minute: 30 }, end: { hour: 14, minute: 30 } }],
  },
  sat: { label: 'Geschlossen', ranges: [], closed: true },
  sun: { label: 'Geschlossen', ranges: [], closed: true },
};
