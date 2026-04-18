'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Trans, useTranslation } from 'react-i18next';
import React, { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button, Input, TextArea, UnderlineLink } from '@/components/ui';

export default function ContactForm() {
  type FormData = z.infer<typeof formSchema>;
  type FormDataWithToken = FormData & { token?: string };

  const { t, i18n } = useTranslation('contact');
  const [result, setResult] = useState<string>();
  const [resultColor, setResultColor] = useState<string>();
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const formSchema = z.object({
    name: z.string().min(1, {
      message: i18n?.t('contact:content.contactForm.name.error.required'),
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
      message: i18n?.t('contact:content.contactForm.terms.error.required'),
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

  const processForm = async (data: FormDataWithToken) => {
    const token = await recaptchaRef?.current?.executeAsync();
    recaptchaRef?.current?.reset();
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
        setResult(i18n?.t('contact:content.contactForm.submit.success'));
        setResultColor('text-green-500');
        reset();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setResult(err.response.data.message + ': ' + err.response.statusText);
      setResultColor('text-red-500');
    }
  };

  const inputFields = [
    {
      autocomplete: 'name',
      error: errors.name,
      id: 'name',
      label: t('content.contactForm.name.label'),
      placeholder: t('content.contactForm.name.placeholder'),
      type: 'text',
    },
    {
      autocomplete: 'email',
      error: errors.email,
      id: 'email',
      label: t('content.contactForm.email.label'),
      placeholder: t('content.contactForm.email.placeholder'),
      type: 'email',
    },
    {
      autocomplete: 'tel',
      error: errors.phone,
      id: 'phone',
      label: t('content.contactForm.phone.label'),
      placeholder: t('content.contactForm.phone.placeholder'),
      type: 'tel',
    },
  ];

  return (
    <form
      className='w-full space-y-4'
      onSubmit={handleSubmit(processForm)}
      noValidate
    >
      {inputFields.map((field) => (
        <Input {...field} register={register} key={field.id} />
      ))}
      <TextArea
        error={errors.message}
        id='message'
        label={t('content.contactForm.message.label')}
        placeholder={t('content.contactForm.message.placeholder')}
        register={register}
      />
      <div className='py-1'>
        <div className='flex items-center'>
          <input
            type='checkbox'
            id='terms'
            className='h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500'
            {...register('terms')}
          />
          <label htmlFor='terms' className='ml-2 block text-sm text-gray-900'>
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
        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
          ref={recaptchaRef}
          hl={i18n.language}
          size='invisible'
        />
      </div>
      <div className='flex flex-col items-center justify-between gap-4'>
        <Button
          type='submit'
          disabled={isSubmitting}
          onClick={handleSubmit(processForm)}
          isLoading={isSubmitting}
          className='w-full'
          role='button'
        >
          {isSubmitting
            ? t('content.contactForm.submit.progress')
            : t('content.contactForm.submit.label')}
        </Button>

        {isSubmitSuccessful && (
          <div className={`text-left text-xs ${resultColor}`}>{result}</div>
        )}
      </div>
    </form>
  );
}
