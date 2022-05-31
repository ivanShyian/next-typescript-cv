import {NextPage} from 'next'
import './SharedLogo.scss'
import {useRouter} from 'next/router'
import {useScroll} from '@/use/useScroll'

export const SharedLogo: NextPage = () => {
  const router = useRouter()
  const [scrollTo] = useScroll()

  const handleLogoClick = () => {
    if (router.route !== '/') {
      return router.push('/')
    }
    scrollTo('section.index__cutaway')
  }

  return (
    <p className="logo" onClick={handleLogoClick}>
      <span>IS</span>
      <span>.</span>
    </p>
  )
}
