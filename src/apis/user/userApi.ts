import type { CreateUserInput, UpdateUserInput } from '../../types/apiTypes'
import axiosInstance from '../axiosInstance'

export const getUsers = async () => {
  const { data } = await axiosInstance.get('/users')
  return data
}

export const getUserById = async (id: string) => {
  const { data } = await axiosInstance.get(`/users/${id}`)
  return data
}

export const createUser = async (payload: CreateUserInput) => {
  const { data } = await axiosInstance.post('/users', payload)
  return data
}

export const updateUser = async (id: string, payload: UpdateUserInput) => {
  const { data } = await axiosInstance.put(`/users/${id}`, payload)
  return data
}

export const deleteUser = async (id: string) => {
  const { data } = await axiosInstance.delete(`/users/${id}`)
  return data
}
