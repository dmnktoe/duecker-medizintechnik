/* eslint-disable @typescript-eslint/no-explicit-any */

interface InputProps {
  autocomplete: string;
  error: any;
  id: string;
  label: string;
  placeholder: string;
  register: any;
  type: string;
}

export const Input = ({
  autocomplete,
  error,
  id,
  label,
  placeholder,
  register,
  type,
}: InputProps) => {
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
          <span className='text-red-500'>{label}*</span>
        ) : (
          <span>{label}*</span>
        )}
      </label>
      <input
        type={type}
        id={id}
        className={`${commonClasses} ${errorClasses} ${focusClasses}`}
        placeholder={placeholder}
        autoComplete={autocomplete}
        {...register(id)}
      />
      {error && (
        <div className='mt-1 text-xs text-red-500'>{error.message}</div>
      )}
    </div>
  );
};
