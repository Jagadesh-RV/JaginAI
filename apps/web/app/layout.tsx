import type { Metadata } from 'next';
import './globals.css';

import { ThemeProvider } from '@jagin/ui';

export const metadata: Metadata = {
  title: 'Jagin AI',
  description: 'Enterprise AI Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
