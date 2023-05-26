import { useState } from "react"

type ListProps = {
    initialItem: string[]
}

function List({ initialItem }: ListProps) {
  const [newItem, setNewItem] = useState('')
  const [list, setList] = useState(initialItem)

  const addToList = () => {
    setTimeout(() => {
      setList(state => [...state, newItem])
    }, 500)
  }

  const removeFromList = (item: string) => {
    setTimeout(() => {
      setList(state => state.filter(item => item !== item))
    }, 500)
  }

  return (
    <>
      <input type="text" placeholder="Novo Item" value={newItem} onChange={e => setNewItem(e.target.value)}/>
      <button onClick={addToList}>Adicionar</button>
      <ul>
        {list.map(item => 
        <li key={item}>
          {item}
          <button onClick={() => removeFromList(item)}>Remover</button>
        </li>
        )}
      </ul>
    </>
  )
}

export default List