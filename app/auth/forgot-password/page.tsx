import type { Metadata } from 'next';
import AuthCard from '../AuthCard';
import AuthForm from '../AuthForm';

export const metadata: Metadata = {
  title: 'Reset dashboard password',
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return (
    <AuthCard
      title="Reset your password"
      description="Enter your dashboard email and we’ll send you a secure reset link."
    >
      <AuthForm mode="forgot-password" />
    </AuthCard>
  );
}
