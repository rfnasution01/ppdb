import { setStateSearch } from '@/store/reducer/stateSearch'
import { debounce } from 'lodash'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux'

export function Searching({ width = 'w-full' }: { width?: string }) {
  const dispatch = useDispatch()

  const handleSearch = debounce((searchValue: string) => {
    dispatch(setStateSearch({ find: searchValue }))
  }, 300)

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    handleSearch(value)
  }

  const handleClick = () => {
    const inputElement = document.querySelector(
      'input[type="text"]',
    ) as HTMLInputElement
    handleSearch(inputElement.value)
  }

  return (
    <div className="flex w-full">
      <input
        type="text"
        className={`${width} rounded-l-full border border-gray-300 px-24 py-16 text-[2.8rem] transition duration-150 focus:border-indigo-500 focus:shadow-2xl focus:outline-none focus:ring-indigo-500 phones:w-full phones:text-[2rem]`}
        placeholder="Search"
        style={{
          borderTopLeftRadius: '1rem',
          borderBottomLeftRadius: '1rem',
        }}
        onChange={(e) => onSearch(e)}
      />
      <button
        className="bg-success p-16 text-white"
        type="button"
        style={{
          borderTopRightRadius: '1rem',
          borderBottomRightRadius: '1rem',
        }}
        onClick={() => handleClick()}
      >
        <Search size={20} />
      </button>
    </div>
  )
}
