// category types
export type Category = 'indian' | 'asian' | 'american' | 'mediterranean'

export type OrderStatus = string // e.g. 'pending'
export type PaymentStatus = string // e.g. 'unpaid'

// ---------- User ----------
export interface User {
  id: string // "auth0|..."
  firstName: string
  lastName: string
  email: string
  role: string // 'admin' (kept open for future roles)
  createdAt: string
  updatedAt: string
}

export interface CreateUserInput {
  firstName: string
  lastName: string
  email: string
  role: string
}

export type UpdateUserInput = Partial<CreateUserInput>

// ---------- MenuItem ----------
export interface MenuItem {
  id: number
  name: string
  description?: string
  imgurl: string | null
  price: string
  isAvailable: boolean
  category: Category
  dietType?: string // e.g. 'vegan'
}

export interface CreateMenuItemInput {
  name: string
  description?: string
  imgurl?: string | null
  price: number
  isAvailable: boolean
  category: Category
  dietType?: string
}

export type UpdateMenuItemInput = Partial<CreateMenuItemInput>

// ---------- Order (POST payload) ----------
export interface OrderItemInput {
  menuItemId: number
  quantity: number
  price: number // price per item at time of ordering
}

export interface OrderPostInput {
  order: {
    userId: string
    totalPrice: number
    address: string
    status: OrderStatus // e.g. 'pending'
    paymentStatus: PaymentStatus // e.g. 'unpaid'
  }
  items: OrderItemInput[]
}

// ---------- Order (GET /orders/:id shape) ----------
export interface OrderLineItem {
  name?: string //
  quantity: number
  price: number
}

export interface OrderDetail {
  id: number
  userId: string
  totalPrice: number
  address: string
  status: OrderStatus
  paymentStatus: PaymentStatus
  items: OrderLineItem[]
}
