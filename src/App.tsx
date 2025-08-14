import { Route, Routes } from 'react-router-dom'
import Base from './Pages/Base'
import Home from './Pages/Home'
import Cart from './Pages/Cart'
import './App.css'
import Admin from './Pages/Admin'
import ViewOrder from './Pages/ViewOrder'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Base />}>
        <Route index element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/menu" element={<Home />} />
        <Route path="/vieworder" element={<ViewOrder />} />

        <Route path="/admin" element={<Admin />} />
      </Route>
    </Routes>
  )
}
