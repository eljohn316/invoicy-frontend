import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { login } from '@/features/auth/api';

export function useLogin() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    onSuccess: async ({ accessToken }) => {
      localStorage.setItem('accessToken', accessToken);
      await navigate({ to: '/', replace: true });
      toast.success('Successfully logged in');
    },
  });
}
