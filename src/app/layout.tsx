"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Hammersmith_One } from "@next/font/google";

import Header from "./components/Header/Header";
import "./globals.scss";

const queryClient = new QueryClient({
  defaultOptions: { queries: { cacheTime: Infinity, staleTime: 100000 } },
});

const hammer = Hammersmith_One({ subsets: ["latin"], weight: "400" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <head />
        <body className={hammer.className}>
          <Header />
          {children}
        </body>
      </html>
    </QueryClientProvider>
  );
}
