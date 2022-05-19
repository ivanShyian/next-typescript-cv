import {FC, KeyboardEvent, useRef, useState} from 'react'

interface Props {
  className: string
  index: number
  value: string
  onInputEnter: (index: number, value: string) => void
}

export const AdminWorkListItem: FC<Props> = ({className, index, value, onInputEnter}) => {
  const [val, changeVal] = useState<string>(value)
  const inputRef = useRef<HTMLInputElement>(null)

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      onInputEnter(index, val)
      inputRef.current?.blur()
    }
  }
  return (
    <li className={className}>
      <input
        type="text"
        ref={inputRef}
        className="list-input"
        onChange={(e) => changeVal(e.target.value)}
        onKeyDown={onKeyDown}
        value={val}
      />
    </li>
  )
}

// @TODO This component must be on shared