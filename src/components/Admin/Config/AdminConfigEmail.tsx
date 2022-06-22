import {FC, MutableRefObject, useMemo, useEffect, useRef} from 'react'

interface Props {
  childValue: MutableRefObject<{getValue: string} | null>
  emailReceiver: string
}

const ModalEmailTab: FC<Props> = ({emailReceiver, childValue}) => {
  const emailRef = useRef<HTMLInputElement>(null)

  const getValue = useMemo(() => {
    const email = emailRef.current
    if (email) return email.value || email.placeholder
    return emailReceiver
  }, [emailRef, emailReceiver])

  useEffect(() => {
    childValue.current = {getValue}
  }, [getValue, childValue])

  return (
    <div className="modal__content_mail modal-mail">
      <p className="modal__title">Email Settings</p>
      <div className="modal-list__item form-control">
        <div className="form-control__heading">
          <label htmlFor="">Email receiver</label>
        </div>
        <input ref={emailRef} className="form-control__input" type="text" placeholder={emailReceiver} />
      </div>
    </div>
  )
}

export default ModalEmailTab
