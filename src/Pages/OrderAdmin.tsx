import type { ChangeEvent } from 'react'

import { useOrders, useUpdateOrder } from '../apis/order/orderQueries'
import type { OrderPostInput } from '../types/apiTypes'

type OrderWithId = OrderPostInput['order'] & { id: number }

export default function OrderAdmin() {
  const { data: orders, isLoading, isError } = useOrders()
  const { mutate: updateOrderStatus } = useUpdateOrder()

  function handleChange(e: ChangeEvent<HTMLSelectElement>, id: number) {
    updateOrderStatus({
      id: id,
      data: { status: e.target.value },
    })
  }

  console.log(orders)

  if (isLoading)
    return (
      <div className="h-full w-full flex items-center justify-center">
        <p className="text-2xl font-bold text-orange-500">Loading....</p>
      </div>
    )

  if (isError)
    return (
      <div className="h-full w-full flex items-center justify-center">
        <p className="text-2xl font-bold text-orange-500">Error Loading Data</p>
      </div>
    )
  return (
    <div className="w-full mt-8 h-full flex justify-center">
      <div className="w-4/5">
        <ul className="">
          {orders.map((data: OrderWithId, index: number) => (
            <li key={index} className="py-[5px] border-b-2 border-orange-300">
              <div className="flex justify-between items-center px-4">
                <span className="flex-1 text-center text-base lg:text-lg border-r-2 border-orange-300 py-2">
                  {data.address}
                </span>
                <span className="flex-1 text-center text-base lg:text-lg border-r-2 border-orange-300 py-2">
                  {data.userId}
                </span>
                <span className="flex-1 text-center text-base lg:text-lg border-r-2 border-orange-300 py-2">
                  {data.totalPrice}
                </span>
                <select
                  value={data.status}
                  onChange={(e) => handleChange(e, data.id)}
                  className={`flex-1 text-center text-base lg:text-lg border-r-2 border-orange-300 py-2 appearance-none outline-none cursor-pointer
    ${
      data.status === 'pending'
        ? 'text-yellow-400'
        : data.status === 'preparing'
        ? 'text-orange-500'
        : data.status === 'completed'
        ? 'text-green-500'
        : data.status === 'cancelled'
        ? 'text-red-500'
        : ''
    }`}
                >
                  <option value="pending" className="text-yellow-400">
                    Pending
                  </option>
                  <option value="preparing" className="text-orange-500">
                    Preparing
                  </option>
                  <option value="completed" className="text-green-500">
                    Completed
                  </option>
                  <option value="cancelled" className="text-red-500">
                    Cancelled
                  </option>
                </select>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
