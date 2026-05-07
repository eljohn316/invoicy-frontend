import { api } from '@/api';
import type { User, UserLoginPayload, UserLoginResponse } from '@/features/auth/types';
import type { SignUpPayload } from '@/features/auth/components/sign-up-form';
import { isAxiosError } from 'axios';

export const login = async ({ email, password }: UserLoginPayload) => {
  try {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);

    const { data } = await api.post<UserLoginResponse>('/users/token', formData);
    return data;
  } catch (err) {
    if (isAxiosError(err)) {
      if (err.code === 'ERR_BAD_REQUEST') {
        throw new Error(err.response?.data.detail);
      }
    }
    throw err;
  }
};

export const signUp = async (payload: Omit<SignUpPayload, 'confirmPassword'>) => {
  const { data } = await api.post<Omit<User, 'email'>>('/users', payload);
  return data;
};

export const getCurrentUser = async () => {
  const { data } = await api.get<User>('/users/current-user');
  return data;
};
