import Link from 'next/link';
import type { ComponentProps } from 'react';
import { classNames } from '../../lib/classNames';

type ButtonVariant = 'primary' | 'outline-light' | 'outline-dark' | 'dark';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonLinkProps extends Omit<ComponentProps<typeof Link>, 'className'> {
  className?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-gold text-brand-black shadow-lg hover:bg-amber-500 hover:shadow-xl',
  'outline-light':
    'border-2 border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-black',
  'outline-dark':
    'border-2 border-gray-300 text-gray-700 hover:border-gray-500 hover:text-gray-950',
  dark: 'bg-brand-black text-white shadow-lg hover:bg-gray-800 hover:shadow-xl',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'px-6 py-2.5 text-sm',
  md: 'px-8 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export default function ButtonLink({
  className,
  size = 'md',
  variant = 'primary',
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={classNames(
        'inline-flex items-center justify-center rounded-full font-bold transition-[color,background-color,border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 active:translate-y-0',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}
