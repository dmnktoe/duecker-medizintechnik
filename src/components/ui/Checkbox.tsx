import type {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';

interface CheckboxProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  error?: FieldError;
}

export const Checkbox = <T extends FieldValues>({
  id,
  label,
  register,
  error,
}: CheckboxProps<T>) => (
  <div className='py-1'>
    <div className='flex items-center'>
      <input
        type='checkbox'
        id={id}
        className='text-primary-600 focus:ring-primary-500 h-4 w-4 rounded border-gray-300'
        {...register(id)}
      />
      <label htmlFor={id} className='ml-2 block text-sm text-gray-900'>
        {label}
      </label>
    </div>
    {error && <div className='mt-1 text-xs text-red-500'>{error.message}</div>}
  </div>
);
