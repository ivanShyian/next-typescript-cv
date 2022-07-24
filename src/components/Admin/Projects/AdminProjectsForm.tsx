import {FC} from 'react'
import {Project} from '@/models/Project'

interface Props {
  title: string
  subtitle: string
  description: string
  link: string
  onInputChange: (field: keyof Project, value: string | boolean) => void
  isWork: boolean
}

export const AdminProjectsForm: FC<Props> = ({title, subtitle, description, link, onInputChange, isWork}) => {
  return (
    <div className="admin-projects__form">
      <div className="form-control">
        <div className="form-control__heading">
          <label htmlFor="">Title</label>
        </div>
        <input
          className="form-control__input"
          type="text"
          value={title}
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
          type="text"
          value={description}
          onChange={(e) => onInputChange('description', e.target.value)}
        />
      </div>
      <div className="form-control">
        <div className="form-control__heading">
          <label htmlFor="">Link</label>
        </div>
        <input
          className="form-control__input"
          type="text"
          value={link}
          onChange={(e) => onInputChange('link', e.target.value)}
        />
      </div>
      <div className="form-control checkbox">
        <div className="form-control__heading">
          <label htmlFor="">Is work project?</label>
        </div>
        <input
          className="form-control__input"
          type="checkbox"
          checked={isWork}
          onChange={(e) => onInputChange('isWork', !isWork)}
        />
      </div>
    </div>
  )
}
