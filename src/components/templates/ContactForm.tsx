import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { i18n, useTranslation } from 'next-i18next';
import React, { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Button from '@/components/ui/buttons/Button';

const formSchema = z.object({
  fullName: z
    .string()
    .min(1, { message: i18n?.t('contact:contactForm.fullName.error') }),
  email: z
    .string()
    .min(1, { message: i18n?.t('contact:contactForm.email.error.required') })
    .email({
      message: i18n?.t('contact:contactForm.email.error.invalid'),
    }),
  phone: z
    .string()
    .min(1, { message: i18n?.t('contact:contactForm.phone.error.required') })
    // TODO: Regex for phone number
    .regex(/^\+(?:[0-9]⋅?){6,14}[0-9]$/, {
      message: i18n?.t('contact:contactForm.phone.error.invalid'),
    }),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters' })
    .max(1000, { message: 'Message must be less than 1000 characters' }),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactForm() {
  const { t } = useTranslation('contact');
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [result, setResult] = useState<string>();
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [resultColor, setResultColor] = useState<string>();
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const {
    register,
    handleSubmit,
    reset,
    // eslint-disable-next-line unused-imports/no-unused-vars
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
          'Your message has been sent. Thank you for contacting us. We will get back to you as soon as possible.',
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
    }
  };

  return (
    <>
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
                {t('contactForm.fullName.label')}
              </span>
            ) : (
              <span>{t('contactForm.fullName.label')}</span>
            )}
          </label>
          <input
            type='text'
            id='fullName'
            className={`${
              errors.fullName?.message && 'border-red-500'
            } dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500`}
            placeholder={t('contactForm.fullName.placeholder')}
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
                {t('contactForm.email.label')}
              </span>
            ) : (
              <span>{t('contactForm.email.label')}</span>
            )}
          </label>
          <input
            type='email'
            id='email'
            className={`${
              errors.email?.message && 'border-red-500'
            } dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500`}
            placeholder={t('contactForm.email.placeholder')}
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
                {t('contactForm.phone.label')}
              </span>
            ) : (
              <span>{t('contactForm.phone.label')}</span>
            )}
          </label>
          <input
            type='phone'
            id='phone'
            className={`${
              errors.phone?.message && 'border-red-500'
            } dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500`}
            placeholder={t('contactForm.phone.placeholder')}
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
                  {t('contactForm.message.label')}
                </span>
              ) : (
                <span>{t('contactForm.message.label')}</span>
              )}
            </label>
            <textarea
              id='message'
              rows={4}
              className={`${
                errors.message?.message && 'border-red-500'
              } dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500`}
              placeholder={t('contactForm.message.placeholder')}
              {...register('message')}
            ></textarea>
            {errors.message?.message && (
              <div className='mt-1 text-xs text-red-500'>
                {errors.message?.message}
              </div>
            )}
          </div>
        </div>
        <div>
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
            size='invisible'
            ref={recaptchaRef}
            hl='en'
          />
        </div>
        <div className='flex flex-col items-center justify-between gap-8'>
          <Button
            type='submit'
            disabled={isSubmitting}
            onClick={handleSubmit(processForm)}
            isLoading={isSubmitting}
            className='w-full'
          >
            {isSubmitting ? 'Sending...' : t('contactForm.submitButton')}
          </Button>

          {isSubmitSuccessful && (
            <div className={`text-left text-xs ${resultColor}`}>{result}</div>
          )}
        </div>
      </form>
    </>
  );
}
