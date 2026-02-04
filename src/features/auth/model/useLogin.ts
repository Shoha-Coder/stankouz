'use client';

import { useMutation } from '@tanstack/react-query';
import { loginSchema, LoginInput } from './schemas';
import { http } from '@/shared/lib/api/http';

type LoginResponse = {
  token: string;
};

export function useLogin() {
  return useMutation({
    mutationFn: async (input: LoginInput) => {
      const payload = loginSchema.parse(input);
      return http<LoginResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    },
  });
}
