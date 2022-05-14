import Home from '@/public/icons/navigation-icons/home.svg'
import Person from '@/public/icons/navigation-icons/person.svg'
import Briefcase from '@/public/icons/navigation-icons/briefcase.svg'
import Workflow from '@/public/icons/navigation-icons/workflow.svg'
import Book from '@/public/icons/navigation-icons/book.svg'
import IdBadge from '@/public/icons/navigation-icons/id-badge.svg'
import Gear from '@/public/icons/navigation-icons/gear.svg'

import {useScroll} from '@/use/useScroll'
import './SharedNavbar.scss'
import {MutableRefObject, ReactElement, useRef, useState} from 'react'
import {NextPage} from 'next'
import {useAuthContext} from '@/ctx/auth'
import AdminConfig from '@/components/Admin/Config'
import useTranslation from 'next-translate/useTranslation'
import {useRouter} from 'next/router'
import {useElementOnScreen} from '@/use/useElementOnScreen'

interface ListItem {
  id: number
  name: string
  iconComponent: ReactElement
  className?: string
  isAdmin?: boolean
}

export const SharedNavbar:  NextPage = () => {
  const modalRef = useRef<MutableRefObject<any>>(null)
  const [shouldMount, changeMountStatus] = useState(false)
  const {t} = useTranslation('common') as {t: any, lang: 'uk' | 'en'}
  // const [] = useElementOnScreen({})
  const router = useRouter()
  const [scrollTo] = useScroll()
  const {isAdmin} = useAuthContext()

  const navList: ListItem[] = [
    {id: 0, name: t('navigation.home'), iconComponent: <Home />, className: '.index__cutaway'},
    {id: 1, name: t('navigation.about'), iconComponent: <Person />, className: '.index__about'},
    {id: 2, name: t('navigation.education'), iconComponent: <Book />, className: '.index__education'},
    {id: 3, name: t('navigation.work'), iconComponent: <Briefcase />, className: '.index__work'},
    {id: 4, name: t('navigation.projects'), iconComponent: <Workflow />, className: '.index__projects'},
    {id: 5, name: t('navigation.contactMe'), iconComponent: <IdBadge />, className: '.index__contact'},
    {id: 6, name: t('navigation.config'), iconComponent: <Gear />, className: 'gear', isAdmin: true}
  ]

  const handleClick = async(className: string, adminRoute?: boolean) => {
    if (adminRoute) {
      await changeMountStatus(true)
      return (modalRef as any).current.changeModalVisibility(true)
    }
    if (router.route === '/login') {
      await router.push('/')
    }
    scrollTo(className)
  }

  const listItem = (item: ListItem) => {
    if (item.isAdmin && !isAdmin) {
      return null
    }
    return (
      <li className="nav__item" key={item.id} onClick={() => handleClick(item.className!, item.isAdmin)}>
        {item.iconComponent}
        <span>{item.name}</span>
      </li>
    )
  }

  return (
    <div className="navigation">
      <nav className="navigation__nav nav">
        <ul className="nav__list">
          {navList.map(listItem)}
        </ul>
      </nav>
      {shouldMount && <AdminConfig childFunction={modalRef} onUnmounted={() => changeMountStatus(false)}/>}
    </div>
  )
}
