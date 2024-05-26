import { Table } from '@/components/atoms/Table'
import { columnsListStatistik } from '@/libs/dummy/table'
import { capitalizeFirstLetterFromLowercase } from '@/libs/helpers/format-text'
import { PendaftarStatistik, StatistikType } from '@/libs/types'
import { useGetStatistikQuery } from '@/store/slices/statistikAPI'
import dayjs from 'dayjs'
import { debounce } from 'lodash'
import { Printer, RefreshCcw, Search } from 'lucide-react'
import { Dispatch, SetStateAction, useRef } from 'react'
import ReactToPrint from 'react-to-print'

export function StatistiksContentHeader({
  setNumberStart,
  setSearch,
  jenjang,
  getStatistik,
  pendaftar,
  kode,
}: {
  setNumberStart: Dispatch<SetStateAction<number>>
  setSearch: Dispatch<SetStateAction<string>>
  jenjang: string
  getStatistik: StatistikType
  pendaftar: PendaftarStatistik[]
  kode: string
}) {
  const data = useGetStatistikQuery({ jenjang: jenjang, jalur: kode })
  const ref = useRef<HTMLDivElement>()

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

  return (
    <div className="flex items-center justify-between gap-32 rounded-lg bg-background p-24 text-[3rem] phones:flex-col phones:items-start phones:gap-16">
      <p>{getStatistik?.judul} Periode 2024/2025</p>
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

        <ReactToPrint
          bodyClass="print-agreement"
          content={() => ref.current}
          trigger={() => (
            <span className="flex items-center justify-center rounded-lg border bg-white px-16 py-12 hover:cursor-pointer hover:bg-stone-300">
              <Printer size={16} />
            </span>
          )}
        />
      </div>
      <section
        className="absolute left-[-10000px] top-auto h-auto overflow-hidden"
        aria-hidden
        tabIndex={-1}
      >
        <div ref={ref}>
          <div className="flex flex-col gap-32 p-32">
            {/* --- Header --- */}
            <div className="flex items-center justify-between">
              <p>{dayjs().locale('id').format('DD/MM/YYYY hh:mm A')}</p>
              <p>SIAP PPDB Online | Kab. Batu Bara</p>
            </div>
            {/* --- Logo --- */}
            <div className="flex flex-col items-center justify-center gap-24">
              <img src="/img/tutwuri.png" alt="PPDB" className="w-[15rem]" />
              <p className="text-[5rem] font-bold uppercase">KAB. Batu bara</p>
            </div>
            {/* --- Content Header --- */}
            <div className="flex flex-col gap-16 rounded-2xl border p-32">
              <p className="text-[3.6rem]">
                {capitalizeFirstLetterFromLowercase(getStatistik?.judul)}
              </p>
              <p className="font-nunito">{getStatistik?.deskripsi}</p>
            </div>
            {/* --- Table ---  */}
            <div className="rounded-2xl border p-32">
              <Table
                data={pendaftar}
                columns={columnsListStatistik}
                containerClasses="w-full"
                isDayaTampung
                jenjang={jenjang}
                kode={kode}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
