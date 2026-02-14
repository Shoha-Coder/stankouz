'use client';

import { useMutation } from '@tanstack/react-query';
import { loginSchema, LoginInput } from './schemas';
import { api } from '@/shared/lib/api/api-client';

type LoginResponse = {
  token: string;
};

export function useLogin() {
  return useMutation({
    mutationFn: async (input: LoginInput) => {
      const payload = loginSchema.parse(input);
      return api.post<LoginResponse>('/auth/login', payload);
    },
  });
}
