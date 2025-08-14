type MenuProps = {
  setCategory: React.Dispatch<React.SetStateAction<string>>
}

export function Menu({ setCategory }: MenuProps) {
  const menuTypes = ['indian', 'asian', 'american', 'mediterranean']

  return (
    <div className="flex gap-4 items-center justify-center h-20 w-1/2 mt-4">
      {menuTypes.map((menuItem, i) => (
        <button
          onClick={() => setCategory(menuItem)}
          key={i}
          className="rounded-full cursor-pointer text-orange-500 hover:text-orange-700 p-2 text-xl"
        >
          {menuItem.charAt(0).toUpperCase() + menuItem.slice(1)}
        </button>
      ))}
    </div>
  )
}
