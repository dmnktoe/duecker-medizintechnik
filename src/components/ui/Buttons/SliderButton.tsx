import { VscArrowLeft, VscArrowRight } from 'react-icons/vsc';

import clsxm from '@/lib/clsxm';

type SliderButtonProps = {
  direction: 'next' | 'prev';
  handleClick: () => void;
  size?: 'sm' | 'md';
};

const SliderButton = ({
  direction,
  handleClick,
  size = 'sm',
}: SliderButtonProps) => {
  return (
    <button
      className={clsxm(
        'inline-flex items-center justify-center',
        'border border-dark text-dark hover:bg-dark hover:text-white',
        size === 'sm' ? 'h-12 w-12' : 'h-12 w-12 md:h-16 md:w-16',
      )}
      onClick={handleClick}
    >
      {direction === 'next' ? (
        <VscArrowRight size={size === 'sm' ? 16 : 24} />
      ) : (
        <VscArrowLeft size={size === 'sm' ? 16 : 24} />
      )}
    </button>
  );
};

export default SliderButton;
