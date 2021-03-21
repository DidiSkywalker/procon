import React from 'react'
import { ProConItem } from '../interfaces'

export interface Props {
  item: ProConItem
  pro?: boolean
  active?: boolean
  onDelete?: (item: ProConItem) => void
}

export default function Item({
  item,
  pro = false,
  active = false,
  onDelete,
}: Props) {
  return (
    <li className="relative group">
      <div className="absolute top-0 left-0 w-full h-full bg-red-500 rounded-3xl"></div>

      <p
        className={`p-3 transition duration-100 ease-in-out transform rounded-3xl ${
          pro ? 'bg-green-100' : 'bg-red-100'
        } ${
          active && 'absolute -translate-x-12'
        } hover:absolute hover:-translate-x-1 hover:cursor-pointer`}
      >
        {item.text}
      </p>
    </li>
  )
}
