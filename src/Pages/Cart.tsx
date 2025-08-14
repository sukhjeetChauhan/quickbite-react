import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
} from '../store/cartSlice'
import { selectCartTotal, selectOrderPost } from '../store/cartSelectors'
import { useState } from 'react'
import { message } from 'antd'
import { useAuth0 } from '@auth0/auth0-react'
import { useCreateOrder } from '../apis/order/orderQueries'
import { useNavigate } from 'react-router-dom'

export default function Cart() {
  const { user } = useAuth0()
  const [address, setAddress] = useState('')
  const cart = useSelector((state: RootState) => state.cart)
  const dispatch = useDispatch()
  const total = useSelector(selectCartTotal)
  const { mutate: createOrder } = useCreateOrder()
  const navigate = useNavigate()

  const orderPostData = useSelector((state: RootState) =>
    selectOrderPost(state, user?.sub as string)
  )

  function handleCartSubmit() {
    if (address !== '') {
      try {
        orderPostData.order.address = address
        if (orderPostData) createOrder(orderPostData)
        message.success('Order Successful')
        setAddress('')
        dispatch(clearCart())
        navigate('/')
      } catch (error) {
        message.error(String(error))
      }
    } else {
      message.error('Please provide an address')
    }
  }

  return (
    <div className="h-full w-full bg-orange-100 flex items-center justify-center">
      <div className="h-3/4 w-1/2 bg-white rounded-md flex items-center">
        <div className="w-1/2 h-full border-r-3 border-orange-200 flex flex-col items-center py-8 gap-6">
          <h3 className="text-2xl font-bold text-orange-500">Order Details</h3>
          {cart.items.length == 0 && (
            <p className="text-3xl text-gray-300 mt-24">Cart is empty</p>
          )}
          {cart.items.map((item, i) => (
            <div key={i} className="flex items-center justify-between gap-4">
              <p>{item.name}</p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => dispatch(decreaseQuantity(item.menuItemId))}
                  className="rounded-full p-2 bg-gray-200 hover:bg-gray-400 cursor-pointer text-lg"
                >
                  -
                </button>
                <p className="text-lg">{item.quantity}</p>
                <button
                  onClick={() => dispatch(increaseQuantity(item.menuItemId))}
                  className="rounded-full p-2 bg-gray-200 hover:bg-gray-400 cursor-pointer text-lg"
                >
                  +
                </button>
              </div>
            </div>
          ))}
          {cart.items?.length > 0 && (
            <div className="w-3/4 flex items-center justify-between">
              <p>Total Cart price:</p>
              <p>{`$  ${total}`}</p>
            </div>
          )}
        </div>
        <div className="w-1/2 h-full flex flex-col items-center justify-between p-8 gap-6">
          <input
            placeholder="Enter your address"
            className="w-full border-2 border-orange-400 rounded-md p-2 mt-10 text-center"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <button
            onClick={handleCartSubmit}
            className="bg-orange-500 text-white hover:bg-orange-600 w-full text-xl py-2 rounded cursor-pointer"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}
