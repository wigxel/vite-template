import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const query_client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: true,
      retry: 2,
    },
  },
});

export function QueryProvider(props: { children?: React.ReactNode }) {
  return (
    <QueryClientProvider client={query_client}>
      {props.children}
    </QueryClientProvider>
  );
}
