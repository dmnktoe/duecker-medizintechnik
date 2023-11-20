import { zodResolver } from '@hookform/resolvers/zod';
import * as Sentry from '@sentry/nextjs';
import axios from 'axios';
import { i18n, Trans, useTranslation } from 'next-i18next';
import React, { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Button from '@/components/ui/buttons/Button';
import UnderlineLink from '@/components/ui/links/UnderlineLink';

export default function ContactForm() {
  type FormData = z.infer<typeof formSchema>;

  const { t } = useTranslation('contact');
  const [result, setResult] = useState<string>();
  const [resultColor, setResultColor] = useState<string>();
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const formSchema = z.object({
    fullName: z.string().min(1, {
      message: i18n?.t('contact:content.contactForm.fullName.error.required'),
    }),
    email: z
      .string()
      .min(1, {
        message: i18n?.t('contact:content.contactForm.email.error.required'),
      })
      .email({
        message: i18n?.t('contact:content.contactForm.email.error.invalid'),
      }),
    phone: z.string().min(1, {
      message: i18n?.t('contact:content.contactForm.phone.error.required'),
    }),
    message: z
      .string()
      .min(10, {
        message: i18n?.t('contact:content.contactForm.message.error.minLength'),
      })
      .max(1000, {
        message: i18n?.t('contact:content.contactForm.message.error.maxLength'),
      }),
    terms: z.boolean().refine((val) => val, {
      message: i18n?.t('contact:content.contactForm.terms.error'),
    }),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const processForm = async (data: FormData) => {
    const token = await recaptchaRef?.current?.executeAsync();
    recaptchaRef?.current?.reset();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore-next-line
    data['token'] = token || '';
    const config = {
      method: 'post',
      url: '/api/form',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };
    try {
      const response = await axios(config);
      if (response.status === 200) {
        // Handle success. You can change the message to whatever you want.
        setResult(
          i18n?.t('contact:content.contactForm.submit.success') ||
            'Thank you for your message. We will get back to you as soon as possible.',
        );
        setResultColor('text-green-500');
        // Reset the form after successful submission
        reset();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // Handle errors. You can change the message to whatever you want.
      setResult(err.response.data.message + ': ' + err.response.statusText);
      setResultColor('text-red-500');
      Sentry.captureException(err);
    }
  };

  return (
    <>
      <div className='cookieconsent-optout-marketing'>
        {t('content.contactForm.recaptchaCookieNotice')}
      </div>
      <div className='cookieconsent-optin-marketing'>
        <form
          className='w-full space-y-4'
          onSubmit={handleSubmit(processForm)}
          noValidate
        >
          <div>
            <label
              htmlFor='fullName'
              className='mb-2 block text-sm font-medium text-gray-900'
            >
              {errors.fullName?.message ? (
                <span className='text-red-500'>
                  {t('content.contactForm.fullName.label')}*
                </span>
              ) : (
                <span>{t('content.contactForm.fullName.label')}*</span>
              )}
            </label>
            <input
              type='text'
              id='fullName'
              className={`${
                errors.fullName?.message && 'border-red-500'
              } dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500`}
              placeholder={t('content.contactForm.fullName.placeholder')}
              {...register('fullName')}
            />
            {errors.fullName?.message && (
              <div className='mt-1 text-xs text-red-500'>
                {errors.fullName?.message}
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor='email'
              className='mb-2 block text-sm font-medium text-gray-900'
            >
              {errors.email?.message ? (
                <span className='text-red-500'>
                  {t('content.contactForm.email.label')}*
                </span>
              ) : (
                <span>{t('content.contactForm.email.label')}*</span>
              )}
            </label>
            <input
              type='email'
              id='email'
              className={`${
                errors.email?.message && 'border-red-500'
              } dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500`}
              placeholder={t('content.contactForm.email.placeholder')}
              {...register('email')}
            />
            {errors.email?.message && (
              <div className='mt-1 text-xs text-red-500'>
                {errors.email?.message}
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor='phone'
              className='mb-2 block text-sm font-medium text-gray-900'
            >
              {errors.phone?.message ? (
                <span className='text-red-500'>
                  {t('content.contactForm.phone.label')}*
                </span>
              ) : (
                <span>{t('content.contactForm.phone.label')}*</span>
              )}
            </label>
            <input
              type='phone'
              id='phone'
              className={`${
                errors.phone?.message && 'border-red-500'
              } dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500`}
              placeholder={t('content.contactForm.phone.placeholder')}
              {...register('phone')}
            />
            {errors.phone?.message && (
              <div className='mt-1 text-xs text-red-500'>
                {errors.phone?.message}
              </div>
            )}
          </div>
          <div>
            <div className='sm:col-span-2'>
              <label
                htmlFor='message'
                className='mb-2 block text-sm font-medium text-gray-900'
              >
                {errors.message?.message ? (
                  <span className='text-red-500'>
                    {t('content.contactForm.message.label')}*
                  </span>
                ) : (
                  <span>{t('content.contactForm.message.label')}*</span>
                )}
              </label>
              <textarea
                id='message'
                rows={4}
                className={`${
                  errors.message?.message && 'border-red-500'
                } dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500`}
                placeholder={t('content.contactForm.message.placeholder')}
                {...register('message')}
              ></textarea>
              {errors.message?.message && (
                <div className='mt-1 text-xs text-red-500'>
                  {errors.message?.message}
                </div>
              )}
            </div>
          </div>
          <div className='py-1'>
            <div className='flex items-center'>
              <input
                type='checkbox'
                id='terms'
                className='h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500'
                {...register('terms')}
              />
              <label
                htmlFor='terms'
                className='ml-2 block text-sm text-gray-900'
              >
                <Trans
                  i18nKey='content.contactForm.terms.label'
                  t={t}
                  components={{
                    linkTag: (
                      <UnderlineLink
                        target='_blank'
                        href='/datenschutz'
                        // eslint-disable-next-line react/no-children-prop
                        children=''
                      />
                    ),
                  }}
                />
              </label>
            </div>
            {errors.terms?.message && (
              <div className='mt-1 text-xs text-red-500'>
                {errors.terms?.message}
              </div>
            )}
          </div>
          <div>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            {global?.window?.Cookiebot?.consent?.marketing === 'true' && (
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                size='invisible'
                ref={recaptchaRef}
                hl='en'
              />
            )}
          </div>
          <div className='flex flex-col items-center justify-between gap-8'>
            <Button
              type='submit'
              disabled={isSubmitting}
              onClick={handleSubmit(processForm)}
              isLoading={isSubmitting}
              className='w-full'
              role='button'
            >
              {isSubmitting
                ? 'Sending...'
                : t('content.contactForm.submit.label')}
            </Button>

            {isSubmitSuccessful && (
              <div className={`text-left text-xs ${resultColor}`}>{result}</div>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
