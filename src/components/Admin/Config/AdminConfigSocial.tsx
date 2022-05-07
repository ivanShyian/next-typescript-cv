import {FC} from 'react'

const ModalSocialTab: FC<{linksList: any[]}> = ({linksList}) => {
  const listItems = linksList.map((item, id) => {
    return (
      <li className="modal-list__item form-control" key={id}>
        <div className="form-control__heading">
          <label htmlFor="">{item.en.name}</label>
        </div>
        <input className="form-control__input" type="text" readOnly={false} placeholder={item.en.value} />
      </li>
    )
  })
  return (
    <form className="modal-social">
      <div className="modal__content_social">
        <p className="modal__title">Social Medias</p>
        <ul className="modal-social__list modal-list">
          {listItems}
        </ul>
      </div>
    </form>
  )
}

export default ModalSocialTab