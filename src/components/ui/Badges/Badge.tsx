import clsx from 'clsx';

type Props = {
  size: 'sm' | 'md' | 'lg';
  color: 'primary' | 'secondary' | 'dark' | 'light';
  variant: 'outline' | 'ghost' | 'solid';
  className?: string;
  children: React.ReactNode;
};

const Badge = ({ size, color, variant, className, children }: Props) => {
  const sizeClasses = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-0.5 text-sm',
    lg: 'px-4 py-1 text-base',
  };

  const colorClasses = {
    primary: 'bg-primary-100 text-primary-700',
    secondary: 'bg-purple-100 text-purple-700',
    dark: 'bg-gray-800 text-white',
    light: 'bg-gray-100 text-gray-800',
  };

  const variantClasses = {
    outline: 'border border-transparent',
    ghost: 'border border-transparent',
    solid: 'border border-transparent',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full font-secondary font-medium',
        sizeClasses[size],
        colorClasses[color],
        variantClasses[variant],
        className,
      )}
    >
      <span className='relative'>{children}</span>
    </span>
  );
};

export default Badge;
