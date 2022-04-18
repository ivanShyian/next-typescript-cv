import type { NextPage } from 'next'
import {useState} from 'react'
import './TheSidebar.scss'
import SharedNavbar from '@/components/Shared/SharedNavbar'
import SharedLogo from '@/components/Shared/SharedLogo'

export const TheSidebar: NextPage = () => {
  const [isNavOpened, changeNavState] = useState(false)

  //@TODO Rewrite
  const asideClasses = isNavOpened ? 'aside aside_active' : 'aside'
  const asideWrapperClasses = isNavOpened ? 'aside__wrapper_opened' : 'aside__wrapper'
  const asideBurgerBtnClasses = isNavOpened ? 'aside__burger_button active' : 'aside__burger_button'

  const onBurgerClick = () => {
    changeNavState((state: boolean) => {
      return !state
    })
  }

  return (
    <aside className={asideClasses}>
      <div className={asideWrapperClasses}>
        <SharedLogo />
        <SharedNavbar />
      </div>
      <div className='aside__burger'>
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
