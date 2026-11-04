'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import * as React from 'react';
import { type FieldError, useForm, useWatch } from 'react-hook-form';
import {
  VscCallOutgoing,
  VscCheck,
  VscMail,
  VscWarning,
} from 'react-icons/vsc';

import {
  CONTACT_TOPICS,
  type ContactApiResponse,
  type ContactErrorCode,
  type ContactFieldName,
  type ContactFields,
  contactFieldsSchema,
  LIMITS,
} from '@/lib/contact/schema';

import {
  type AltchaHandle,
  AltchaWidget,
} from '@/components/templates/contact/AltchaWidget';
import { Button, UnderlineLink } from '@/components/ui';

import { company } from '@/constants/company';

const API_URL = '/api/form/';
const CHALLENGE_URL = '/api/form/challenge/';

type SubmitError = ContactErrorCode | 'network';

const inputClasses =
  'block w-full rounded-md border bg-gray-50 p-2.5 text-base text-gray-900 shadow-sm transition-colors placeholder:text-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 focus:outline-none sm:text-sm';

function fieldClasses(error?: FieldError) {
  return `${inputClasses} ${error ? 'border-red-500 bg-red-50/40' : 'border-gray-300'}`;
}

interface FieldShellProps {
  id: ContactFieldName;
  label: string;
  optionalLabel?: string;
  hint?: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}

