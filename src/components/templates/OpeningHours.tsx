'use client';

import { useTranslations } from 'next-intl';
import * as React from 'react';
import { VscWatch } from 'react-icons/vsc';

import clsxm from '@/lib/clsxm';
import {
  type BerlinWallClock,
  getBerlinPublicHolidayId,
  getBerlinWallClock,
} from '@/lib/german-public-holidays';

import { Title } from '@/components/ui';

type DaySchedule = {
  day: string;
  hours: string;
  closed: boolean;
};

const normalizeEnDash = (s: string) => s.replace(/\u2013/g, '-').trim();

function parseTime(timeStr: string): { hour: number; minute: number } {
  const [h, m] = normalizeEnDash(timeStr).split(/[-:]/).map(Number);
  return { hour: h, minute: m };
}

function isCurrentlyOpen(
  schedule: DaySchedule[],
  clock: BerlinWallClock,
  holidayId: string | null,
): boolean {
  const today = schedule[clock.weekdayMon0];

  if (today.closed || holidayId) {
    return false;
  }

  const parts = normalizeEnDash(today.hours).split('-');
  if (parts.length !== 2) {
    return false;
  }

  const open = parseTime(parts[0]);
  const close = parseTime(parts[1]);
  const currentMinutes = clock.hours * 60 + clock.minutes;
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
      <span
        className={clsxm(
          'text-sm font-semibold',
          isOpen ? 'text-green-700' : 'text-red-700',
        )}
      >
        {label}
      </span>
    </div>
  );
}

type OpeningHoursProps = {
  variant?: 'full' | 'compact';
};

/**
 * @param sharedIconCol - when true, parent provides the left icon column (Contact page)
 */
function OpeningHoursFull({
  schedule,
  currentDayIndex,
  holidayKey,
  open,
  statusLabel,
  t,
  sharedIconCol,
}: {
  schedule: DaySchedule[];
  currentDayIndex: number;
  holidayKey: string | null;
  open: boolean;
  statusLabel: string;
  t: (key: string) => string;
  sharedIconCol: boolean;
}) {
  const inner = (
    <div className='min-w-0 flex-1'>
      <div className='flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4'>
        <Title size='five' renderAs='h5' margin={false}>
          {t('openingHours.title')}
        </Title>
        <LiveIndicator isOpen={open} label={statusLabel} />
      </div>

      {holidayKey && (
        <div className='text-dark mt-2 inline-block w-full max-w-md rounded border border-amber-200/80 bg-amber-50 px-2.5 py-1.5 text-xs sm:text-sm'>
          {t(`openingHours.holidays.${holidayKey}`)} –{' '}
          {t('openingHours.closed')}
        </div>
      )}

      <ul className='text-dark mt-3 max-w-md list-none space-y-0.5 p-0'>
        {schedule.map((entry, i) => {
          const isToday = i === currentDayIndex;
          return (
            <li
              key={entry.day}
              className={clsxm(
                'grid grid-cols-[minmax(0,1fr)_auto] gap-3 text-sm',
                isToday
                  ? 'text-dark border-primary-500/25 bg-primary-500/[0.04] -ml-0.5 rounded border py-0.5 pr-1.5 pl-2'
                  : 'py-0.5 pl-0.5',
                entry.closed && 'text-light-gray',
              )}
            >
              <span
                className={clsxm('min-w-0', isToday && 'font-semibold')}
                title={entry.day}
              >
                {entry.day}
                {isToday && (
                  <span className='text-primary-500/80 ml-1.5 text-xs font-normal'>
                    {t('openingHours.todayLabel')}
                  </span>
                )}
              </span>
              <span
                className={clsxm(
                  'shrink-0 tabular-nums',
                  isToday && 'font-medium',
                )}
              >
                {entry.hours}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );

  if (sharedIconCol) {
    return <>{inner}</>;
  }

  return (
    <div className='mt-8 max-w-md'>
      <div className='text-primary-500 flex items-start gap-0'>
        <div className='bg-primary-500/10 text-primary-500 mr-6 flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-sm sm:mr-6 sm:h-[70px] sm:w-[70px]'>
          <VscWatch className='h-6 w-6' />
        </div>
        {inner}
      </div>
    </div>
  );
}

function OpeningHoursCompact({
  schedule,
  currentDayIndex,
  holidayKey,
  open,
  statusLabel,
  t,
}: {
  schedule: DaySchedule[];
  currentDayIndex: number;
  holidayKey: string | null;
  open: boolean;
  statusLabel: string;
  t: (key: string) => string;
}) {
  return (
    <div className='mt-4 w-full max-w-sm min-w-0'>
      <div className='text-dark mb-2 text-sm font-semibold tracking-tight'>
        {t('openingHours.title')}
      </div>
      <ul className='m-0 list-none space-y-0.5 p-0 text-sm'>
        {schedule.map((entry, i) => {
          const isToday = i === currentDayIndex;
          return (
            <li
              key={entry.day}
              className={clsxm(
                'grid grid-cols-[minmax(0,1fr)_auto] gap-3',
                isToday
                  ? 'text-dark border-primary-500/20 bg-primary-500/[0.04] -mx-0.5 rounded border py-0.5 pr-0.5 pl-1.5'
                  : '',
                entry.closed && 'text-light-gray',
              )}
            >
              <span
                className={clsxm(
                  'min-w-0 break-words',
                  isToday && 'font-semibold',
                )}
              >
                {entry.day}
              </span>
              <span
                className={clsxm(
                  'shrink-0 tabular-nums',
                  isToday && 'font-medium',
                )}
              >
                {entry.hours}
              </span>
            </li>
          );
        })}
      </ul>
      {holidayKey && (
        <p className='text-light-gray mt-1.5 text-xs leading-snug'>
          {t(`openingHours.holidays.${holidayKey}`)} –{' '}
          {t('openingHours.closed')}
        </p>
      )}
      <div className='mt-2.5'>
        <LiveIndicator isOpen={open} label={statusLabel} />
      </div>
    </div>
  );
}

export default function OpeningHours({
  variant = 'full',
  /** Used on Contact: align with the icon column of address / phone / email */
  sharedIconCol = false,
}: OpeningHoursProps & { sharedIconCol?: boolean }) {
  const t = useTranslations('common');
  const tFn = t as (key: string) => string;

  const [now, setNow] = React.useState(() => new Date());

  React.useEffect(() => {
    setNow(new Date());
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

  const wall = React.useMemo(() => getBerlinWallClock(now), [now]);
  const holidayKey = getBerlinPublicHolidayId(now);
  const currentDayIndex = wall.weekdayMon0;
  const open = isCurrentlyOpen(schedule, wall, holidayKey);
  const statusLabel = holidayKey
    ? t('openingHours.holiday')
    : open
      ? t('openingHours.nowOpen')
      : t('openingHours.nowClosed');

  if (variant === 'compact') {
    return (
      <OpeningHoursCompact
        schedule={schedule}
        currentDayIndex={currentDayIndex}
        holidayKey={holidayKey}
        open={open}
        statusLabel={statusLabel}
        t={tFn}
      />
    );
  }

  return (
    <OpeningHoursFull
      schedule={schedule}
      currentDayIndex={currentDayIndex}
      holidayKey={holidayKey}
      open={open}
      statusLabel={statusLabel}
      t={tFn}
      sharedIconCol={sharedIconCol}
    />
  );
}
