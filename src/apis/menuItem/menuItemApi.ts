import type { CreateMenuItemInput, UpdateMenuItemInput } from '../../types/apiTypes'
import axiosInstance from '../axiosInstance'

export const getMenuItems = async () => {
  const { data } = await axiosInstance.get('/menu-items')
  return data
}

export const getMenuItemById = async (id: number) => {
  const { data } = await axiosInstance.get(`/menu-items/${id}`)
  return data
}

export const getMenuItemsByCategory = async (category: string) => {
  const { data } = await axiosInstance.get(`/menu-items/category/${category}`)
  return data
}

export const createMenuItem = async (payload: CreateMenuItemInput ) => {
  const { data } = await axiosInstance.post('/menu-items', payload)
  return data
}

export const updateMenuItem = async (id: number, payload: UpdateMenuItemInput) => {
  const { data } = await axiosInstance.put(`/menu-items/${id}`, payload)
  return data
}

export const deleteMenuItem = async (id: number) => {
  const { data } = await axiosInstance.delete(`/menu-items/${id}`)
  return data
}