function FieldShell({
  id,
  label,
  optionalLabel,
  hint,
  error,
  children,
}: FieldShellProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className='mb-1.5 flex items-baseline justify-between gap-2 text-sm font-medium text-gray-900'
      >
        <span>
          {label}
          {!optionalLabel && (
            <span aria-hidden='true' className='text-red-500'>
              {' '}
              *
            </span>
          )}
        </span>
        {optionalLabel && (
          <span className='text-xs font-normal text-gray-500'>
            {optionalLabel}
          </span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className='mt-1 text-xs text-gray-500'>
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className='mt-1 text-xs text-red-600'>
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactForm() {
  const t = useTranslations('contact');
  const tf = (key: string, values?: Record<string, string | number>) =>
    t(`content.contactForm.${key}`, values);
  const locale = useLocale();

  const altchaRef = React.useRef<AltchaHandle>(null);
  const honeypotRef = React.useRef<HTMLInputElement>(null);
  const successRef = React.useRef<HTMLDivElement>(null);
  const errorRef = React.useRef<HTMLDivElement>(null);

  const [submitError, setSubmitError] = React.useState<SubmitError | null>(
    null,
  );
  const [success, setSuccess] = React.useState<{
    reference: string;
    email: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ContactFields>({
    resolver: zodResolver(contactFieldsSchema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      company: '',
      email: '',
      phone: '',
      topic: '' as ContactFields['topic'],
      message: '',
    },
  });

  const messageLength = useWatch({ control, name: 'message' })?.length ?? 0;

  React.useEffect(() => {
    if (success) successRef.current?.focus();
  }, [success]);

  React.useEffect(() => {
    if (submitError) errorRef.current?.focus();
  }, [submitError]);

  const errorText = (name: ContactFieldName) => {
    const message = errors[name]?.message;
    return message ? tf(message) : undefined;
  };

  const describedBy = (name: ContactFieldName, hasHint = false) => {
    if (errors[name]) return `${name}-error`;
    return hasHint ? `${name}-hint` : undefined;
  };

  const onSubmit = async (fields: ContactFields) => {
    setSubmitError(null);

    const altcha = await altchaRef.current?.getPayload().catch(() => null);
    if (!altcha) {
      setSubmitError('captcha_failed');
      altchaRef.current?.reset();
      return;
    }

    let response: Response;
    try {
      response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...fields,
          locale,
          altcha,
          website: honeypotRef.current?.value ?? '',
        }),
      });
    } catch {
      setSubmitError('network');
      return;
    }

    altchaRef.current?.reset();

    const data = (await response
      .json()
      .catch(() => null)) as ContactApiResponse | null;

    if (response.ok && data?.ok) {
      setSuccess({ reference: data.reference, email: fields.email });
      reset();
      return;
    }

    if (data && !data.ok) {
      if (data.error === 'validation_failed' && data.fields) {
        for (const [name, message] of Object.entries(data.fields)) {
          setError(name as ContactFieldName, { message });
        }
      }
      setSubmitError(data.error);
      return;
    }
    setSubmitError(response.status === 429 ? 'rate_limited' : 'send_failed');
  };

  if (success) {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role='status'
        className='mt-6 rounded-lg border border-green-200 bg-green-50 p-6 outline-none'
      >
        <div className='mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white'>
          <VscCheck className='h-6 w-6' aria-hidden='true' />
        </div>
        <h3 className='mb-2 text-lg font-semibold text-gray-900'>
          {tf('success.title')}
        </h3>
        <p className='mb-4 text-sm text-gray-700'>
          {tf('success.text', { email: success.email })}
        </p>
        <p className='mb-4 text-sm text-gray-700'>
          {tf('success.reference')}:{' '}
          <strong className='font-mono tracking-wide'>
            {success.reference}
          </strong>
        </p>
        <p className='mb-5 text-xs text-gray-500'>{tf('success.spamHint')}</p>
        <Button
          type='button'
          variant='outline'
          onClick={() => setSuccess(null)}
        >
          {tf('success.again')}
        </Button>
      </div>
    );
  }

  return (
    <form
      className='mt-6 w-full space-y-5'
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-busy={isSubmitting}
    >
      <FieldShell id='name' label={tf('name.label')} error={errorText('name')}>
        <input
          id='name'
          type='text'
          autoComplete='name'
          placeholder={tf('name.placeholder')}
          maxLength={LIMITS.name.max}
          aria-required='true'
          aria-invalid={!!errors.name}
          aria-describedby={describedBy('name')}
          className={fieldClasses(errors.name)}
          {...register('name')}
        />
      </FieldShell>

      <FieldShell
        id='company'
        label={tf('company.label')}
        optionalLabel={tf('optional')}
        error={errorText('company')}
      >
        <input
          id='company'
          type='text'
          autoComplete='organization'
          placeholder={tf('company.placeholder')}
          maxLength={LIMITS.company.max}
          aria-invalid={!!errors.company}
          aria-describedby={describedBy('company')}
          className={fieldClasses(errors.company)}
          {...register('company')}
        />
      </FieldShell>

      <div className='grid gap-5 sm:grid-cols-2'>
        <FieldShell
          id='email'
          label={tf('email.label')}
          error={errorText('email')}
        >
          <input
            id='email'
            type='email'
            inputMode='email'
            autoComplete='email'
            autoCapitalize='none'
            spellCheck={false}
            placeholder={tf('email.placeholder')}
            maxLength={LIMITS.email.max}
            aria-required='true'
            aria-invalid={!!errors.email}
            aria-describedby={describedBy('email')}
            className={fieldClasses(errors.email)}
            {...register('email')}
          />
        </FieldShell>

        <FieldShell
          id='phone'
          label={tf('phone.label')}
          optionalLabel={tf('optional')}
          hint={tf('phone.hint')}
          error={errorText('phone')}
        >
          <input
            id='phone'
            type='tel'
            inputMode='tel'
            autoComplete='tel'
            placeholder={tf('phone.placeholder')}
            maxLength={LIMITS.phone.max}
            aria-invalid={!!errors.phone}
            aria-describedby={describedBy('phone', true)}
            className={fieldClasses(errors.phone)}
            {...register('phone')}
          />
        </FieldShell>
      </div>

      <FieldShell
        id='topic'
        label={tf('topic.label')}
        error={errorText('topic')}
      >
        <select
          id='topic'
          aria-required='true'
          aria-invalid={!!errors.topic}
          aria-describedby={describedBy('topic')}
          className={fieldClasses(errors.topic)}
          {...register('topic')}
        >
          <option value='' disabled>
            {tf('topic.placeholder')}
          </option>
          {CONTACT_TOPICS.map((topic) => (
            <option key={topic} value={topic}>
              {tf(`topic.options.${topic}`)}
            </option>
          ))}
        </select>
      </FieldShell>

      <FieldShell
        id='message'
        label={tf('message.label')}
        error={errorText('message')}
        hint={
          <span className='flex justify-end'>
            {tf('message.counter', {
              count: messageLength,
              max: LIMITS.message.max,
            })}
          </span>
        }
      >
        <textarea
          id='message'
          rows={6}
          placeholder={tf('message.placeholder')}
          maxLength={LIMITS.message.max}
          aria-required='true'
          aria-invalid={!!errors.message}
          aria-describedby={describedBy('message', true)}
          className={`${fieldClasses(errors.message)} min-h-[140px] resize-y`}
          {...register('message')}
        />
      </FieldShell>

      <div
        aria-hidden='true'
        className='pointer-events-none absolute -left-[10000px] h-px w-px overflow-hidden opacity-0'
      >
        <label htmlFor='contact-website-hp'>{tf('honeypot')}</label>
        <input
          ref={honeypotRef}
          id='contact-website-hp'
          name='contact-website-hp'
          type='text'
          tabIndex={-1}
          autoComplete='off'
          defaultValue=''
        />
      </div>

      <AltchaWidget
        ref={altchaRef}
        challengeUrl={CHALLENGE_URL}
        language={locale}
      />

      <p className='text-xs text-gray-600'>
        {t.rich('content.contactForm.privacyNotice', {
          linkTag: (chunks) => (
            <UnderlineLink href='/datenschutz'>{chunks}</UnderlineLink>
          ),
        })}
      </p>

      {submitError && (
        <div
          ref={errorRef}
          tabIndex={-1}
          role='alert'
          className='rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-800 outline-none'
        >
          <p className='flex items-center gap-2 font-semibold'>
            <VscWarning className='h-4 w-4 shrink-0' aria-hidden='true' />
            {tf('error.title')}
          </p>
          <p className='mt-1'>{tf(`error.${submitError}`)}</p>
          {submitError !== 'validation_failed' && (
            <div className='mt-3 space-y-1 text-red-900'>
              <p>{tf('error.fallback')}</p>
              <p className='flex items-center gap-2'>
                <VscCallOutgoing className='h-4 w-4' aria-hidden='true' />
                <UnderlineLink
                  href={`tel:${company.phone.replace(/\(0\)/, '').replace(/[^\d+]/g, '')}`}
                >
                  {company.phone}
                </UnderlineLink>
              </p>
              <p className='flex items-center gap-2'>
                <VscMail className='h-4 w-4' aria-hidden='true' />
                <UnderlineLink href={`mailto:${company.email}`}>
                  {company.email}
                </UnderlineLink>
              </p>
            </div>
          )}
        </div>
      )}

      <Button
        type='submit'
        disabled={isSubmitting}
        isLoading={isSubmitting}
        className='w-full'
      >
        {isSubmitting ? tf('submit.progress') : tf('submit.label')}
      </Button>
    </form>
  );
}
