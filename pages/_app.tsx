import { AppProps } from "next/app";
import Head from "next/head";

import '../styles/globals.css';

function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title>MyTop</title>
        <meta name="description" content="Топ лучших IT и дизайн курсов" />
        <link rel="icon" href="/favicon.svg" />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_DOMAIN}${router.asPath}`} />
        <meta property="og:locale" content="ru" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
