import React, { useEffect, useState } from 'react'
import { FIB_TABLE } from '../utils'
import Modal from './Modal'

export interface WeightPrompt {
  currentValue: number
  onConfirm?: (weight: number) => void
  onCancel?: () => void
}

interface Props {
  weightPrompt?: WeightPrompt
}

export default function WeightModal({ weightPrompt }: Props) {
  const [weight, setWeight] = useState(weightPrompt?.currentValue || 1)

  useEffect(() => {
    setWeight(weightPrompt?.currentValue || 1)
  }, [weightPrompt])

  return (
    <Modal show={weightPrompt !== undefined} onClose={weightPrompt?.onCancel}>
      <div className="flex flex-col content-center">
        <h3 className="text-3xl text-center text-gray-50">Set Weight</h3>

        <output className="w-1/12 py-0.5 mx-auto mt-6 text-lg text-center border border-gray-300 rounded-3xl text-gray-50">
          {FIB_TABLE[weight]}
        </output>
        <input
          className="w-full h-2 mx-auto mt-5 mb-10 bg-gray-600 outline-none appearance-none md:w-3/4 xl:w-1/2 rounded-3xl "
          type="range"
          name="weight"
          id="weight"
          min={1}
          max={7}
          step={1}
          value={weight}
          onChange={(event) => setWeight(event.target.valueAsNumber)}
        />
        <div className="flex flex-row justify-end w-full mx-auto space-x-2 md:w-3/4 xl:w-1/2">
          <button
            onClick={weightPrompt?.onCancel}
            className="px-4 py-1 bg-gray-600 focus:outline-none text-gray-50 hover:bg-gray-700 rounded-3xl"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (weightPrompt?.onConfirm) {
                weightPrompt.onConfirm(weight)
              }
            }}
            className="px-4 py-1 text-gray-900 bg-gray-100 focus:outline-none hover:bg-gray-200 rounded-3xl"
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  )
}
