export default function Navigation() {
  const customerMenu = ['Home', 'Menu', 'View Order']
  const adminMenu = ['Admin']

  return (
    <div className="w-3/5 h-20 flex items-center justify-center">
      <div className="flex items-center gap-4">
        {customerMenu.map((menuItem, i) => (
          <button
            key={i}
            className="rounded-full hover:bg-orange-500 border-2 border-orange-500 cursor-pointer text-orange-500 hover:text-white p-2"
          >
            {menuItem}
          </button>
        ))}
        {adminMenu.map((menuItem, i) => (
          <button
            key={i}
            className="rounded-full hover:bg-orange-500 border-2 border-orange-500 cursor-pointer text-orange-500 hover:text-white p-2"
          >
            {menuItem}
          </button>
        ))}
      </div>
    </div>
  )
}
