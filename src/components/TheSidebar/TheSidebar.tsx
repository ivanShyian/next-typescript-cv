import type { NextPage } from 'next'
import {useState} from 'react'
import './TheSidebar.scss'
import SharedNavbar from '@/components/Shared/SharedNavbar'
import SharedLogo from '@/components/Shared/SharedLogo'

export const TheSidebar: NextPage = () => {
  const [isNavOpened, changeNavState] = useState(false)

  const asideClasses = isNavOpened ? 'aside_active' : 'aside'
  const asideBurgerBtnClasses = isNavOpened ? 'aside__burger_button active' : 'aside__burger_button'

  const onBurgerClick = () => {
    changeNavState((state: boolean) => {
      return !state
    })
  }

  return (
    <aside className={asideClasses}>
      <div className="aside__wrapper">
        <SharedLogo />
        <SharedNavbar />
      </div>
      <div className="aside__burger">
        <div
          onClick={onBurgerClick}
          className={asideBurgerBtnClasses}
        >
          <span />
        </div>
      </div>
    </aside>
  )
}
