import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';
import { FiMail } from 'react-icons/fi';
import { z } from 'zod';

import Button from '@/components/ui/buttons/Button';

const formSchema = z.object({
  nameSurname: z.string().min(1, { message: 'Full name is required' }),
  email: z.string().min(1, { message: 'Email is required' }).email({
    message: 'Must be a valid email',
  }),
  phone: z
    .string()
    .min(1, { message: 'Phone is required' })
    .regex(/^(\+?1)?[2-9]\d{2}[2-9](?!11)\d{6}$/, {
      message: 'Must be a valid phone number',
    }),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters' })
    .max(1000, { message: 'Message must be less than 1000 characters' }),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactForm() {
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
    // You can set default values for the form here for testing purposes
    // defaultValues: {
    //   nameSurname: "John Doe",
    //   email: "john@joe.com",
    //   phone: "5555555555",
    //   message:
    //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod",
    // },
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
    <form
      className='w-full space-y-4'
      onSubmit={handleSubmit(processForm)}
      noValidate
    >
      <div className='mb-4'>
        <div className='relative'>
          {errors.email?.message ? (
            <FiMail className='absolute left-2 top-1/2 h-6 w-6 -translate-y-1/2 border-r pr-2 text-red-500' />
          ) : (
            <FiMail className='absolute left-2 top-1/2 h-6 w-6 -translate-y-1/2 border-r pr-2' />
          )}
          <input
            className={`w-full appearance-none rounded border py-2 pl-10 leading-tight text-gray-700 shadow  outline-none duration-300
          ${errors.email?.message && 'shadow-[0_0_0_2px] shadow-red-500'}
          `}
            type='email'
            placeholder='Email'
            {...register('email')}
          />
        </div>
        {errors.email?.message && (
          <div className='mt-1 text-xs text-red-500'>
            {errors.email?.message}
          </div>
        )}
      </div>
      <div>
        <label
          htmlFor='email'
          className='mb-2 block text-sm font-medium text-gray-900'
        >
          Your email
        </label>
        <input
          type='email'
          id='email'
          className='dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500'
          placeholder='name@flowbite.com'
          required
        />
      </div>
      <div>
        <label
          htmlFor='subject'
          className='mb-2 block text-sm font-medium text-gray-900'
        >
          Subject
        </label>
        <input
          type='text'
          id='subject'
          className='dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500'
          placeholder='Let us know how we can help you'
          required
        />
      </div>
      <div className='sm:col-span-2'>
        <label
          htmlFor='message'
          className='mb-2 block text-sm font-medium text-gray-900'
        >
          Your message
        </label>
        <textarea
          id='message'
          className='block h-24 w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500'
          placeholder='Leave a comment...'
        ></textarea>
      </div>
      <Button type='submit' className='w-full'>
        Submit
      </Button>
    </form>
  );
}
