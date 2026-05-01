import * as React from 'react';

import clsxm from '@/lib/clsxm';
import {
  getOpenStatusNowBerlin,
  labelDayRange,
  listWeekdays,
  type WeekdayKey,
} from '@/lib/opening-hours';

import { Body, Title } from '@/components/ui';

type Variant = 'nowOpen' | 'weeklyOverview';

type Props = {
  locale: 'de' | 'en';
  variant: Variant;
  className?: string;
};

const dayLabels: Record<Props['locale'], Record<WeekdayKey, string>> = {
  de: {
    mon: 'Montag',
    tue: 'Dienstag',
    wed: 'Mittwoch',
    thu: 'Donnerstag',
    fri: 'Freitag',
    sat: 'Samstag',
    sun: 'Sonntag',
  },
  en: {
    mon: 'Monday',
    tue: 'Tuesday',
    wed: 'Wednesday',
    thu: 'Thursday',
    fri: 'Friday',
    sat: 'Saturday',
    sun: 'Sunday',
  },
};

export function OpeningHoursWidget({ locale, variant, className }: Props) {
  const { weekday, status } = getOpenStatusNowBerlin();
  const todayLabel = labelDayRange(weekday, locale);

  if (variant === 'nowOpen') {
    return (
      <div className={clsxm('mt-6 rounded-md bg-gray-100 p-3', className)}>
        <div className='flex items-start justify-between gap-3'>
          <div>
            <Title size='five' margin={false}>
              {locale === 'de' ? 'Öffnungszeiten' : 'Opening hours'}
            </Title>
            <Body size='sm' margin={false} color='light' className='mt-1'>
              {dayLabels[locale][weekday]} {todayLabel}
            </Body>
          </div>
          <div className='mt-1 flex shrink-0 items-center gap-2'>
            <span
              aria-hidden='true'
              className={clsxm(
                'inline-block h-2 w-2 rounded-full',
                status.isOpen ? 'bg-green-500' : 'bg-gray-300',
              )}
            />
            <Body
              size='xs'
              margin={false}
              color='light'
              className='whitespace-nowrap'
            >
              {status.isOpen
                ? locale === 'de'
                  ? 'Jetzt geöffnet'
                  : 'Open now'
                : locale === 'de'
                  ? 'Geschlossen'
                  : 'Closed'}
            </Body>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={clsxm(className)}>
      <Title size='four' margin={false}>
        {locale === 'de' ? 'Öffnungszeiten' : 'Opening hours'}
      </Title>
      <div className='mt-4 space-y-2'>
        {listWeekdays().map((day: WeekdayKey) => {
          const isToday = day === weekday;
          const label = labelDayRange(day, locale);
          return (
            <div
              key={day}
              className={clsxm(
                'flex items-baseline justify-between gap-4',
                isToday && 'text-primary-500',
              )}
            >
              <Body size='sm' margin={false}>
                {dayLabels[locale][day]}
              </Body>
              <Body
                size='sm'
                margin={false}
                color={isToday ? undefined : 'light'}
              >
                {label}
              </Body>
            </div>
          );
        })}
      </div>
    </div>
  );
}
