import React from 'react';
import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import {ReduxProvider} from '@/providers/ReduxProvider';
import {ToastContainer} from 'react-toastify';
import AuthGuard from '@/components/guard';
import PrefetchProvider from '@/providers/PrefetchProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Zylux',
  description: 'beyond the ordinary',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <PrefetchProvider>
            <AuthGuard>{children}</AuthGuard>
          </PrefetchProvider>
        </ReduxProvider>

        <ToastContainer
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick={true}
          pauseOnHover={false}
          draggable={false}
          theme='light'
          icon={false}
        />
      </body>
    </html>
  );
}
