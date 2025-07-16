'use client';

import { SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { phoneSchema } from '../../lib/validations';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { CountrySelector } from './CountrySelector';
import { useAuthStore } from '../../store/authStore';
import { toast } from 'react-hot-toast';

interface LoginFormProps {
  onOTPSent: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onOTPSent }) => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const { login, isLoading } = useAuthStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(phoneSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      await login(data.phone, data.countryCode);
      toast.success('OTP sent successfully!');
      onOTPSent();
    } catch (error) {
      toast.error('Failed to send OTP. Please try again.');
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Welcome to Gemini</h1>
        <p className="text-gray-600">Enter your phone number to continue</p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <CountrySelector
            value={selectedCountry}
            onChange={(value: any) => {
              setSelectedCountry(value);
              setValue('countryCode', value);
            }}
          />
          {errors.countryCode && (
            <p className="text-red-500 text-sm mt-1">{errors.countryCode.message}</p>
          )}
        </div>
        
        <div>
          <Input
            type="tel"
            placeholder="Phone number"
            {...register('phone')}
            className={errors.phone ? 'border-red-500' : ''}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>
        
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send OTP'}
        </Button>
      </form>
    </div>
  );
};