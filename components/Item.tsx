import React from 'react'
import { ListItem } from '../interfaces'
import { WeightPrompt } from './WeightModal'

export interface Props {
  item: ListItem
  pro?: boolean
  active?: boolean
  onDelete?: () => void
  onClick?: () => void
  setWeightPrompt?: (prompt: WeightPrompt) => void
}

export default function Item({
  item,
  pro = false,
  active = false,
  onDelete = () => {},
  onClick = () => {},
  setWeightPrompt = () => {},
}: Props) {
  const color = pro ? 'green' : 'red'

  return (
    <li className="relative mb-2 group">
      <div className="absolute top-0 left-0 flex items-center justify-end w-full h-full px-2 border-t-2 border-r-2 border-black bg-gray-1000 rounded-3xl">
        <svg
          className="w-10 p-1 rounded-full text-gray-50 hover:cursor-pointer hover:bg-gray-700"
          onClick={() =>
            setWeightPrompt({
              currentValue: item.weight,
              onConfirm: (weight) => {
                item.weight = weight
                onClick()
              },
              onCancel: onClick,
            })
          }
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1zm-5 8.274l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L5 10.274zm10 0l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L15 10.274z"
            clipRule="evenodd"
          />
        </svg>
        <svg
          className="w-10 p-1 rounded-full text-gray-50 hover:cursor-pointer hover:bg-red-600"
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
            ? `static -translate-x-24 shadow-xl`
            : `md:hover:static md:hover:-translate-x-1 `
        } hover:cursor-pointer`}
        onClick={() => onClick()}
      >
        {item.text}
      </p>
    </li>
  )
}
