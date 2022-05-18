import {FC} from 'react'
import './SharedEditDelete.scss'

interface Props {
  direction?: 'row'| 'column'
  onEditClick: (arg?: any) => any
  onDeleteClick: (arg?: any) => any
}

export const SharedEditDelete: FC<Props> = ({direction = 'row', onEditClick, onDeleteClick}: Props) => {
  return (
    <div className={`shared-edit-delete${direction === 'column' ? '_column' : ''}`}>
      <div className="shared-edit-delete__edit admin-circle-button" onClick={onEditClick}>
        <span>e</span>
      </div>
      <div className="shared-edit-delete__delete admin-circle-button remove" onClick={onDeleteClick}>
        <span>d</span>
      </div>
    </div>
  )
}