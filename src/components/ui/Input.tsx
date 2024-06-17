/* eslint-disable @typescript-eslint/no-explicit-any */

import { useTranslation } from 'next-i18next';

interface InputProps {
  id: string;
  label: string;
  placeholder: string;
  type: string;
  register: any;
  error: any;
}

export const Input = ({
  id,
  label,
  placeholder,
  type,
  register,
  error,
}: InputProps) => {
  const { t } = useTranslation();
  const commonClasses =
    'dark:shadow-sm-light block w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm';
  const errorClasses = error && 'border-red-500';
  const focusClasses =
    'focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500';

  return (
    <div>
      <label
        htmlFor={id}
        className='mb-2 block text-sm font-medium text-gray-900'
      >
        {error ? (
          <span className='text-red-500'>{t(label as never)}*</span>
        ) : (
          <span>{t(label as never)}*</span>
        )}
      </label>
      <input
        type={type}
        id={id}
        className={`${commonClasses} ${errorClasses} ${focusClasses}`}
        placeholder={placeholder}
        {...register(id)}
      />
      {error && (
        <div className='mt-1 text-xs text-red-500'>{t(error.message)}</div>
      )}
    </div>
  );
};
