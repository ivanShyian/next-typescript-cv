import {FC, MutableRefObject, useEffect, useMemo} from 'react'
import {FieldsList} from '@/models/Config'

interface Props {
  linksMap: { [key: string]: string }
  childFunction: MutableRefObject<{getValues: {[key: string]: string}} | null>
  changeSocial: (field: FieldsList, newValues: any) => void
}

const ModalSocialTab: FC<Props> = ({linksMap, childFunction, changeSocial}) => {
  const getValues = useMemo(() => {
    let result: {[key: string]: string} = {}
    const inputList = document.querySelectorAll('#socialInput') as NodeListOf<HTMLInputElement>
    inputList.forEach((input: HTMLInputElement) => {
      const field = input.getAttribute('data-field')
      result[field!] = input.value || input.placeholder
    })
    return result
  }, [])

  useEffect(() => {
    childFunction.current = {getValues}
  }, [childFunction, getValues])


  const socialMap = () => {
    const rows = []
    for (const property in linksMap) {
      rows.push((
        <li className="modal-list__item form-control" key={property}>
          <div className="form-control__heading">
            <label htmlFor="">{property}</label>
          </div>
          <input
            id="socialInput"
            data-field={property}
            className="form-control__input"
            type="text"
            readOnly={false}
            placeholder={linksMap[property]}
          />
        </li>
      ))
    }
    return rows
  }

  const social = socialMap()

  return (
    <form className="modal-social">
      <div className="modal__content_social">
        <p className="modal__title">Social Medias</p>
        <ul className="modal-social__list modal-list">
          {social}
        </ul>
      </div>
    </form>
  )
}

export default ModalSocialTab
