import {NextPage} from 'next'
import './SharedLang.scss'
import {useRouter} from 'next/router'

export const SharedLang: NextPage = () => {
  const router = useRouter()

  const changeLocale = (e: any) => {
    const lang = router.locale === 'en' ? 'uk' : 'en'
    return router.push('/',  '/', {locale: lang})
  }

  return (
    <div className="shared-lang switch-button">
      <input id="switch-lang" checked={router.locale === 'uk'} className="switch-button-checkbox" type="checkbox" onChange={(e) => changeLocale(e)}/>
      <label className="switch-button-label" htmlFor="switch-lang">
        <span className="switch-button-label-span">EN</span>
      </label>
    </div>
  )
}