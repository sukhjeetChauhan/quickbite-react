// src/store/cartSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface CartItem {
  menuItemId: number
  name: string
  quantity: number
  price: number
}

interface CartState {
  items: CartItem[]
  address?: string
  paymentStatus?: 'unpaid' | 'paid'
  status?: 'pending' | 'in-progress' | 'completed'
}

const initialState: CartState = {
  items: [],
  address: '',
  paymentStatus: 'unpaid',
  status: 'pending',
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find(
        (i) => i.menuItemId === action.payload.menuItemId
      )
      if (existing) {
        existing.quantity += action.payload.quantity
      } else {
        state.items.push(action.payload)
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((i) => i.menuItemId !== action.payload)
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.menuItemId === action.payload)
      if (item) item.quantity += 1
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.menuItemId === action.payload)
      if (item) item.quantity = Math.max(1, item.quantity - 1)
    },
    clearCart: (state) => {
      state.items = []
      state.address = ''
      state.paymentStatus = 'unpaid'
      state.status = 'pending'
    },
    setCartAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload
    },
    setPaymentStatus: (state, action: PayloadAction<'unpaid' | 'paid'>) => {
      state.paymentStatus = action.payload
    },
    setStatus: (
      state,
      action: PayloadAction<'pending' | 'in-progress' | 'completed'>
    ) => {
      state.status = action.payload
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  setCartAddress,
  setPaymentStatus,
  setStatus,
} = cartSlice.actions

export default cartSlice.reducer
