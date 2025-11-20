'use client';

import { twMerge } from 'tailwind-merge';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  isInvalid?: boolean | undefined;
  register?: () => {};
  className?: string;
};

export default function Input({
  isInvalid,
  register,
  className,
  ...restProps
}: InputProps) {
  return (
    <input
      className={twMerge(
        'box-border pl-3 flex flex-row items-center h-[46px] border shadow-[0px_1px_2px_rgba(0,0,0,0.05)] self-stretch text-black grow-0 rounded-lg bg-white border-solid focus:border-blue-500 focus:outline-none focus:ring-0 focus:shadow-[0_0_0_4px_rgba(59,130,246,0.25)] placeholder:pl-2  placeholder:text-sm lg:placeholder:pl-3 placeholder:font-medium placeholder:text-blue-300',
        className,
        isInvalid &&
          ' focus:border-red-500 focus:shadow-[0_0_0_4px_rgba(239,68,68,0.25)]'
      )}
      {...(register ? register() : {})}
      {...restProps}
    />
  );
}
