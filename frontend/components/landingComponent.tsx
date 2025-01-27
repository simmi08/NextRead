'use client';

import { ApolloProvider } from '@apollo/client';
import { Geist, Geist_Mono } from 'next/font/google';
import client from '@/lib/apollo-client';
import '../app/globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function LandingComponent({ children }: { children: React.ReactNode }) {
  return (
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <ApolloProvider client={client}>
        {children}
      </ApolloProvider>
    </body>
  );
}
