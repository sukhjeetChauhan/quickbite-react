import { useEffect, useState } from 'react'
import { Menu } from '../Components/Menu'
import { Outlet, useNavigate } from 'react-router-dom'

export default function Admin() {
  const [menuPath, setMenuPath] = useState('orders')
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/admin/orders')
  }, [navigate])

  console.log(menuPath)

  return (
    <div className="w-full h-full bg-orange-100 flex flex-col">
      <Menu menu={'admin'} setCategory={setMenuPath} />
      <div className="w-full h-full rounded-md">
        <Outlet />
      </div>
    </div>
  )
}
