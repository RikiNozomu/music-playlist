"use client";

import { useEffect, useState } from "react";
import { NextUIProviders } from "./nextui";
import { ReduxProviders } from "./redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function Providers({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  const queryClient = new QueryClient()

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {isClient ? (
        <ReduxProviders>
          <NextUIProviders>{children}</NextUIProviders>
        </ReduxProviders>
      ) : (
        <>{children}</>
      )}
    </QueryClientProvider>
  );
}
