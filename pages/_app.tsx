import "markdown-css-smartisan";
import type { AppProps } from "next/app";
import "normalize.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
