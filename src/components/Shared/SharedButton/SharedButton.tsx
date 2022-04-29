import {ButtonHTMLAttributes, FC, ReactChild} from 'react'
import './SharedButton.scss'

interface Props {
  children?: ReactChild | string,
  type?: 'button' | 'submit'
}

export const SharedButton: FC<Props> = ({children, type = 'button'} : Props) => {
  return (
    <button type={type} className="shared-button">{children}</button>
  )
}
