import { getSession } from '@/server-functions/session';

import { useQuery } from '@tanstack/react-query';

export const useSession = () =>
  useQuery({
    queryKey: ['session'],
    queryFn: () => getSession(),
  });
