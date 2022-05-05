import '../styles/globals.scss'
import 'normalize.css/normalize.css'
import type {AppProps} from 'next/app'
import Layout from '../layouts/Core/Core'
import {AuthWrapper} from '../context/auth'
import {ConfigWrapper} from '../context/config'

export default function MyApp({Component, pageProps}: AppProps) {
  return (
    <AuthWrapper>
      <ConfigWrapper>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ConfigWrapper>
    </AuthWrapper>
  )
}
