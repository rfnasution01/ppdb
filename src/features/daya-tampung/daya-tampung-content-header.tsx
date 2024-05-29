import { Table } from '@/components/atoms/Table'
import { columnsListDayaTampung } from '@/libs/dummy/table'
import { capitalizeFirstLetterFromLowercase } from '@/libs/helpers/format-text'
import { DayaTampungType } from '@/libs/types'
import { useGetDayaTampungQuery } from '@/store/slices/dayaTampungAPI'
import dayjs from 'dayjs'
import { RefreshCcw, Search } from 'lucide-react'
import { useRef } from 'react'

export function DayaTampungContentHeader({
  onSearch,
  total,
  jenjang,
  kode,
  getDayaTampung,
  handleClick,
}: {
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
  total: number
  jenjang: string
  kode: string
  getDayaTampung: DayaTampungType
  handleClick: () => void
}) {
  const data = useGetDayaTampungQuery({ jenjang: jenjang, jalur: kode })
  const ref = useRef<HTMLDivElement>()

  return (
    <div className="flex items-center justify-between gap-32 rounded-lg bg-background p-24 text-[3rem] phones:flex-col phones:items-start phones:gap-16">
      <p>Total {total} Sekolah</p>
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
                {capitalizeFirstLetterFromLowercase(getDayaTampung?.judul)}
              </p>
              <p className="font-nunito">{getDayaTampung?.deskripsi}</p>
            </div>
            {/* --- Table ---  */}
            <div className="rounded-2xl border p-32">
              <Table
                data={getDayaTampung?.isi}
                columns={columnsListDayaTampung}
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
