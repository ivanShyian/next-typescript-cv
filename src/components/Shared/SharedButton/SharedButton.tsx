import {FC, ReactChild} from 'react'
import './SharedButton.scss'

interface Props {
  link?: boolean,
  children?: ReactChild | string
}

export const SharedButton: FC<Props> = ({link, children} : Props) => {
  const CustomTag = link ? 'a' : 'button' as keyof JSX.IntrinsicElements
  return (
    <CustomTag className="shared-button">{children}</CustomTag>
  )
}
