import { toast } from 'sonner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { getCurrentUser, login, signUp } from '@/features/auth/api';
import type { User, UserLoginPayload } from '@/features/auth/types';

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

const savedFields = (variables: UserLoginPayload) => {
  if (variables.rememberMe) {
    localStorage.setItem('rememberMeEmail', variables.email);
    localStorage.setItem('rememberMePassword', variables.password);
    localStorage.setItem('rememberMe', JSON.stringify(variables.rememberMe));
  } else {
    localStorage.removeItem('rememberMeEmail');
    localStorage.removeItem('rememberMePassword');
    localStorage.removeItem('rememberMe');
  }
};

function useAuth() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: user,
    isFetching: isFetchingUser,
    refetch,
  } = useQuery<User | null, Error>({
    queryKey: ['current-user'],
    queryFn: getCurrentUser,
    enabled: isLoggedIn(),
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: async ({ accessToken }, variables) => {
      saveAccessToken(accessToken);
      savedFields(variables);
      await refetch();
      await navigate({ to: '/', replace: true });
      toast.success('Successfully logged in');
    },
  });

  const signUpMutation = useMutation({
    mutationFn: signUp,
    onSuccess: async () => {
      await navigate({ to: '/login', replace: true });
      toast.success('Successfully signed up');
    },
  });

  const logout = async (message?: string) => {
    removeAccessToken();
    queryClient.setQueryData(['current-user'], null);
    await navigate({ to: '/login' });
    toast.success(message || 'Successfully logged out');
  };

  return {
    user,
    isFetchingUser,
    loginMutation,
    signUpMutation,
    logout,
  };
}

export { isLoggedIn, useAuth, getAccessToken, removeAccessToken, saveAccessToken };
