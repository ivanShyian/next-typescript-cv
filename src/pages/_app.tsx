import '../styles/globals.scss'
import 'normalize.css/normalize.css'
import type { AppProps } from 'next/app'
import Layout from "../layouts/Core/Core";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
