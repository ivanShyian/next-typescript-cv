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
import {setAbout, setConfig, setEducation, setWork, setProjects} from '@/redux/actions'
import {wrapper} from '@/redux/store'
import {ConfigInterface} from '@/models/Config'


interface Props {
  config: ConfigInterface
  authCookie: any
}

const Home: FC<Props> = ({authCookie}: Props) => {
  const {autoLogin} = useAuthContext()

  useEffect(() => {
    autoLogin(authCookie)
  }, [autoLogin, authCookie])

  return (
    <Fragment>
      <IndexCutaway />
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
  const config = await api.getConfig()
  const about = await api.getAbout()
  const education = await api.getEducation()
  const work = await api.getWork()
  const projects = await api.getProjectList()
  if (config) store.dispatch(setConfig(config))
  if (about) store.dispatch(setAbout(about))
  if (education) store.dispatch(setEducation(education))
  if (work) store.dispatch(setWork(work))
  if (projects) store.dispatch(setProjects(projects))
  const authCookie = getCookie('auth', {req, res})
  return {
    props: {
      authCookie: authCookie ? JSON.parse(authCookie as string) : {}
    }
  }
})

export default Home
