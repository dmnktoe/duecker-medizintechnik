'use client';

import { useFocusTrap, useHeadlessConsentUI } from '@c15t/nextjs';
import { useTranslations } from 'next-intl';
import * as React from 'react';

import { Body, Button, PrimaryLink, Title } from '@/components/ui';

import { ConsentCategoryToggles } from './ConsentCategoryToggles';

export function ConsentSurfaces() {
  const t = useTranslations('cookiePolicy.consent');
  const {
    banner,
    dialog,
    performBannerAction,
    performDialogAction,
    saveCustomPreferences,
    openDialog,
    closeUI,
  } = useHeadlessConsentUI();

  const panelRef = React.useRef<HTMLDivElement>(null);
  useFocusTrap(dialog.isVisible, panelRef);

  React.useEffect(() => {
    if (!dialog.isVisible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [dialog.isVisible]);

  React.useEffect(() => {
    if (!dialog.isVisible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeUI();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [dialog.isVisible, closeUI]);

  return (
    <>
      {banner.isVisible ? (
        <div
          className='fixed inset-x-0 bottom-0 z-[100] border-t border-gray-200 bg-white shadow-lg'
          role='region'
          aria-label={t('banner.title')}
        >
          <div className='mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 md:flex-row md:items-end md:justify-between md:gap-8 md:py-6'>
            <div className='min-w-0 flex-1'>
              <Title
                size='four'
                renderAs='h2'
                className='mt-0 !mb-2'
                margin={false}
              >
                {t('banner.title')}
              </Title>
              <Body margin={false} size='sm'>
                {t('banner.description')}
              </Body>
              <PrimaryLink
                href='/cookie-richtlinie'
                variant='primary'
                className='mt-3 inline-block text-sm'
              >
                {t('cookiePolicyLink')}
              </PrimaryLink>
            </div>
            <div className='flex shrink-0 flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-end'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => void performBannerAction('reject')}
              >
                {t('rejectAll')}
              </Button>
              <Button variant='outline' size='sm' onClick={() => openDialog()}>
                {t('customize')}
              </Button>
              <Button
                variant='primary'
                size='sm'
                onClick={() => void performBannerAction('accept')}
              >
                {t('acceptAll')}
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      {dialog.isVisible ? (
        <div
          className='bg-dark/50 fixed inset-0 z-[110] flex items-end justify-center p-4 sm:items-center'
          role='presentation'
          onClick={() => closeUI()}
        >
          <div
            ref={panelRef}
            role='dialog'
            aria-modal='true'
            aria-label={t('dialog.title')}
            className='max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white p-6 shadow-xl'
            onClick={(e) => e.stopPropagation()}
          >
            <Title size='three' renderAs='h2' className='!mb-2'>
              {t('dialog.title')}
            </Title>
            <Body margin={false} size='sm' className='!mb-4'>
              {t('dialog.description')}
            </Body>
            <ConsentCategoryToggles className='!mb-6' />
            <div className='flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-end'>
              <Button variant='ghost' size='sm' onClick={() => closeUI()}>
                {t('close')}
              </Button>
              <Button
                variant='outline'
                size='sm'
                onClick={() => void performDialogAction('reject')}
              >
                {t('rejectAll')}
              </Button>
              <Button
                variant='outline'
                size='sm'
                onClick={() => void performDialogAction('accept')}
              >
                {t('acceptAll')}
              </Button>
              <Button
                variant='primary'
                size='sm'
                onClick={() => void saveCustomPreferences()}
              >
                {t('save')}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
