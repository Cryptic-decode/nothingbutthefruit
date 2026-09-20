'use client';

import Link from 'next/link';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useActionState, useState } from 'react';
import { useFormStatus } from 'react-dom';
import {
  requestPasswordReset,
  signIn,
  updatePassword,
  type AuthActionState,
} from './actions';

const initialAuthState: AuthActionState = {
  message: '',
  status: 'idle',
};

type AuthMode = 'login' | 'forgot-password' | 'update-password';

const actions = {
  login: signIn,
  'forgot-password': requestPasswordReset,
  'update-password': updatePassword,
};

const buttonLabels: Record<AuthMode, { idle: string; pending: string }> = {
  login: { idle: 'Sign in', pending: 'Signing in…' },
  'forgot-password': { idle: 'Send reset link', pending: 'Sending…' },
  'update-password': { idle: 'Save new password', pending: 'Saving…' },
};

interface PasswordInputProps {
  autoComplete: 'current-password' | 'new-password';
  id: string;
  minLength?: number;
  name: string;
}

function PasswordInput({
  autoComplete,
  id,
  minLength,
  name,
}: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);
  const toggleLabel = isVisible ? 'Hide password' : 'Show password';

  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={isVisible ? 'text' : 'password'}
        autoComplete={autoComplete}
        minLength={minLength}
        required
        className="min-h-12 w-full rounded-xl border border-gray-300 bg-white py-2 pl-4 pr-12 text-gray-950 shadow-sm transition-colors hover:border-gray-400 focus:border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-200"
      />
      <button
        type="button"
        onClick={() => setIsVisible((visible) => !visible)}
        aria-label={toggleLabel}
        aria-pressed={isVisible}
        title={toggleLabel}
        className="absolute inset-y-0 right-0 flex w-12 items-center justify-center rounded-r-xl text-gray-500 transition-colors hover:text-purple-700 focus-visible:text-purple-700"
      >
        {isVisible ? (
          <EyeSlashIcon className="h-5 w-5" aria-hidden="true" />
        ) : (
          <EyeIcon className="h-5 w-5" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}

function SubmitButton({ mode }: { mode: AuthMode }) {
  const { pending } = useFormStatus();
  const label = buttonLabels[mode];

  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-brand-gold px-6 py-3 font-bold text-brand-black shadow-md transition-[background-color,box-shadow,transform] hover:-translate-y-0.5 hover:bg-amber-500 hover:shadow-lg active:translate-y-0 disabled:cursor-wait disabled:opacity-70 disabled:transform-none"
    >
      {pending ? label.pending : label.idle}
    </button>
  );
}

function StatusMessage({ state }: { state: AuthActionState }) {
  if (!state.message) return null;

  return (
    <p
      role={state.status === 'error' ? 'alert' : 'status'}
      className={`rounded-xl border px-4 py-3 text-sm leading-6 ${
        state.status === 'error'
          ? 'border-red-200 bg-red-50 text-red-800'
          : 'border-emerald-200 bg-emerald-50 text-emerald-800'
      }`}
    >
      {state.message}
    </p>
  );
}

export default function AuthForm({ mode }: { mode: AuthMode }) {
  const [state, formAction] = useActionState(actions[mode], initialAuthState);
  const isLogin = mode === 'login';
  const isUpdate = mode === 'update-password';

  return (
    <form action={formAction} className="space-y-5">
      <StatusMessage state={state} />

      {!isUpdate && (
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-900">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="min-h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-gray-950 shadow-sm transition-colors placeholder:text-gray-400 hover:border-gray-400 focus:border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-200"
            placeholder="you@example.com"
          />
        </div>
      )}

      {(isLogin || isUpdate) && (
        <div>
          <div className="mb-2 flex items-center justify-between gap-4">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-900">
              {isUpdate ? 'New password' : 'Password'}
            </label>
            {isLogin && (
              <Link href="/auth/forgot-password" className="text-sm font-semibold text-purple-700 hover:text-purple-900">
                Set or reset password
              </Link>
            )}
          </div>
          <PasswordInput
            id="password"
            name="password"
            autoComplete={isUpdate ? 'new-password' : 'current-password'}
            minLength={isUpdate ? 8 : undefined}
          />
          {isUpdate && <p className="mt-2 text-sm text-gray-500">Use at least 8 characters.</p>}
        </div>
      )}

      {isUpdate && (
        <div>
          <label htmlFor="confirmation" className="mb-2 block text-sm font-semibold text-gray-900">
            Confirm new password
          </label>
          <PasswordInput
            id="confirmation"
            name="confirmation"
            autoComplete="new-password"
            minLength={8}
          />
        </div>
      )}

      <SubmitButton mode={mode} />

      {!isLogin && (
        <p className="text-center text-sm text-gray-600">
          <Link href="/admin" className="font-semibold text-purple-700 hover:text-purple-900">
            Back to sign in
          </Link>
        </p>
      )}
    </form>
  );
}
