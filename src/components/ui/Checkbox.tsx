/* eslint-disable @typescript-eslint/no-explicit-any */

interface CheckboxProps {
  id: string;
  label: string;
  register: any;
  error: any;
}

export const Checkbox = ({ id, label, register, error }: CheckboxProps) => {
  return (
    <div className='py-1'>
      <div className='flex items-center'>
        <input
          type='checkbox'
          id={id}
          className='h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500'
          {...register(id)}
        />
        <label htmlFor={id} className='ml-2 block text-sm text-gray-900'>
          {label}
        </label>
      </div>
      {error && (
        <div className='mt-1 text-xs text-red-500'>{error.message}</div>
      )}
    </div>
  );
};
