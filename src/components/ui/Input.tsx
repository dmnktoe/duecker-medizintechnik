import type { FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface InputProps<T extends FieldValues> {
  autocomplete: string;
  error?: FieldError;
  id: Path<T>;
  label: string;
  placeholder: string;
  register: UseFormRegister<T>;
  type: string;
}

export const Input = <T extends FieldValues>({
  autocomplete,
  error,
  id,
  label,
  placeholder,
  register,
  type,
}: InputProps<T>) => {
  const baseClasses =
    'dark:shadow-sm-light block w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:ring-primary-500';

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
        className={`${baseClasses}${error ? ' border-red-500' : ''}`}
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
