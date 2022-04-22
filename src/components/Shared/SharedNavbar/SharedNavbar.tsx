import Home from '@/public/icons/navigation-icons/home.svg'
import Person from '@/public/icons/navigation-icons/person.svg'
import Briefcase from '@/public/icons/navigation-icons/briefcase.svg'
import Workflow from '@/public/icons/navigation-icons/workflow.svg'
import Book from '@/public/icons/navigation-icons/book.svg'
import IdBadge from '@/public/icons/navigation-icons/id-badge.svg'

import './SharedNavbar.scss'
import {ReactElement} from 'react'
import {NextPage} from 'next'

interface ListItem {
  id: number,
  name: string,
  iconComponent: ReactElement
}

export const SharedNavbar:  NextPage = () => {
  const navList: ListItem[] = [
    {id: 0, name: 'Home', iconComponent: <Home />},
    {id: 1, name: 'About', iconComponent: <Person />},
    {id: 2, name: 'Education', iconComponent: <Book />},
    {id: 3, name: 'Work', iconComponent: <Briefcase />},
    {id: 3, name: 'Projects', iconComponent: <Workflow />},
    {id: 5, name: 'Contact me', iconComponent: <IdBadge />}
  ]

  const listItem = (item: ListItem) => {
    return (
      <li className="nav__item" key={item.id}>
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
