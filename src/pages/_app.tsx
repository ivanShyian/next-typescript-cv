import '../styles/globals.scss'
import 'normalize.css/normalize.css'
import type {AppProps} from 'next/app'
import Layout from '../layouts/Core/Core'
import {AuthWrapper} from '@/ctx/auth'
import {wrapper} from '@/redux/store'
import Head from 'next/head'

const MyApp = ({Component, pageProps}: AppProps) => {
  return (
    <>
      <Head>
        <title>ivanShyian</title>
        <meta/>
      </Head>
      <AuthWrapper>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthWrapper>
    </>
  )
}

export default wrapper.withRedux(MyApp)
