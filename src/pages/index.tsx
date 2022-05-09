import {FC, Fragment, useEffect} from 'react'

import IndexCutaway from '@/components/Index/IndexCutaway'
import IndexAbout from '@/components/Index/IndexAbout'
import IndexEducation from '@/components/Index/IndexEducation'
import IndexWork from '@/components/Index/IndexWork'
import IndexProjects from '@/components/Index/IndexProjects'
import IndexContactMe from '@/components/Index/IndexContactMe'
import Api from '@/api/Api'
import {useAuthContext} from '@/ctx/auth'
import {getCookie} from 'cookies-next'
import {setAbout, setConfig, setEducation} from '@/redux/actions'
import {wrapper} from '@/redux/store'


interface Props {
  config: any
  authCookie: any
}

const Home: FC<Props> = ({authCookie}: Props) => {
  const {autoLogin} = useAuthContext()

  useEffect(() => {
    autoLogin(authCookie)
  }, [autoLogin, authCookie])

  return (
    <Fragment>
      <IndexCutaway/>
      <IndexAbout />
      <IndexEducation />
      <IndexWork />
      <IndexProjects />
      <IndexContactMe />
    </Fragment>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async({req, res}: {req: any, res: any}) => {
  const api = new Api()
  const {config} = await api.getConfig()
  const {about} = await api.getAbout()
  const {education} = await api.getEducation()
  store.dispatch(setConfig(config))
  store.dispatch(setAbout(about))
  store.dispatch(setEducation(education))
  const authCookie = getCookie('auth', {req, res})
  return {
    props: {
      authCookie: authCookie ? JSON.parse(authCookie as string) : {}
    }
  }
})

export default Home
