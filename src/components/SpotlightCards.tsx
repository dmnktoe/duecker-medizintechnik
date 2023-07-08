import { MouseEvent } from 'react';

export function SpotlightCards() {
  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    for (const card of Array.from(
      e.currentTarget.children as HTMLCollectionOf<HTMLElement>
    )) {
      const rect = card.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;

      card.style.setProperty('--cursor-x', `${x}px`);
      card.style.setProperty('--cursor-y', `${y}px`);
    }
  };

  return (
    <div
      className='group flex w-full max-w-6xl flex-wrap items-center justify-center gap-2 p-20'
      onMouseMove={onMouseMove}
    >
      {[...Array(6)].map((_, x) => (
        <div
          key={x}
          className="before:bg-spotlight-hover after:bg-spotlight-borders relative flex h-64 w-72 cursor-pointer flex-col rounded-xl bg-white/10 before:absolute before:inset-0 before:z-30 before:rounded-xl before:opacity-0 before:transition-opacity before:duration-[400ms] before:content-[''] after:absolute after:inset-0 after:z-10 after:h-full after:w-full after:rounded-xl after:opacity-0 after:transition-opacity after:duration-[400ms] after:content-[''] hover:before:opacity-100 group-hover:after:opacity-100"
        >
          <div className='absolute inset-px z-20 flex flex-grow flex-col items-center justify-center rounded-xl bg-neutral-900 p-4 text-white'>
            box {x + 1}
          </div>
        </div>
      ))}
    </div>
  );
}
