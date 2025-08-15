import type { OrderPostInput } from '../../types/apiTypes'
import axiosInstance from '../axiosInstance'

export const getOrders = async () => {
  const { data } = await axiosInstance.get('/orders')
  return data
}

export const getOrderById = async (id: number) => {
  const { data } = await axiosInstance.get(`/orders/${id}`)
  return data
}

export const createOrder = async (payload: OrderPostInput) => {
  const { data } = await axiosInstance.post('/orders', payload)
  return data
}

export const updateOrder = async (
  id: number,
  payload: Partial<OrderPostInput['order']>
) => {
  const { data } = await axiosInstance.put(`/orders/${id}`, payload)
  return data
}

export const deleteOrder = async (id: number) => {
  const { data } = await axiosInstance.delete(`/orders/${id}`)
  return data
}
