import React from 'react';
import '../styles/reset.scss';
import '../styles/globals.scss';
import type { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
