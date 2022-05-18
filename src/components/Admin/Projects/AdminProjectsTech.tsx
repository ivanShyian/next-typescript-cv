import {ChangeEvent, FC, useState, KeyboardEvent, useRef} from 'react'

interface Props {
  tech: string
  index: number
  onTechChange: (index: number, value: string) => void
}

export const AdminProjectsTech: FC<Props> = ({tech, index, onTechChange}) => {
  const [technology, changeTechnology] = useState(tech)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const changeTechHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    changeTechnology(value)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      onTechChange(index, technology)
      inputRef.current?.blur()
    }
  }

  return (
    <li
      className="admin-projects__techs_item"
    >
      <input
        type="text"
        ref={inputRef}
        value={technology}
        onChange={changeTechHandler}
        onKeyDown={handleKeyDown}
      />
    </li>
  )
}