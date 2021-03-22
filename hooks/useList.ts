import { useState } from 'react'
import { v4 } from 'uuid'
import { ListItem } from '../interfaces'

export default function useList(
  entries?: ListItem[]
): [
  ListItem[],
  (values: { text: string; weight: number; [x: string]: any }) => void,
  (id: string) => void,
  () => void,
  (items: ListItem[]) => void
] {
  const [list, setList] = useState(entries || [])

  const add = ({
    text,
    weight,
    ...rest
  }: {
    text: string
    [x: string]: any
  }) => {
    const item = {
      id: v4(),
      text,
      weight,
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

  const set = (items: ListItem[]) => {
    setList(items)
  }

  return [list, add, remove, clear, set]
}
