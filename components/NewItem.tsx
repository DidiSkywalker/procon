import React, { FormEvent, KeyboardEventHandler, useState } from 'react'
import { WeightPrompt } from './WeightModal'

interface Props {
  onSubmit: (values: { text: string; weight: number; [x: string]: any }) => void
  setWeightPrompt: (prompt: WeightPrompt) => void
  minLength?: number
}

export default function NewItem({
  onSubmit,
  setWeightPrompt,
  minLength = 1,
}: Props) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const [weight, setWeight] = useState(1)

  const handleSubmit = (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    if (value.length >= minLength) {
      onSubmit({
        text: value,
        weight: weight,
      })
      setValue('')
      setWeight(1)
      setError(false)
    } else {
      setError(true)
    }
  }

  const handleKeyPress: KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSubmit()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-row items-end">
      <textarea
        className={`flex-1 text-white bg-transparent border-b-2 px-2 border-white focus:outline-none ${
          error && 'border border-red-600 rounded-md'
        }`}
        placeholder="Add a new item"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyPress={handleKeyPress}
      />
      <div className="flex flex-col space-y-1">
        <button
          type="button"
          title="Set Weight"
          className="box-content flex-grow-0 p-2 ml-1 text-gray-900 bg-gray-100 rounded-sm opacity-30 hover:opacity-100 focus:outline-none focus:opacity-100"
          onClick={() =>
            setWeightPrompt({
              currentValue: weight,
              onConfirm: (weight) => setWeight(weight),
            })
          }
        >
          <svg
            className="w-4 h-4"
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
        </button>
        <button
          title="Create item"
          className="box-content flex-grow-0 p-2 ml-1 text-gray-900 bg-gray-100 rounded-sm opacity-30 hover:opacity-100 focus:outline-none focus:opacity-100"
        >
          <svg
            className="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </form>
  )
}
