import { Table } from '@/components/atoms/Table'
import { DayaTampungContentHeader } from './daya-tampung-content-header'
import { columnsListDayaTampung } from '@/libs/dummy/table'
import { DayaTampungType } from '@/libs/types'
import { useState } from 'react'
import { debounce } from 'lodash'
import Loading from '@/components/atoms/Loading'
import { FormListDataPerPage } from '@/components/molecules/form'
import { Pagination } from '@/components/atoms/Pagination'

export function DayaTampungContent({
  getDayaTampung,
  isLoading,
  jenjang,
  kode,
}: {
  getDayaTampung: DayaTampungType
  isLoading: boolean
  jenjang: string
  kode: string
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
    return getDayaTampung?.isi.filter((item) => {
      return (
        item.nama_sekolah.toLowerCase().includes(search.toLowerCase()) ||
        item.alamat.toLowerCase().includes(search.toLowerCase()) ||
        item.npsn.toLowerCase().includes(search.toLowerCase())
      )
    })
  }

  const filteredData = filterData(search)

  const maxPage = Math.ceil(filteredData?.length / dataPerPage)
  const pageNow = Math.ceil(numberStart / dataPerPage)

  return (
    <div className="flex flex-col gap-24 rounded-lg border bg-white p-32 shadow-md">
      <DayaTampungContentHeader
        total={getDayaTampung?.isi?.length}
        onSearch={onSearch}
      />

      {isLoading ? (
        <Loading />
      ) : (
        <Table
          data={filteredData?.slice(numberStart, numberStart + dataPerPage)}
          columns={columnsListDayaTampung}
          containerClasses="w-full"
          loading={isLoading}
          isDayaTampung
          jenjang={jenjang}
          kode={kode}
        />
      )}

      <div className="flex items-center justify-end gap-32">
        {/* --- Data Per Page --- */}
        <FormListDataPerPage setDataPerPage={setDataPerPage} />
        {/* --- Pagination --- */}
        {getDayaTampung?.isi?.length > 0 && (
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
