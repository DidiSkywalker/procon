import React, { useState } from 'react'
import useList from '../hooks/useList'
import { FIB_TABLE } from '../utils'
import Item from './Item'
import NewItem from './NewItem'
import WeightModal, { WeightPrompt } from './WeightModal'
import Head from 'next/head'
import { ListItem } from '../interfaces'
import { saveAs } from 'file-saver'
import FileUploadButton from './FileUploadButton'

interface IProConList {
  title: string
  pros: ListItem[]
  cons: ListItem[]
}

const EMPTY_LIST = {
  title: '',
  pros: [],
  cons: [],
}

export default function ProConList({
  proConList = EMPTY_LIST,
}: {
  proConList?: IProConList
}) {
  const [title, setTitle] = useState(proConList.title)
  const [pros, addPro, removePro, clearPros, setPros] = useList(proConList.pros)
  const [cons, addCon, removeCon, clearCons, setCons] = useList(proConList.cons)
  const [selected, setSelected] = useState<string | null>(null)
  const [weightPrompt, rawSetWeightPrompt] = useState<WeightPrompt | undefined>(
    undefined
  )
  const [error, setError] = useState<string | null>(null)

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

  const handleFileUpload = (json: any) => {
    if (validateJson(json)) {
      const newProConList = json as IProConList
      setTitle(newProConList.title)
      setPros(newProConList.pros)
      setCons(newProConList.cons)
      setError(null)
    } else {
      setError('Invalid JSON File format')
      setTimeout(() => {
        setError(null)
      }, 60 * 1000)
    }
  }

  const proItems = pros.map((item) => (
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

  const contraItems = cons.map((item) => (
    <Item
      key={item.id}
      item={item}
      active={selected === item.id}
      onDelete={() => removeCon(item.id)}
      onClick={() =>
        selected === item.id ? setSelected(null) : setSelected(item.id)
      }
      setWeightPrompt={setWeightPrompt}
    />
  ))

  const proWeight = pros
    .map((item) => FIB_TABLE[item.weight])
    .reduce((acc, curr) => (acc += curr), 0)
  const contraWeight = cons
    .map((item) => FIB_TABLE[item.weight])
    .reduce((acc, curr) => (acc += curr), 0)
  const totalWeight = proWeight + contraWeight
  const proPercent = Math.round((proWeight / totalWeight) * 100) || 0
  const contraPercent = Math.round((contraWeight / totalWeight) * 100) || 0

  return (
    <>
      <Head>
        <title>{title && `${title} | `}Pros&amp;Cons</title>
      </Head>
      <div
        id="procon-list"
        className="grid grid-cols-2 gap-y-3 sm:gap-3 md:gap-5 xl:gap-10"
      >
        <div className="flex items-center col-span-2 px-4">
          <input
            className="w-full py-1 text-3xl text-gray-300 bg-transparent border-b border-transparent focus:text-gray-50 focus:outline-none focus:border-gray-300"
            type="text"
            name="title"
            id="title"
            placeholder="Untitled"
            autoComplete="off"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />

          {error && (
            <p className="flex-grow flex-shrink-0 px-4 py-2 mr-2 text-sm text-red-300 border-2 border-red-500 rounded-3xl">
              {error}
            </p>
          )}

          <button
            title="Download as JSON"
            className="w-10 text-gray-500 hover:text-gray-50 focus:text-gray-50 focus:outline-none"
            onClick={() =>
              saveFile({
                title,
                pros,
                cons,
              })
            }
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
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </button>
          <FileUploadButton className="w-10 ml-2" onLoad={handleFileUpload} />
        </div>

        <div className="relative flex items-center justify-center mb-2 rounded-tr-sm bg-gradient-to-l from-green-700 via-green-500 to-transparent">
          <div className="absolute bottom-0 left-0 right-0 h-2 transform translate-y-2 bg-gradient-to-l from-green-900 via-green-900 to-transparent"></div>
          <h2 className="flex flex-col justify-center w-full space-x-2 text-2xl font-bold text-center text-gray-900 sm:flex-row">
            <span>Pros</span>
            <span>{proPercent}%</span>
          </h2>
          <button
            className="absolute top-0 bottom-0 right-0 w-10 h-10 p-1 my-auto mr-1 opacity-25 text-gray-50 hover:opacity-100 hover:cursor-pointer hover:bg-green-800 rounded-3xl"
            title="Clear Pros list"
            onClick={() => clearPros()}
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
        <div className="relative flex items-center justify-center mb-2 rounded-tl-sm bg-gradient-to-r from-red-700 via-red-500 to-transparent">
          <div className="absolute bottom-0 left-0 right-0 h-2 transform translate-y-2 bg-gradient-to-r from-red-900 via-red-900 to-transparent"></div>
          <button
            className="absolute top-0 bottom-0 left-0 w-10 h-10 p-1 my-auto ml-1 opacity-25 text-gray-50 hover:opacity-100 hover:cursor-pointer hover:bg-red-800 rounded-3xl"
            title="Clear Cons list"
            onClick={() => clearCons()}
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
          <h2 className="flex flex-col justify-center w-full space-x-2 text-2xl font-bold text-center text-gray-900 sm:flex-row">
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
              <NewItem onSubmit={addPro} setWeightPrompt={setWeightPrompt} />
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
              <NewItem onSubmit={addCon} setWeightPrompt={setWeightPrompt} />
            </li>
          </ul>
        </div>

        <WeightModal weightPrompt={weightPrompt} />
      </div>
    </>
  )
}

function saveFile(proConList: IProConList) {
  const file = new File(
    [JSON.stringify(proConList)],
    `${proConList.title}.json`,
    { type: 'text/plain;charset=utf-8' }
  )
  saveAs(file)
}

function validateJson(json: any) {
  if (
    json &&
    json.title &&
    json.pros &&
    json.cons &&
    json.pros instanceof Array &&
    json.cons instanceof Array
  ) {
    const prosValid = json.pros
      .map((item: any) => item && item.id && item.text && item.weight)
      .reduce((acc: boolean, curr: boolean) => acc && curr, true)
    const consValid = json.pros
      .map((item: any) => item && item.id && item.text && item.weight)
      .reduce((acc: boolean, curr: boolean) => acc && curr, true)
    return prosValid && consValid
  }
  return false
}
