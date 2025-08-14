import { useNavigate } from 'react-router-dom'

export default function Navigation() {
  const customerMenu = ['Home', 'Menu', 'View Order']
  const adminMenu = ['Admin']
  const pathObj: Record<'home' | 'menu' | 'vieworder' | 'admin', string> = {
    home: '/',
    menu: '/menu',
    vieworder: '/vieworder',
    admin: '/admin'
  }

  const navigate = useNavigate()

  return (
    <div className="w-3/5 h-20 flex items-center justify-center">
      <div className="flex items-center gap-4">
        {customerMenu.map((menuItem, i) => (
          <button
            key={i}
            onClick={() => navigate(`${pathObj[menuItem.toLowerCase().replace(/\s/g, '') as keyof typeof pathObj]}`)}
            className="rounded-full hover:bg-orange-500 border-2 border-orange-500 cursor-pointer text-orange-500 hover:text-white p-2"
          >
            {menuItem}
          </button>
        ))}
        {adminMenu.map((menuItem, i) => (
          <button
            key={i}
            onClick={() => navigate(`/${menuItem.toLowerCase()}`)}
            className="rounded-full hover:bg-orange-500 border-2 border-orange-500 cursor-pointer text-orange-500 hover:text-white p-2"
          >
            {menuItem}
          </button>
        ))}
      </div>
    </div>
  )
}
