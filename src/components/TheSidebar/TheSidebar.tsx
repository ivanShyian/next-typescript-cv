import type { NextPage } from 'next'
import {RefObject, useEffect, useState} from 'react'
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
  }, 'section.index__cutaway') as [RefObject<HTMLDivElement> | null, boolean]

  const onBurgerClick = () => {
    changeNavState((state: boolean) => !state)
  }

  // const onDeviceClickHandler = (e: MouseEvent) => {
  //   console.log(e.target)
  // }

  // useEffect(() => {
  //   if (document.documentElement.clientHeight < 767) {
  //     document.addEventListener('click', (e) => onDeviceClickHandler(e))
  //     return () => document.removeEventListener('click', (e) => onDeviceClickHandler(e))
  //   }
  // }, [])

  const burgerClass = isVisible ? 'aside__burger' : 'aside__burger darken'

  return (
    <aside className={asideClasses}>
      <div className="aside__wrapper">
        <div className="aside__logo">
          <SharedLogo />
        </div>
        <div className="aside__navbar">
          <SharedNavbar onNavigationClick={onBurgerClick} />
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
