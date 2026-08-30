import type { ReactNode } from 'react';
import { classNames } from '../../lib/classNames';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={classNames(
        'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8',
        className
      )}
    >
      {children}
    </div>
  );
}
