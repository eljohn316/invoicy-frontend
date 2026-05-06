import { isAxiosError } from 'axios';
import { api } from '@/api';
import { type LoginFormPayload } from '@/features/auth/components/login-form';

type LoginResponse = {
  accessToken: string;
  tokenType: string;
};

export const login = async ({ email, password }: Omit<LoginFormPayload, 'rememberMe'>) => {
  try {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);

    const response = await api.post<LoginResponse>('/users/token', formData);
    return response.data;
  } catch (err) {
    if (isAxiosError(err)) {
      if (err.code === 'ERR_BAD_REQUEST') {
        throw new Error(err.response?.data.detail);
      }
    }
    throw err;
  }
};
