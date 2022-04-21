import {FC, ReactChild} from 'react'
import './SharedSectionTitle.scss'
import Svg from '@/public/icons/dots.svg'

interface Props {
  children: ReactChild | string
}

export const SharedSectionTitle: FC<Props> = ({children}: Props) => {
  return (
    <div className="shared-section-title">
      <p className="shared-section-title__text">{children}</p>
      <Svg />
    </div>
  )
}
