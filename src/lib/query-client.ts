import { removeAccessToken } from '@/features/auth/hooks/use-auth';
import { QueryCache, QueryClient, MutationCache } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

function handleApiError(error: Error) {
  if (isAxiosError(error) && error.response && [401, 403].includes(error.response.status)) {
    removeAccessToken();
    window.location.replace('/login?sessionExpired=true');
  }
}

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: handleApiError,
  }),
  mutationCache: new MutationCache({
    onError: handleApiError,
  }),
});

export { queryClient };
