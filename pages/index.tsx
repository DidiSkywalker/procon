import React, { useState } from 'react'
import Item from '../components/Item'
import useList from '../hooks/useList'
import NewItem from '../components/NewItem'
import WeightModal, { WeightPrompt } from '../components/WeightModal'

const MIN_INPUT_LENGTH = 1

export default function IndexPage() {
  const [pro, addPro, removePro, clearPro] = useList(true)
  const [contra, addContra, removeContra, clearContra] = useList(false)
  const [selected, setSelected] = useState<string | null>(null)
  const [weightPrompt, rawSetWeightPrompt] = useState<WeightPrompt | undefined>(
    undefined
  )

  const setWeightPrompt = (prompt: WeightPrompt) => {
    rawSetWeightPrompt({
      ...prompt,
      onConfirm: (weight) => {
        rawSetWeightPrompt(undefined)
        prompt.onConfirm && prompt.onConfirm(weight)
      },
      onCancel: () => {
        rawSetWeightPrompt(undefined)
        prompt.onCancel && prompt.onCancel()
      },
    })
  }

  const proItems = pro.map((item) => (
    <Item
      key={item.id}
      item={item}
      active={selected === item.id}
      pro
      onDelete={() => removePro(item.id)}
      onClick={() =>
        selected === item.id ? setSelected(null) : setSelected(item.id)
      }
      setWeightPrompt={setWeightPrompt}
    />
  ))

  const contraItems = contra.map((item) => (
    <Item
      key={item.id}
      item={item}
      active={selected === item.id}
      onDelete={() => removeContra(item.id)}
      onClick={() =>
        selected === item.id ? setSelected(null) : setSelected(item.id)
      }
      setWeightPrompt={setWeightPrompt}
    />
  ))

  const proWeight = pro.reduce((acc, curr) => (acc += curr.weight), 0)
  const contraWeight = contra.reduce((acc, curr) => (acc += curr.weight), 0)
  const totalWeight = proWeight + contraWeight
  const proPercent = Math.round((proWeight / totalWeight) * 100) || 0
  const contraPercent = Math.round((contraWeight / totalWeight) * 100) || 0

  return (
    <div
      id="procon-list"
      className="grid grid-cols-2 gap-y-3 sm:gap-3 md:gap-5 xl:gap-10"
    >
      <div className="relative flex items-center justify-center mb-2 rounded-tr-sm bg-gradient-to-l from-green-700 via-green-500 to-transparent">
        <div className="absolute bottom-0 left-0 right-0 h-2 transform translate-y-2 bg-gradient-to-l from-green-900 via-green-900 to-transparent"></div>
        <h2 className="flex flex-col justify-center w-full space-x-1 text-2xl font-bold text-center text-gray-900 sm:flex-row">
          <span>Pros</span>
          <span>{proPercent}%</span>
        </h2>
        <svg
          className="absolute top-0 bottom-0 right-0 w-10 p-1 my-auto mr-1 opacity-25 text-gray-50 hover:opacity-100 hover:cursor-pointer hover:bg-green-800 rounded-3xl"
          onClick={() => clearPro()}
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
      <div className="relative flex items-center justify-center mb-2 rounded-tl-sm bg-gradient-to-r from-red-700 via-red-500 to-transparent">
        <div className="absolute bottom-0 left-0 right-0 h-2 transform translate-y-2 bg-gradient-to-r from-red-900 via-red-900 to-transparent"></div>
        <svg
          className="absolute top-0 bottom-0 left-0 w-10 p-1 my-auto ml-1 opacity-25 text-gray-50 hover:opacity-100 hover:cursor-pointer hover:bg-red-800 rounded-3xl"
          onClick={() => clearContra()}
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
        <h2 className="flex flex-col justify-center w-full space-x-1 text-2xl font-bold text-center text-gray-900 sm:flex-row">
          <span>Cons</span>
          <span>{contraPercent}%</span>
        </h2>
      </div>

      <div className="px-1 sm:px-3">
        <ul className="text-gray-900">
          {proItems.length > 0 ? (
            proItems
          ) : (
            <div className="text-center text-gray-400">Empty</div>
          )}
          <li className="w-full mt-12">
            <NewItem
              onSubmit={addPro}
              minLength={MIN_INPUT_LENGTH}
              setWeightPrompt={setWeightPrompt}
            />
          </li>
        </ul>
      </div>

      <div className="px-1 sm:px-3">
        <ul className="text-gray-900">
          {contraItems.length > 0 ? (
            contraItems
          ) : (
            <div className="text-center text-gray-400">Empty</div>
          )}
          <li className="w-full mt-12">
            <NewItem
              onSubmit={addContra}
              minLength={MIN_INPUT_LENGTH}
              setWeightPrompt={setWeightPrompt}
            />
          </li>
        </ul>
      </div>

      <WeightModal weightPrompt={weightPrompt} />
    </div>
  )
}
