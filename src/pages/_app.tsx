import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { UniformContext } from "@uniformdev/context-react";
import { UniformAppProps } from "@uniformdev/context-next";
import { createUniformContext } from "../lib/uniform/createUniformContext";
import '../styles/globals.css';
import '../components/uniformComponents';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const clientContext = createUniformContext();

function MyApp({
  Component,
  pageProps,
  serverUniformContext,
}: UniformAppProps) {
  return (
    <UniformContext
      context={serverUniformContext ?? clientContext}
      outputType={"standard"}
    >
      <main className={`${inter.variable} font-sans`}>
        <Component {...pageProps} />
      </main>
    </UniformContext>
  );
}

export default MyApp;
