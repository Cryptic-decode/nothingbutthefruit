import type { ReactNode } from 'react';
import { classNames } from '../../lib/classNames';

interface SectionHeadingProps {
  className?: string;
  description?: ReactNode;
  eyebrow?: string;
  title: ReactNode;
}

export default function SectionHeading({
  className,
  description,
  eyebrow,
  title,
}: SectionHeadingProps) {
  return (
    <div className={classNames('mx-auto max-w-2xl text-center', className)}>
      {eyebrow && (
        <div className="mb-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-purple-700">
          <span className="h-px w-6 bg-purple-300" aria-hidden="true" />
          {eyebrow}
          <span className="h-px w-6 bg-purple-300" aria-hidden="true" />
        </div>
      )}
      <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg leading-relaxed text-gray-500">
          {description}
        </p>
      )}
    </div>
  );
}
