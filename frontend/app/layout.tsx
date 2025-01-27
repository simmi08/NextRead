// app/layout.tsx
import { Metadata } from 'next';
import LandingComponent from '@/components/landingComponent';  // Client component

export const metadata: Metadata = {
  title: 'NextRead',
  description: 'Your Next Read Recommendations',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <LandingComponent>{children}</LandingComponent>
    </html>
  );
}
