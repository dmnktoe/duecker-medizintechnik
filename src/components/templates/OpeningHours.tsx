'use client';

import { useTranslations } from 'next-intl';
import * as React from 'react';
import { PiClockThin } from 'react-icons/pi';

import clsxm from '@/lib/clsxm';

import { Body, Title } from '@/components/ui';

type DaySchedule = {
  day: string;
  hours: string;
  closed: boolean;
};

const GERMAN_HOLIDAYS: { month: number; day: number; key: string }[] = [
  { month: 1, day: 1, key: 'newYear' },
  { month: 5, day: 1, key: 'laborDay' },
  { month: 10, day: 3, key: 'germanUnity' },
  { month: 12, day: 25, key: 'christmas1' },
  { month: 12, day: 26, key: 'christmas2' },
];

function getEasterDate(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

function getMovableHolidays(year: number): Date[] {
  const easter = getEasterDate(year);
  const addDays = (d: Date, n: number) => {
    const result = new Date(d);
    result.setDate(result.getDate() + n);
    return result;
  };

  return [
    addDays(easter, -2), // Karfreitag
    addDays(easter, 1), // Ostermontag
    addDays(easter, 39), // Christi Himmelfahrt
    addDays(easter, 50), // Pfingstmontag
    addDays(easter, 60), // Fronleichnam
  ];
}

function isHoliday(date: Date): string | null {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  for (const h of GERMAN_HOLIDAYS) {
    if (h.month === month && h.day === day) return h.key;
  }

  const movableKeys = [
    'goodFriday',
    'easterMonday',
    'ascension',
    'whitMonday',
    'corpusChristi',
  ];
  const movable = getMovableHolidays(year);
  for (let i = 0; i < movable.length; i++) {
    if (
      movable[i].getMonth() === date.getMonth() &&
      movable[i].getDate() === date.getDate()
    ) {
      return movableKeys[i];
    }
  }

  return null;
}

function parseTime(timeStr: string): { hour: number; minute: number } {
  const [h, m] = timeStr.split(':').map(Number);
  return { hour: h, minute: m };
}

function isCurrentlyOpen(schedule: DaySchedule[], now: Date): boolean {
  const dayIndex = now.getDay();
  const adjustedIndex = dayIndex === 0 ? 6 : dayIndex - 1;
  const today = schedule[adjustedIndex];

  if (today.closed || isHoliday(now)) return false;

  const parts = today.hours.split('–');
  if (parts.length !== 2) return false;

  const open = parseTime(parts[0]);
  const close = parseTime(parts[1]);
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const openMinutes = open.hour * 60 + open.minute;
  const closeMinutes = close.hour * 60 + close.minute;

  return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
}

function LiveIndicator({ isOpen, label }: { isOpen: boolean; label: string }) {
  return (
    <div className='flex items-center gap-2'>
      <span className='relative flex h-3 w-3'>
        <span
          className={clsxm(
            'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75',
            isOpen ? 'bg-green-500' : 'bg-red-500',
          )}
        />
        <span
          className={clsxm(
            'relative inline-flex h-3 w-3 rounded-full',
            isOpen ? 'bg-green-500' : 'bg-red-500',
          )}
        />
      </span>
      <Body
        size='sm'
        margin={false}
        className={clsxm(
          'font-semibold',
          isOpen ? 'text-green-700' : 'text-red-700',
        )}
      >
        {label}
      </Body>
    </div>
  );
}

type OpeningHoursProps = {
  variant?: 'full' | 'compact';
};

export default function OpeningHours({ variant = 'full' }: OpeningHoursProps) {
  const t = useTranslations('common');
  const [now, setNow] = React.useState(() => new Date());

  React.useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(interval);
  }, []);

  const schedule: DaySchedule[] = React.useMemo(
    () => [
      {
        day: t('openingHours.days.monday'),
        hours: '07:30–16:00',
        closed: false,
      },
      {
        day: t('openingHours.days.tuesday'),
        hours: '07:30–16:00',
        closed: false,
      },
      {
        day: t('openingHours.days.wednesday'),
        hours: '07:30–16:00',
        closed: false,
      },
      {
        day: t('openingHours.days.thursday'),
        hours: '07:30–16:00',
        closed: false,
      },
      {
        day: t('openingHours.days.friday'),
        hours: '07:30–14:30',
        closed: false,
      },
      {
        day: t('openingHours.days.saturday'),
        hours: t('openingHours.closed'),
        closed: true,
      },
      {
        day: t('openingHours.days.sunday'),
        hours: t('openingHours.closed'),
        closed: true,
      },
    ],
    [t],
  );

  const currentDayIndex = now.getDay() === 0 ? 6 : now.getDay() - 1;
  const holidayKey = isHoliday(now);
  const open = isCurrentlyOpen(schedule, now);
  const statusLabel = holidayKey
    ? t('openingHours.holiday')
    : open
      ? t('openingHours.nowOpen')
      : t('openingHours.nowClosed');

  if (variant === 'compact') {
    return (
      <div className='mt-4'>
        <Title size='five' renderAs='h5' margin={false}>
          {t('openingHours.title')}
        </Title>
        <div className='mt-2 space-y-1'>
          {schedule.map((entry, i) => {
            const isToday = i === currentDayIndex;
            return (
              <div
                key={entry.day}
                className={clsxm(
                  'flex justify-between text-sm',
                  isToday && 'font-semibold',
                  entry.closed && 'text-light-gray',
                )}
              >
                <span>{entry.day}</span>
                <span>{entry.hours}</span>
              </div>
            );
          })}
        </div>
        {holidayKey && (
          <Body size='xs' color='light' margin={false} className='mt-1'>
            {t(`openingHours.holidays.${holidayKey}`)} –{' '}
            {t('openingHours.closed')}
          </Body>
        )}
        <div className='mt-2'>
          <LiveIndicator isOpen={open} label={statusLabel} />
        </div>
      </div>
    );
  }

  return (
    <div className='mt-8'>
      <div className='mb-4 flex items-center gap-3'>
        <div className='bg-primary-500/10 text-primary-500 flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-sm sm:h-[70px] sm:w-[70px]'>
          <PiClockThin className='h-6 w-6' />
        </div>
        <div>
          <Title size='five' renderAs='h5' margin={false}>
            {t('openingHours.title')}
          </Title>
          <div className='mt-1'>
            <LiveIndicator isOpen={open} label={statusLabel} />
          </div>
        </div>
      </div>

      <div className='ml-0 space-y-1.5'>
        {schedule.map((entry, i) => {
          const isToday = i === currentDayIndex;
          return (
            <div
              key={entry.day}
              className={clsxm(
                'flex items-center justify-between rounded-sm px-3 py-1.5 transition-colors',
                isToday &&
                  !entry.closed &&
                  'bg-primary-500/5 border-primary-500 border-l-2',
                isToday &&
                  entry.closed &&
                  'border-l-2 border-red-300 bg-red-50',
                !isToday && 'border-l-2 border-transparent',
              )}
            >
              <Body
                size='sm'
                margin={false}
                className={clsxm(
                  isToday && 'font-semibold',
                  entry.closed && 'text-light-gray',
                )}
              >
                {entry.day}
              </Body>
              <Body
                size='sm'
                margin={false}
                className={clsxm(
                  isToday && 'font-semibold',
                  entry.closed && 'text-light-gray',
                )}
              >
                {entry.hours}
              </Body>
            </div>
          );
        })}
      </div>

      {holidayKey && (
        <div className='mt-3 rounded-sm bg-amber-50 px-3 py-2'>
          <Body size='xs' margin={false} className='text-amber-800'>
            🏖 {t(`openingHours.holidays.${holidayKey}`)} –{' '}
            {t('openingHours.closed')}
          </Body>
        </div>
      )}
    </div>
  );
}
