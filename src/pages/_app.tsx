import '../styles/globals.scss'
import 'normalize.css/normalize.css'
import type {AppProps} from 'next/app'
import Layout from '../layouts/Core/Core'
import {AuthWrapper} from '@/ctx/auth'
import {wrapper} from '@/redux/store'

const MyApp = ({Component, pageProps}: AppProps) => {
  return (
    <AuthWrapper>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthWrapper>
  )
}

export default wrapper.withRedux(MyApp)