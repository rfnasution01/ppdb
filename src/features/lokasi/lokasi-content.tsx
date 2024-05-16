import { LokasiType } from '@/libs/types'
import { Table } from '@/components/atoms/Table'
import { columnsListLokasi } from '@/libs/dummy/table'
import { useState } from 'react'
import { Pagination } from '@/components/atoms/Pagination'
import { FormListDataPerPage } from '@/components/molecules/form'
import Loading from '@/components/atoms/Loading'
import { debounce } from 'lodash'

export default function LokasiContent({
  getLokasi,
  isLoading,
}: {
  getLokasi: LokasiType
  isLoading: boolean
}) {
  const [dataPerPage, setDataPerPage] = useState<number>(10)
  const [numberStart, setNumberStart] = useState<number>(0)
  const [search, setSearch] = useState<string>('')

  // --- Filter ---
  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setNumberStart(0)
    handleSearch(value)
  }

  const handleSearch = debounce((searchValue: string) => {
    setSearch(searchValue)
  }, 300)

  const filterData = (search: string) => {
    return getLokasi?.isi.filter((item) => {
      return (
        item.nama_sekolah.toLowerCase().includes(search.toLowerCase()) ||
        item.alamat.toLowerCase().includes(search.toLowerCase()) ||
        item.telepon.toLowerCase().includes(search.toLowerCase())
      )
    })
  }

  const filteredData = filterData(search)

  const maxPage = Math.ceil(filteredData?.length / dataPerPage)
  const pageNow = Math.ceil(numberStart / dataPerPage)

  return (
    <div
      className="flex flex-col rounded-2xl border bg-white p-32 shadow-md"
      style={{ lineHeight: '130%' }}
    >
      <div className="flex items-center justify-between gap-32 bg-black bg-opacity-10  p-24">
        <p className="text-[3rem] font-bold uppercase">kab. Batu Bara</p>
        <div className="flex w-1/3">
          <input
            type="text"
            className="h-1/2 w-full rounded-lg border border-gray-300 p-16 text-[2rem] focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 phones:w-full"
            placeholder="Search"
            onChange={(e) => onSearch(e)}
          />
        </div>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <Table
          data={filteredData?.slice(numberStart, numberStart + dataPerPage)}
          columns={columnsListLokasi}
          containerClasses="w-full"
          loading={isLoading}
          isLokasi
        />
      )}

      <div className="mt-32 flex items-center justify-end gap-32">
        {/* --- Data Per Page --- */}
        <FormListDataPerPage setDataPerPage={setDataPerPage} />
        {/* --- Pagination --- */}
        {getLokasi?.isi?.length > 0 && (
          <Pagination
            numberStart={numberStart}
            dataPerPage={dataPerPage}
            pageNow={pageNow}
            maxPage={maxPage}
            setNumberStart={setNumberStart}
          />
        )}
      </div>
    </div>
  )
}
