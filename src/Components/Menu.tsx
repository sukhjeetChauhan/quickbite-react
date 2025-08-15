import { useNavigate } from "react-router-dom"

type Menu = 'admin' | 'foodtype'
type MenuProps = {
  menu: Menu
  setCategory: React.Dispatch<React.SetStateAction<string>>
}

export function Menu({ menu,setCategory }: MenuProps) {
  const menuTypes = ['indian', 'asian', 'american', 'mediterranean']
  const adminMenu =['users','orders','stock']

  const arr = menu == 'admin'? adminMenu : menuTypes
  const navigate = useNavigate()

  return (
    <div className="flex gap-4 items-center justify-center h-20 w-1/2 mt-4">
      {arr.map((menuItem, i) => (
        <button
          onClick={() => {
            setCategory(menuItem)
          if(menu == 'admin'){
            navigate(`/admin/${menuItem}`)
          }
          }}
          key={i}
          className="rounded-full cursor-pointer text-orange-500 hover:text-orange-700 p-2 text-xl"
        >
          {menuItem.charAt(0).toUpperCase() + menuItem.slice(1)}
        </button>
      ))}
    </div>
  )
}
