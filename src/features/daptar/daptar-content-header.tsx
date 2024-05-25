import { useGetAkunQuery } from '@/store/slices/daptarAkunAPI'
import { debounce } from 'lodash'
import { RefreshCcw, Search } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

export function DaptarContentHeader({
  setNumberStart,
  setSearch,
  jenjang,
  kodeParams,
  idSekolah,
}: {
  setNumberStart: Dispatch<SetStateAction<number>>
  setSearch: Dispatch<SetStateAction<string>>
  jenjang: string
  kodeParams: string
  idSekolah: string
}) {
  // --- Filter ---
  const handleSearch = debounce((searchValue: string) => {
    setSearch(searchValue)
  }, 300)

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setNumberStart(0)
    handleSearch(value)
  }

  const handleClick = () => {
    const inputElement = document.querySelector(
      'input[type="text"]',
    ) as HTMLInputElement
    handleSearch(inputElement.value)
  }

  const data = useGetAkunQuery({
    jenjang: jenjang,
    jalur: kodeParams,
    id_sekolah: idSekolah,
  })

  return (
    <div className="flex items-center justify-between gap-32 rounded-lg bg-background p-24 text-[3rem]">
      <p>Data Pendaftar</p>
      <div className="flex items-center gap-16">
        <div className="flex">
          <input
            type="text"
            className="h-1/2 w-full rounded-lg border border-gray-300 p-16 text-[2rem] focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 phones:w-full"
            placeholder="Search"
            onChange={(e) => onSearch(e)}
          />
          <button
            className="bg-success px-12 text-white"
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
        <span
          onClick={data?.refetch}
          className="flex items-center justify-center rounded-lg border bg-white px-16 py-12 hover:cursor-pointer hover:bg-stone-300"
        >
          <RefreshCcw size={16} />
        </span>
      </div>
    </div>
  )
}
