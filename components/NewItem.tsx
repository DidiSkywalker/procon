import React, { FormEvent, KeyboardEventHandler, useState } from 'react'

interface Props {
  onSubmit: (value: string) => void
  minLength?: number
}

export default function NewItem({ onSubmit, minLength = 0 }: Props) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    if (value.length >= minLength) {
      onSubmit(value)
      setValue('')
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
      <button className="box-content flex-grow-0 p-2 ml-1 text-gray-900 bg-gray-100 rounded-sm opacity-30 hover:opacity-100 focus:outline-none">
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
    </form>
  )
}
