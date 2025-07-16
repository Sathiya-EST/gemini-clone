import { z } from 'zod';

export const phoneSchema = z.object({
  countryCode: z.string().min(1, 'Country code is required'),
  phone: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^\d+$/, 'Phone number must contain only digits'),
});

export const otpSchema = z.object({
  otp: z.string()
    .length(6, 'OTP must be 6 digits')
    .regex(/^\d+$/, 'OTP must contain only digits'),
});

export const chatroomSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(50, 'Title must be less than 50 characters'),
});

export const messageSchema = z.object({
  content: z.string().min(1, 'Message cannot be empty'),
  image: z.string().optional(),
});