import {FC, Fragment} from 'react'
import {getCookie} from 'cookies-next'
import Head from 'next/head'
import LoginComponent from '@/components/Login'
import useTranslation from 'next-translate/useTranslation'

const Login: FC<{authCookie: any}> = ({authCookie}) => {
  const {t} = useTranslation('login')

  return (
    <Fragment>
      <Head>
        <title>{t('adminHeadTitle')}</title>
      </Head>
      <LoginComponent authCookie={authCookie}/>
    </Fragment>
  )
}

export default Login

export const getServerSideProps = ({req, res}: {req: any, res: any}) => {
  const authCookie = getCookie('auth', {req, res})
  return {
    props: {authCookie: authCookie ? JSON.parse(authCookie as string) : {}}
  }
}
