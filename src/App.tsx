import { Route, Routes } from 'react-router-dom'
import Base from './Pages/Base'
import Home from './Pages/Home'
import './App.css'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Base />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  )
}
