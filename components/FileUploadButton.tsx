import React, { ChangeEventHandler, useRef } from 'react'

export default function FileUploadButton({
  className,
  onLoad = () => {},
}: {
  className: string
  onLoad: (json: any) => void
}) {
  const fileInput = useRef<HTMLInputElement>(null)

  const handleUpload: ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault()
    const files = event.target.files
    if (files && files.length > 0) {
      const file = files[0]
      const reader = new FileReader()
      reader.onload = onReaderLoad
      reader.readAsText(file)
    }
  }

  const onReaderLoad = (event: ProgressEvent<FileReader>) => {
    const json = JSON.parse(event.target?.result as string)
    onLoad(json)
  }

  return (
    <>
      <input
        className="hidden"
        type="file"
        ref={fileInput}
        onChange={handleUpload}
      />
      <button
        title="Upload JSON file"
        className={`text-gray-500 hover:text-gray-50 focus:text-gray-50 focus:outline-none ${className}`}
        onClick={() => fileInput.current?.click()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"
          />
        </svg>
      </button>
    </>
  )
}
