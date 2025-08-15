import { useState } from 'react'
import { useMenuItemsByCategory } from '../apis/menuItem/menuItemQueries'
import { Menu } from '../Components/Menu'
import type { MenuItem } from '../types/apiTypes'
import MenuCard from './MenuCard'
import Modal from '../Components/Modal'
import CloseModalButton from '../Components/CloseModalButton'
import { useDispatch } from 'react-redux'
import { addToCart, type CartItem } from '../store/cartSlice'
import { message } from 'antd'

export default function Home() {
  const dispatch = useDispatch()

  const [showModal, setShowModal] = useState(false)
  const [addItem, setAddItem] = useState<MenuItem>()
  const [quantity, setQuantity] = useState<number>(1)
  const [category, setCategory] = useState<string>('indian')

  const {
    data: menuItem,
    isLoading,
    isError,
  } = useMenuItemsByCategory(category)

  function addItemToCart() {
    if (addItem && quantity > 0) {
      const payload: CartItem = {
        menuItemId: addItem.id,
        name: addItem.name,
        price: Number(addItem.price),
        quantity: quantity,
      }

      dispatch(addToCart(payload))
      message.success('Item added to Cart')

      // Reset modal and quantity
      setShowModal(false)
      setQuantity(1)
      setAddItem(undefined)
    }
  }

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
          <div className="h-2/3 w-1/3 bg-white rounded flex flex-col items-center justify-center gap-4 relative p-4">
            <p className="text-2xl font-bold p-4 border-b-2 border-gray-300">
              {addItem?.name}
            </p>
            <p className="text-xl font-semibold">Choose quantity</p>
            <div className="flex  items-center gap-4">
              <button
                onClick={() =>
                  setQuantity((prev) => (prev && prev > 1 ? prev - 1 : 1))
                }
                className="rounded-full p-2 bg-gray-200 hover:bg-gray-400 cursor-pointer text-lg"
              >
                -
              </button>
              <p className="text-lg">{quantity}</p>
              <button
                onClick={() => setQuantity((prev) => (prev ?? 0) + 1)}
                className="rounded-full p-2 bg-gray-200 hover:bg-gray-400 cursor-pointer text-lg"
              >
                +
              </button>
            </div>
            <button
              onClick={addItemToCart}
              className="w-full py-2 px-4 bg-orange-500 text-white font-semibold text-xl rounded cursor-pointer mt-10"
            >
              Confirm
            </button>
            <CloseModalButton CloseFunction={() => setShowModal(false)} />
          </div>
        </Modal>
      )}

      <Menu menu={'foodtype'} setCategory={setCategory} />

      <div
        className="h-full w-5/6 grid grid-cols-3 gap-y-12 place-items-center overflow-y-scroll py-12"
        style={{
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none', // IE and Edge
        }}
      >
        {menuItem &&
          menuItem.map((item: MenuItem, i: number) => (
            <MenuCard
              item={item}
              key={i}
              setAddItem={setAddItem}
              setShowModal={setShowModal}
            />
          ))}
      </div>
    </div>
  )
}
