import '../styles/globals.scss'
import 'normalize.css/normalize.css'
import type {AppProps} from 'next/app'
import Layout from '../layouts/Core/Core'
import {AuthWrapper} from '@/ctx/auth'
import {wrapper} from '@/redux/store'
import TheSeo from '@/components/TheSeo'
const MyApp = ({Component, pageProps, url}: AppProps & {url: string}) => {
  return (
    <>
      <TheSeo url={url} />
      <AuthWrapper>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthWrapper>
    </>
  )
}

MyApp.getInitialProps = ({ctx}: any) => {
  return {
    url: ctx.req.headers.host
  }
}

export default wrapper.withRedux(MyApp)
