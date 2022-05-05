import {FC, Fragment} from 'react'
import {getCookie} from 'cookies-next'
import Head from 'next/head'
import LoginComponent from '@/components/Login'


interface CustomHeader {
  headers: {
    cookie: string | null
  }
}

const Login: FC<{authCookie: any}> = ({authCookie}) => {
  return (
    <Fragment>
      <Head>
        <title>Admin login</title>
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
