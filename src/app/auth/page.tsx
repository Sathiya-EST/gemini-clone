'use client';

import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { LoginForm } from '../../components/auth/LoginForm';
import { OTPForm } from '../../components/auth/OTPForm';
import { Card, CardContent } from '../../components/ui/card';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [step, setStep] = useState<'login' | 'otp'>('login');
  const { isAuthenticated } = useAuth(false);
  const router = useRouter();

  const handleOTPSent = () => {
    setStep('otp');
  };

  const handleAuthSuccess = () => {
    router.push('/dashboard');
  };

  const handleBack = () => {
    setStep('login');
  };

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          {step === 'login' ? (
            <LoginForm onOTPSent={handleOTPSent} />
          ) : (
            <OTPForm onSuccess={handleAuthSuccess} onBack={handleBack} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}