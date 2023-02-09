"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Header from "./components/Header/Header";
import "./globals.scss";

const queryClient = new QueryClient({
  defaultOptions: { queries: { cacheTime: Infinity, staleTime: 100000 } },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
        <head />
        <body>
          <Header />
          {children}
        </body>
      </html>
    </QueryClientProvider>
  );
}
