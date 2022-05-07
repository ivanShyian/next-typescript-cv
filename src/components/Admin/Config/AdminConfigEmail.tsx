import {FC} from 'react'

const ModalEmailTab: FC<{emailReceiver: string}> = ({emailReceiver}) => {
  return (
    <div className="modal__content_mail modal-mail">
      <p className="modal__title">Email Settings</p>
      <div className="modal-list__item form-control">
        <div className="form-control__heading">
          <label htmlFor="">Email receiver</label>
        </div>
        <input className="form-control__input" type="text" placeholder={emailReceiver} />
      </div>
    </div>
  )
}

export default ModalEmailTab