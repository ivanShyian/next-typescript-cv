import {FC, ReactChild} from 'react'
import './SharedSectionTitle.scss'
import Svg from '@/public/icons/dots.svg'
import useTranslation from 'next-translate/useTranslation'

interface Props {
  children: ReactChild | string
}

export const SharedSectionTitle: FC<Props> = ({children}: Props) => {
  const {lang} = useTranslation()
  return (
    <div className={`shared-section-title ${lang}`}>
      <p className="shared-section-title__text">{children}</p>
      <Svg />
    </div>
  )
}
