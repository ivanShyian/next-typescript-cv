import {SimplifiedWork} from '@/models/Work'
import {FC} from 'react'

interface Props {
  values: Omit<SimplifiedWork, 'technologies' | 'responsibilities' | 'imageUrl'>
  onHandleChange: (ket: string, value: string) => void
}

export const AdminWorkItemForm: FC<Props> = ({values, onHandleChange}) => {
  return (
    <form className="admin-work-item__form">
      <div className="form-control">
        <div className="form-control__heading">
          <label htmlFor="">Title</label>
        </div>
        <input
          type="text"
          className="form-control__input"
          placeholder="Your graduation degree..."
          value={values.title}
          onChange={(e) => onHandleChange('title', e.target.value)}
        />
      </div>
      <div className="form-control">
        <div className="form-control__heading">
          <label htmlFor="">Subtitle</label>
        </div>
        <input
          type="text"
          className="form-control__input"
          placeholder="Your graduation degree..."
          value={values.subtitle}
          onChange={(e) => onHandleChange('subtitle', e.target.value)}
        />
      </div>
      <div className="form-control">
        <div className="form-control__heading">
          <label htmlFor="">Description</label>
        </div>
        <textarea
          className="form-control__input_textarea"
          placeholder="Your graduation degree..."
          value={values.description}
          onChange={(e) => onHandleChange('description', e.target.value)}
        />
      </div>
      <div className="form-control">
        <div className="form-control__heading">
          <label htmlFor="">Position</label>
        </div>
        <input
          type="text"
          className="form-control__input"
          placeholder="Your graduation degree..."
          value={values.position}
          onChange={(e) => onHandleChange('position', e.target.value)}
        />
      </div>
      <div className="form-control">
        <div className="form-control__heading">
          <label htmlFor="">Duration</label>
        </div>
        <input
          type="text"
          className="form-control__input"
          placeholder="Your graduation degree..."
          value={values.duration}
          onChange={(e) => onHandleChange('duration', e.target.value)}
        />
      </div>
    </form>
  )
}