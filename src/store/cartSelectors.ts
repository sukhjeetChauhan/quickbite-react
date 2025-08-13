import type { RootState } from './store'

export const selectCartItems = (state: RootState) => state.cart.items

export const selectCartTotal = (state: RootState) =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

export const selectCartDetails = (state: RootState) => ({
  items: state.cart.items,
  total: selectCartTotal(state),
  address: state.cart.address,
  paymentStatus: state.cart.paymentStatus,
  status: state.cart.status,
})

// export const selectOrderPost = (state: RootState): OrderPost => ({
//   order: {
//     userId: state.user.id, // assuming you store app-specific user id in Redux
//     totalPrice: state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
//     address: state.cart.address || '',
//     status: state.cart.status || 'pending',
//     paymentStatus: state.cart.paymentStatus || 'unpaid',
//   },
//   items: state.cart.items.map(item => ({
//     menuItemId: item.menuItemId,
//     quantity: item.quantity,
//     price: item.price,
//   })),
// });
