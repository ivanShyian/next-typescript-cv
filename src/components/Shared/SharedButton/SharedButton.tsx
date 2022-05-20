import {FC, ReactChild} from 'react'
import './SharedButton.scss'

interface Props {
  children?: ReactChild | string
  type?: 'button' | 'submit'
  onClick?: () => any
  loading?: boolean
}

export const SharedButton: FC<Props> = ({children, type = 'button', onClick, loading = false}) => {
  return (
    <button onClick={onClick} type={type} className={`shared-button${loading ? ' loading' : ''}`}>{children}</button>
  )
}
