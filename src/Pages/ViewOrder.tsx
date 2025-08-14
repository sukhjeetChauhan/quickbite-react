import { useOrders } from '../apis/order/orderQueries'

export default function ViewOrder() {
  const { data: orders, isLoading, isError } = useOrders()

  console.log(orders)

  return (
    <div className="w-full h-full bg-orange-100 flex flex-col items-center justify-center gap-4">
      {orders?.map((order) => (
        <div
          key={order.id}
          className="w-3/4 h-20 rounded-md bg-yellow-400 flex items-center justify-between p-4"
        >
          <p>{order.id}</p>
          <p>{order.userId}</p>
          <p>{order.address}</p>
        </div>
      ))}
    </div>
  )
}
