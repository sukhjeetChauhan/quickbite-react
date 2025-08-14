import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'

export default function Cart() {
  const cart = useSelector((state: RootState) => state.cart)

  console.log(cart)
  return <h1>this is cart</h1>
}
