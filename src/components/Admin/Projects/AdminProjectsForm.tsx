import {FC} from 'react'
import {Project} from '@/models/Project'
import {EnUkStringInterface} from '@/models/index'

interface Props {
  title: string
  subtitle: string
  description: string
  onInputChange: (field: keyof Project, value: string) => void
}

export const AdminProjectsForm: FC<Props> = ({title, subtitle, description, onInputChange}) => {
  return (
    <div className="admin-projects__form">
      <div className="form-control">
        <div className="form-control__heading">
          <label htmlFor="">Title</label>
        </div>
        <input
          className="form-control__input"
          type="text" value={title}
          onChange={(e) => onInputChange('title', e.target.value)}
        />
      </div>
      <div className="form-control">
        <div className="form-control__heading">
          <label htmlFor="">Subtitle</label>
        </div>
        <input
          className="form-control__input"
          type="text"
          value={subtitle}
          onChange={(e) => onInputChange('subtitle', e.target.value)}
        />
      </div>
      <div className="form-control">
        <div className="form-control__heading">
          <label htmlFor="">Description</label>
        </div>
        <input
          className="form-control__input"
          type="text" value={description}
          onChange={(e) => onInputChange('description', e.target.value)}
        />
      </div>
    </div>
  )
}