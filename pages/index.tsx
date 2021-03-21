import React, {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  useReducer,
  useState,
} from 'react'
import Item from '../components/Item'
import { ProConItem } from '../interfaces'
import { v4 } from 'uuid'

enum ActionType {
  ADD_PRO,
  ADD_CONTRA,
  REMOVE_PRO,
  REMOVE_CONTRA,
}
interface Action {
  type: ActionType
  payload: any
}
interface State {
  pro: ProConItem[]
  contra: ProConItem[]
}
export default function IndexPage() {
  const [proValue, setProValue] = useState('')
  const [contraValue, setContraValue] = useState('')
  const [state, dispatch] = useReducer(
    (prevState: State, action: Action) => {
      switch (action.type) {
        case ActionType.ADD_PRO: {
          const proList = prevState.pro
          proList.push(action.payload.item)
          return {
            ...prevState,
            pro: proList,
          }
        }
      }
      return prevState
    },
    {
      pro: [],
      contra: [],
    }
  )

  const addPro = (event: FormEvent) => {
    event.preventDefault()
    dispatch({
      type: ActionType.ADD_PRO,
      payload: {
        item: {
          id: v4(),
          text: proValue,
          weight: 1,
        },
      },
    })
  }

  const handleProChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setProValue(event.target.value)
  }
  return (
    <div id="procon-list" className="grid h-screen grid-cols-2 gap-2">
      <div className="flex items-center justify-center rounded-r-sm bg-gradient-to-l from-green-700 via-green-500 to-transparent">
        <h2 className="text-2xl font-bold text-gray-900">Pro</h2>
      </div>
      <div className="flex items-center justify-center rounded-l-sm bg-gradient-to-r from-red-700 via-red-500 to-transparent">
        <h2 className="text-2xl font-bold text-gray-900">Contra</h2>
      </div>

      <div className="px-3 text-gray-900">
        <ul className="space-y-3 text-gray-900">
          {state.pro.map((item) => (
            <Item key={item.id} item={item} pro />
          ))}
          <li className="w-full mt-4">
            <form onSubmit={addPro} className="flex flex-row items-end">
              <textarea
                className="flex-1 text-white bg-transparent border-b-2 border-white focus:outline-none"
                placeholder="Add a new item"
                value={proValue}
                onChange={handleProChange}
              />
              <button className="box-content flex-grow-0 p-2 ml-1 text-white bg-blue-600 rounded-sm">
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
          </li>
        </ul>
      </div>

      <div className="px-3 text-gray-900">
        <ul className="">
          {state.contra.map((item) => (
            <Item key={item.id} item={item} />
          ))}
        </ul>
      </div>
    </div>
  )
}
