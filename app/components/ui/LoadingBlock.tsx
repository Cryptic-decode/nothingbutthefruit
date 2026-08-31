import { classNames } from '../../lib/classNames';

interface LoadingBlockProps {
  className?: string;
}

export default function LoadingBlock({ className }: LoadingBlockProps) {
  return (
    <div
      aria-hidden="true"
      className={classNames('animate-pulse rounded-xl bg-stone-200', className)}
    />
  );
}
