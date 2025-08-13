import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as userApi from './userApi'
import type { UpdateUserInput } from '../../types/apiTypes'

export const useUsers = () =>
  useQuery({
    queryKey: ['users'],
    queryFn: userApi.getUsers,
  })

export const useUser = (id: string) =>
  useQuery({
    queryKey: ['user', id],
    queryFn: () => userApi.getUserById(id),
    enabled: !!id,
  })

export const useCreateUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: userApi.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserInput }) =>
      userApi.updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: userApi.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}
