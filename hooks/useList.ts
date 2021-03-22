import { useState } from 'react'
import { v4 } from 'uuid'
import { ListItem } from '../interfaces'

export default function useList(
  pro: boolean,
  entries?: ListItem[]
): [
  ListItem[],
  (text: string, ...rest: any[]) => void,
  (id: string) => void,
  () => void
] {
  const [list, setList] = useState(entries || [])

  const add = (text: string, ...rest: any[]) => {
    const item = {
      id: v4(),
      text,
      pro,
      ...rest,
    }
    setList([...list, item])
  }

  const remove = (id: string) => {
    setList(list.filter((item) => item.id !== id))
  }

  const clear = () => {
    setList([])
  }

  return [list, add, remove, clear]
}
