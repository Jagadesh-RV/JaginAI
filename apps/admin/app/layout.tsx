import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Jagin AI Admin',
  description: 'Admin Portal for Enterprise AI Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
