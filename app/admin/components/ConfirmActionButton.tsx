'use client';

import { useId, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { classNames } from '@/app/lib/classNames';

interface ConfirmActionButtonProps {
  action: () => Promise<void>;
  confirmLabel: string;
  description: string;
  pendingLabel?: string;
  title: string;
  triggerClassName?: string;
  triggerLabel: string;
  tone?: 'default' | 'danger';
}

function ConfirmButton({
  label,
  pendingLabel,
  tone,
}: {
  label: string;
  pendingLabel: string;
  tone: 'default' | 'danger';
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={classNames(
        'inline-flex min-h-11 items-center justify-center rounded-full px-5 py-2.5 text-sm font-bold text-white transition-colors disabled:cursor-wait disabled:opacity-70',
        tone === 'danger'
          ? 'bg-red-700 hover:bg-red-800'
          : 'bg-deep-purple hover:bg-purple-900'
      )}
    >
      {pending ? pendingLabel : label}
    </button>
  );
}

export default function ConfirmActionButton({
  action,
  confirmLabel,
  description,
  pendingLabel = 'Please wait…',
  title,
  triggerClassName,
  triggerLabel,
  tone = 'default',
}: ConfirmActionButtonProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  function closeDialog() {
    dialogRef.current?.close();
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className={triggerClassName}
      >
        {triggerLabel}
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        onClose={() => triggerRef.current?.focus()}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDialog();
        }}
        className="m-auto w-[calc(100%-2rem)] max-w-md rounded-3xl border border-stone-200 bg-white p-0 text-gray-950 shadow-2xl backdrop:bg-black/55 backdrop:backdrop-blur-sm"
      >
        <form action={action} className="p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-700">
            Please confirm
          </p>
          <h2 id={titleId} className="mt-3 font-playfair text-3xl font-semibold">
            {title}
          </h2>
          <p id={descriptionId} className="mt-3 leading-7 text-gray-600">
            {description}
          </p>
          <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={closeDialog}
              className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-gray-300 px-5 py-2.5 text-sm font-bold text-gray-800 transition-colors hover:border-gray-500"
            >
              Cancel
            </button>
            <ConfirmButton label={confirmLabel} pendingLabel={pendingLabel} tone={tone} />
          </div>
        </form>
      </dialog>
    </>
  );
}
