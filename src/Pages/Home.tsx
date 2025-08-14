import { useState } from 'react'
import { useMenuItemsByCategory } from '../apis/menuItem/menuItemQueries'
import { Menu } from '../Components/Menu'
import type { MenuItem } from '../types/apiTypes'
import MenuCard from './MenuCard'
import Modal from '../Components/Modal'

export default function Home() {
  const {
    data: menuItem,
    isLoading,
    isError,
  } = useMenuItemsByCategory('indian')

  const [showModal, setShowModal] = useState(true)
  const [addItem, setAddItem] = useState<MenuItem>()

  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <p className="text-2xl font-bold text-orange-500">Loading....</p>
      </div>
    )
  }

  if (isError) {
    ;<div className="h-full w-full flex items-center justify-center">
      <p className="text-2xl font-bold text-orange-500">
        Error occured while loading data
      </p>
    </div>
  }

  return (
    <div className="bg-orange-100 h-full w-full flex flex-col items-center">
      {showModal && (
        <Modal>
          <div className="h-2/3 w-1/3 bg-white rounded">
            <p>{addItem.name}</p>
            <p>{}</p>
          </div>
        </Modal>
      )}
      <Menu />
      <div
        className="h-full w-5/6 grid grid-cols-3 gap-y-12 place-items-center overflow-y-scroll py-12"
        style={{
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none', // IE and Edge
        }}
      >
        {menuItem &&
          menuItem.map((item: MenuItem, i: number) => (
            <MenuCard item={item} num={i} />
          ))}
      </div>
    </div>
  )
}
