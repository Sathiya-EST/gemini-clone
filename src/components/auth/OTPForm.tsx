"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpSchema } from "../../lib/validations";
import { useAuthStore } from "../../store/authStore";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "react-hot-toast";

interface OTPFormProps {
  onSuccess: () => void;
  onBack: () => void;
}

export const OTPForm: React.FC<OTPFormProps> = ({ onSuccess, onBack }) => {
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const { verifyOTP, isLoading } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(otpSchema),
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const onSubmit = async (data: { otp: string }) => {
    try {
      const success = await verifyOTP(data.otp);
      if (success) {
        toast.success("Login successful!");
        onSuccess();
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      toast.error("Verification failed. Please try again.");
      console.error(error);
    }
  };

  const handleResend = async () => {
    setCountdown(60);
    setCanResend(false);
    toast.success("OTP resent successfully!");
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Enter OTP</h1>
        <p className="text-gray-500">We&#39;ve sent a 6-digit code to your phone number</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input
            type="text"
            placeholder="Enter 6-digit OTP"
            maxLength={6}
            {...register("otp")}
            className={`text-center text-lg tracking-wider ${
              errors.otp ? "border-red-500" : ""
            }`}
            autoFocus
          />
          {errors.otp && (
            <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Verifying..." : "Verify OTP"}
        </Button>
      </form>

      <div className="text-center">
        {canResend ? (
          <Button
            variant="link"
            onClick={handleResend}
            className="text-blue-500"
          >
            Resend OTP
          </Button>
        ) : (
          <p className="text-gray-500 text-sm">Resend OTP in {countdown}s</p>
        )}
      </div>

      <div className="text-center">
        <Button variant="link" onClick={onBack} className="text-gray-500">
          Back to phone number
        </Button>
      </div>
    </div>
  );
};
