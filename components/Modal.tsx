import React, { PropsWithChildren } from 'react'

interface Props {
  show?: boolean
  onClose?: () => void
}

export default function Modal({
  children,
  show = false,
  onClose = () => {},
}: PropsWithChildren<Props>) {
  if (!show) {
    return null
  }

  return (
    <>
      <div
        className="absolute top-0 bottom-0 left-0 right-0 z-40 flex bg-black bg-opacity-30"
        onClick={onClose}
        style={{ backdropFilter: 'blur(3px)' }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="z-50 w-11/12 p-5 m-auto bg-gray-900 border border-gray-600 pointer-events-auto md:w-3/4 xl:w-1/2 rounded-xl"
        >
          {children}
        </div>
      </div>
    </>
  )
}
