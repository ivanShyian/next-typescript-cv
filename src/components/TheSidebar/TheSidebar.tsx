import type { NextPage } from 'next'
import {RefObject, useState} from 'react'
import './TheSidebar.scss'
import SharedNavbar from '@/components/Shared/SharedNavbar'
import SharedLogo from '@/components/Shared/SharedLogo'
import {useElementOnScreen} from '@/use/useElementOnScreen'
import SharedLang from '@/components/Shared/SharedLang'

export const TheSidebar: NextPage = () => {
  const [isNavOpened, changeNavState] = useState(false)

  const asideClasses = isNavOpened ? 'aside_active' : 'aside'
  const asideBurgerBtnClasses = isNavOpened ? 'aside__burger_button active' : 'aside__burger_button'

  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 0.05
  }, '.index__cutaway') as [RefObject<HTMLDivElement> | null, boolean]

  const onBurgerClick = () => {
    changeNavState((state: boolean) => !state)
  }

  const burgerClass = isVisible ? 'aside__burger' : 'aside__burger darken'

  return (
    <aside className={asideClasses}>
      <div className="aside__wrapper">
        <div className="aside__logo">
          <SharedLogo />
        </div>
        <div className="aside__navbar">
          <SharedNavbar />
        </div>
        <div className="aside__lang">
          <SharedLang />
        </div>
      </div>
      <div className={burgerClass}>
        <div
          onClick={onBurgerClick}
          className={asideBurgerBtnClasses}
        >
          <span />
        </div>
      </div>
      <b className="hr" />
    </aside>
  )
}
