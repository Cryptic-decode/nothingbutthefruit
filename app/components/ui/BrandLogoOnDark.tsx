import Image from 'next/image';
import { classNames } from '@/app/lib/classNames';

interface BrandLogoOnDarkProps {
  className?: string;
  priority?: boolean;
}

export default function BrandLogoOnDark({
  className,
  priority = false,
}: BrandLogoOnDarkProps) {
  return (
    <span
      aria-hidden="true"
      className={classNames(
        'relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-[#fffaf0] p-2 shadow-[0_10px_30px_rgba(28,25,23,0.18)] ring-1 ring-amber-300/80',
        className
      )}
    >
      <Image
        src="/NBTF44.png"
        alt=""
        width={96}
        height={94}
        className="h-full w-full object-contain"
        priority={priority}
      />
    </span>
  );
}
