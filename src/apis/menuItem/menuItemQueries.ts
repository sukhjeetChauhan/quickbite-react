import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as menuItemApi from './menuItemApi'
import type { UpdateMenuItemInput } from '../../types/apiTypes'

export const useMenuItems = () =>
  useQuery({
    queryKey: ['menuItems'],
    queryFn: menuItemApi.getMenuItems,
  })

export const useMenuItem = (id: number) =>
  useQuery({
    queryKey: ['menuItem', id],
    queryFn: () => menuItemApi.getMenuItemById(id),
    enabled: !!id,
  })

export const useMenuItemsByCategory = (category: string) =>
  useQuery({
    queryKey: ['menuItems', category],
    queryFn: () => menuItemApi.getMenuItemsByCategory(category),
    enabled: !!category,
  })

export const useCreateMenuItem = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: menuItemApi.createMenuItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItems'] })
    },
  })
}

export const useUpdateMenuItem = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateMenuItemInput }) =>
      menuItemApi.updateMenuItem(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItems'] })
    },
  })
}

export const useDeleteMenuItem = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: menuItemApi.deleteMenuItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItems'] })
    },
  })
}
