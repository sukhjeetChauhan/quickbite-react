import type { MenuItem } from '../types/apiTypes'

interface menuCardProp {
  item: MenuItem
  num: number
}

export default function MenuCard({ item, num }: menuCardProp) {
  return (
    <div
      key={num}
      className="flex flex-col rounded h-72 bg-gray-200 w-5/8 items-center justify-between"
    >
      <div className="w-full h-3/4 flex flex-col items-center justify-center">
        <p className="text-lg font-semibold">{item.name}</p>
        <p className="text-base p-4">{item.description}</p>
        <div className="w-full flex items-center justify-between p-4">
          <p className="font-semibold text-lg">{`$ ${item.price}`}</p>
          <div
            className={`${
              item.isAvailable ? 'bg-green-500' : 'bg-red-400'
            } rounded-full py-2 px-4 flex items-center justify-center`}
          >
            <p>{item.isAvailable ? 'Available' : 'Not Available'}</p>
          </div>
        </div>
      </div>
      <div className="w-full h-1/4 p-2">
        <button
          onClick={() => setOpenModel(true)}
          className="bg-orange-500 text-white hover:bg-orange-600 w-full h-full rounded cursor-pointer"
        >
          Add Item
        </button>
      </div>
    </div>
  )
}
