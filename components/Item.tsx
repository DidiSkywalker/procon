import React from 'react'
import { ListItem } from '../interfaces'

export interface Props {
  item: ListItem
  pro?: boolean
  active?: boolean
  onDelete?: () => void
  onClick?: () => void
}

export default function Item({
  item,
  pro = false,
  active = false,
  onDelete = () => {},
  onClick = () => {},
}: Props) {
  const color = pro ? 'green' : 'red'

  return (
    <li className="relative mb-2 group">
      <div className="absolute top-0 left-0 flex items-center justify-end w-full h-full px-2 border-t-2 border-r-2 border-black bg-gray-1000 rounded-3xl">
        <svg
          className="w-10 p-1 text-gray-50 hover:cursor-pointer hover:bg-red-600 rounded-3xl"
          onClick={() => onDelete()}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </div>

      <p
        className={`p-3 block transition duration-100 ease-in-out transform rounded-3xl overflow-hidden border-2 border-${color}-300 bg-gray-900 text-gray-50 ${
          active
            ? `static -translate-x-14 shadow-xl`
            : `md:hover:static md:hover:-translate-x-1 `
        } hover:cursor-pointer`}
        onClick={() => onClick()}
      >
        {item.text}
      </p>
    </li>
  )
}
