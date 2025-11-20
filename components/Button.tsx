'use client';

import { twMerge } from 'tailwind-merge';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  children: React.ReactNode;
};

export const Button = ({ className, children, ...resrProps }: ButtonProps) => {
  return (
    <button
      className={twMerge(
        'bg-blue-500 w-max text-white font-semibold px-3 text-[15px] py-[10px] rounded-lg cursor-pointer tracking-[.005em] hover:bg-blue-800 transition-all ease-in duration-150',
        className
      )}
      {...resrProps}
    >
      {children}
    </button>
  );
};
