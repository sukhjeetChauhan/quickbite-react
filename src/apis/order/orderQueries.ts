import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as orderApi from './orderApi'
import type { OrderPostInput } from '../../types/apiTypes'

export const useOrders = () =>
  useQuery({
    queryKey: ['orders'],
    queryFn: orderApi.getOrders,
  })

export const useOrder = (id: number) =>
  useQuery({
    queryKey: ['order', id],
    queryFn: () => orderApi.getOrderById(id),
    enabled: !!id,
  })

export const useCreateOrder = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: orderApi.createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
  })
}

export const useUpdateOrder = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<OrderPostInput> }) =>
      orderApi.updateOrder(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
  })
}

export const useDeleteOrder = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: orderApi.deleteOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
  })
}
