'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { ReactNode } from 'react';
import { useState } from 'react';

interface Props {
  children: ReactNode;
}

const TanstackProvider = ({ children }: Props) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            // DEFAULT
            staleTime: 60 * 1000

            // REFETCH EVERY 4 SEC
            // staleTime: 4 * 1000,
            // refetchInterval: 4 * 1000
          }
        }
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools buttonPosition="bottom-left" />
      {children}
    </QueryClientProvider>
  );
};

export default TanstackProvider;
