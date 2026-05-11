import { isAxiosError } from 'axios';
import { api } from '@/api';
import type { User } from '@/features/auth/types';
import type { UpdateDetailsPayload } from '@/features/settings/components/update-profile-details-form';
import type { UpdatePasswordPayload } from '@/features/settings/components/update-password-form';

export const updateCurrentUser = async (payload: UpdateDetailsPayload) => {
  const { data } = await api.patch<User>('/users/current-user', payload);
  return data;
};

export const updateCurrentUserPassword = async (payload: UpdatePasswordPayload) => {
  try {
    const { data } = await api.patch<{ message: string }>('/users/current-user/password', payload);
    return data;
  } catch (err) {
    if (isAxiosError(err)) {
      if (err.code === 'ERR_BAD_REQUEST' && err.response) {
        if (err.status === 400) {
          throw new Error(err.response?.data.detail);
        }
        if (err.status === 422) {
          throw new Error("Passwords don't match");
        }
      }
    }

    throw err;
  }
};
