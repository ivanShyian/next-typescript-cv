import Home from '@/public/icons/navigation-icons/home.svg'
import Person from '@/public/icons/navigation-icons/person.svg'
import Briefcase from '@/public/icons/navigation-icons/briefcase.svg'
import Workflow from '@/public/icons/navigation-icons/workflow.svg'
import Book from '@/public/icons/navigation-icons/book.svg'
import IdBadge from '@/public/icons/navigation-icons/id-badge.svg'

import {useScroll} from '@/use/useScroll'

import './SharedNavbar.scss'
import {ReactElement} from 'react'
import {NextPage} from 'next'

interface ListItem {
  id: number
  name: string
  iconComponent: ReactElement
  className?: string
}

export const SharedNavbar:  NextPage = () => {
  const navList: ListItem[] = [
    {id: 0, name: 'Home', iconComponent: <Home />, className: '.index__cutaway'},
    {id: 1, name: 'About', iconComponent: <Person />, className: '.index__about'},
    {id: 2, name: 'Education', iconComponent: <Book />, className: '.index__education'},
    {id: 3, name: 'Work', iconComponent: <Briefcase />, className: '.index__work'},
    {id: 4, name: 'Projects', iconComponent: <Workflow />, className: '.index__projects'},
    {id: 5, name: 'Contact me', iconComponent: <IdBadge />, className: '.index__contact'}
  ]

  const [scrollTo] = useScroll()

  const listItem = (item: ListItem) => {
    return (
      <li className="nav__item" key={item.id} onClick={() => scrollTo(item.className!)}>
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
    </div>
  )
}
