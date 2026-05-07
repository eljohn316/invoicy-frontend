import { toast } from 'sonner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { getCurrentUser, login } from '@/features/auth/api';
import type { User } from '@/features/auth/types';

const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

const saveAccessToken = (accessToken: string) => {
  localStorage.setItem('accessToken', accessToken);
};

const removeAccessToken = () => {
  localStorage.removeItem('accessToken');
};

const isLoggedIn = () => {
  const accessToken = getAccessToken();
  return accessToken !== null;
};

function useAuth() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: user, refetch } = useQuery<User | null, Error>({
    queryKey: ['current-user'],
    queryFn: getCurrentUser,
    enabled: isLoggedIn(),
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: async ({ accessToken }) => {
      saveAccessToken(accessToken);
      await refetch();
      await navigate({ to: '/', replace: true });
      toast.success('Successfully logged in');
    },
  });

  const logout = async () => {
    removeAccessToken();
    queryClient.setQueryData(['current-user'], null);
    await navigate({ to: '/login' });
    toast.success('Successfully logged out');
  };

  return {
    user,
    loginMutation,
    logout,
  };
}

export { isLoggedIn, useAuth, getAccessToken, removeAccessToken, saveAccessToken };
