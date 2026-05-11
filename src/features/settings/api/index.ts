import { api } from '@/api';
import type { User } from '@/features/auth/types';
import type { UpdateDetailsPayload } from '@/features/settings/components/update-profile-details-form';

export const updateCurrentUser = async (payload: UpdateDetailsPayload) => {
  const { data } = await api.patch<User>('/users/current-user', payload);
  return data;
};
