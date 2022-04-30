import {ButtonHTMLAttributes, FC, ReactChild} from 'react'
import './SharedButton.scss'

interface Props {
  children?: ReactChild | string
  type?: 'button' | 'submit'
  onClick: () => any
}

export const SharedButton: FC<Props> = ({children, type = 'button', onClick} : Props) => {
  return (
    <button onClick={onClick} type={type} className="shared-button">{children}</button>
  )
}
