import { NoData } from '@/components/atoms/NoData'
import { Pagination } from '@/components/atoms/Pagination'
import { Table } from '@/components/atoms/Table'
import { FormListDataPerPage } from '@/components/molecules/form'
import { columnsListPendaftar } from '@/libs/dummy/table'
import { PendaftarType } from '@/libs/types'
import { Dispatch, SetStateAction, useState } from 'react'

export function MappingPendaftar({
  pendaftar,
  isLoading,
  search,
  numberStart,
  setNumberStart,
}: {
  pendaftar: PendaftarType[]
  isLoading: boolean
  search: string
  numberStart: number
  setNumberStart: Dispatch<SetStateAction<number>>
}) {
  const [dataPerPage, setDataPerPage] = useState<number>(10)

  const filterData = (search: string) => {
    return pendaftar.filter((item) => {
      return (
        item?.asal_sekolah?.toLowerCase().includes(search?.toLowerCase()) ||
        item?.nama?.toLowerCase().includes(search?.toLowerCase()) ||
        item?.nomor_peserta?.toLowerCase().includes(search?.toLowerCase())
      )
    })
  }

  const filteredData = filterData(search)

  const maxPage = Math.ceil(filteredData?.length / dataPerPage)
  const pageNow = Math.ceil(numberStart / dataPerPage)

  return (
    <div className="flex h-full w-full">
      {pendaftar?.length === 0 ? (
        <NoData />
      ) : (
        <div className="flex w-full flex-col gap-32">
          <Table
            data={filteredData?.slice(numberStart, numberStart + dataPerPage)}
            columns={columnsListPendaftar}
            containerClasses="w-full"
            loading={isLoading}
          />
          <div className="flex items-center justify-end gap-32">
            {/* --- Data Per Page --- */}
            <FormListDataPerPage setDataPerPage={setDataPerPage} />
            {/* --- Pagination --- */}
            {pendaftar?.length > 0 && (
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
      )}
    </div>
  )
}
