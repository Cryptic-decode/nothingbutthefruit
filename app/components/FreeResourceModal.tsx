'use client';

import Image from 'next/image';
import { GiftIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useId, useRef, useState } from 'react';
import type { FormEvent } from 'react';

interface FreeResourceModalProps {
  className?: string;
  showLabel?: boolean;
}

type SubmissionState = 'idle' | 'submitting' | 'success';

function startDownload(url: string) {
  const link = document.createElement('a');
  link.href = url;
  link.download = '7-Day Fruit Check.pdf';
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export default function FreeResourceModal({
  className = '',
  showLabel = false,
}: FreeResourceModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');
  const [message, setMessage] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('/resources/7-day-fruit-check.pdf');

  function openDialog() {
    dialogRef.current?.showModal();
    window.requestAnimationFrame(() => nameRef.current?.focus());
  }

  function closeDialog() {
    dialogRef.current?.close();
  }

  function resetDialog() {
    triggerRef.current?.focus();
    formRef.current?.reset();
    setSubmissionState('idle');
    setMessage('');
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmissionState('submitting');
    setMessage('');

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch('/api/free-resource', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.get('fullName'),
          email: formData.get('email'),
          website: formData.get('website'),
        }),
      });
      const result = (await response.json()) as {
        downloadUrl?: string;
        error?: string;
      };

      if (!response.ok || !result.downloadUrl) {
        throw new Error(result.error || 'We could not prepare the download.');
      }

      setDownloadUrl(result.downloadUrl);
      setSubmissionState('success');
      startDownload(result.downloadUrl);
    } catch (error) {
      setSubmissionState('idle');
      setMessage(
        error instanceof Error
          ? error.message
          : 'We could not prepare the download. Please try again.'
      );
    }
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={openDialog}
        aria-label="Get the free 7-Day Fruit Check"
        title="Get the free 7-Day Fruit Check"
        className={`group inline-flex h-11 shrink-0 items-center justify-center rounded-full border border-purple-200 bg-purple-50 text-purple-800 shadow-sm transition-[background-color,border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-purple-300 hover:bg-purple-100 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-700 focus-visible:ring-offset-2 ${showLabel ? 'gap-2 px-4' : 'w-11'} ${className}`}
      >
        <GiftIcon aria-hidden="true" className="h-6 w-6 transition-transform group-hover:scale-105" />
        {showLabel && (
          <span aria-hidden="true" className="text-sm font-bold whitespace-nowrap">
            Free guide
          </span>
        )}
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        onClose={resetDialog}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDialog();
        }}
        className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto rounded-3xl border border-stone-200 bg-white p-0 text-gray-950 shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm"
      >
        <div className="relative grid sm:grid-cols-[15rem_minmax(0,1fr)]">
          <button
            type="button"
            onClick={closeDialog}
            className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 shadow-md transition-colors hover:bg-stone-100 hover:text-gray-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-700"
          >
            <span className="sr-only">Close free resource dialog</span>
            <XMarkIcon aria-hidden="true" className="h-5 w-5" />
          </button>

          <div className="hidden bg-purple-950 p-5 sm:flex sm:items-center">
            <div className="relative aspect-[612/792] w-full overflow-hidden rounded-xl bg-white shadow-2xl">
              <Image
                src="/resources/7-day-fruit-check-cover.png"
                alt="Cover of the 7-Day Fruit Check"
                fill
                sizes="240px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="p-6 sm:p-8 sm:pr-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-700">
              A free resource from Pastor Dee
            </p>
            <h2 id={titleId} className="mt-3 max-w-md font-playfair text-3xl font-semibold leading-tight sm:text-4xl">
              Start your 7-Day Fruit Check
            </h2>
            <p id={descriptionId} className="mt-3 max-w-lg text-sm leading-6 text-gray-600">
              Examine what is shaping your heart, words, relationships, reactions, and habits through seven days of Scripture and guided reflection.
            </p>

            {submissionState === 'success' ? (
              <div className="mt-7 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                <p className="font-bold text-emerald-950">Your guide is ready.</p>
                <p className="mt-2 text-sm leading-6 text-emerald-900">
                  The download should begin automatically. You can also download it again below.
                </p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={downloadUrl}
                    download="7-Day Fruit Check.pdf"
                    className="inline-flex min-h-11 items-center justify-center rounded-full bg-brand-gold px-5 py-2.5 text-sm font-bold text-brand-black shadow-md hover:bg-amber-500"
                  >
                    Download again
                  </a>
                  <button
                    type="button"
                    onClick={closeDialog}
                    className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-stone-300 px-5 py-2.5 text-sm font-bold text-gray-700 hover:border-purple-700 hover:text-purple-800"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="mt-7 space-y-4">
                {message && (
                  <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-800">
                    {message}
                  </p>
                )}

                <div>
                  <label htmlFor={`${titleId}-name`} className="mb-2 block text-sm font-bold text-gray-900">
                    Your name
                  </label>
                  <input
                    ref={nameRef}
                    id={`${titleId}-name`}
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    minLength={2}
                    maxLength={100}
                    required
                    className="min-h-12 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-gray-950 shadow-sm placeholder:text-gray-400 hover:border-stone-400 focus:border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-200"
                  />
                </div>

                <div>
                  <label htmlFor={`${titleId}-email`} className="mb-2 block text-sm font-bold text-gray-900">
                    Email address
                  </label>
                  <input
                    id={`${titleId}-email`}
                    name="email"
                    type="email"
                    autoComplete="email"
                    maxLength={254}
                    required
                    className="min-h-12 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-gray-950 shadow-sm placeholder:text-gray-400 hover:border-stone-400 focus:border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-200"
                  />
                </div>

                <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                  <label htmlFor={`${titleId}-website`}>Website</label>
                  <input id={`${titleId}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                <button
                  type="submit"
                  disabled={submissionState === 'submitting'}
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-brand-gold px-6 py-3 font-bold text-brand-black shadow-md transition-[background-color,box-shadow,transform] hover:-translate-y-0.5 hover:bg-amber-500 hover:shadow-lg disabled:cursor-wait disabled:opacity-70 disabled:transform-none"
                >
                  {submissionState === 'submitting' ? 'Preparing your guide…' : 'Get the free guide'}
                </button>
                <p className="text-xs leading-5 text-gray-500">
                  We use these details only to provide and record this free resource. No additional commitment.
                </p>
              </form>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}
