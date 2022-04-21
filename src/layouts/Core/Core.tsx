import {PropsWithChildren} from 'react'
// import TheFooter from '@/components/TheFooter'
import TheSidebar from '@/components/TheSidebar'
import './Core.scss'

export default function Core({ children }: PropsWithChildren<{}>) {
  return (
    <div className="core-layout">
      <TheSidebar />
      <main className="main">{children}</main>
      {/*<TheFooter />*/}
    </div>
  )
}
