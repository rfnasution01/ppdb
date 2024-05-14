import { Table } from '@/components/atoms/Table'
import { Calendars } from './kalendar'
import { columnsListJadwal } from '@/libs/dummy/table'
import { JadwalType } from '@/libs/types'
import Loading from '@/components/atoms/Loading'

export function JadwalContent({
  getJadwal,
  isLoading,
}: {
  getJadwal: JadwalType
  isLoading: boolean
}) {
  return (
    <div className="grid grid-cols-12 gap-32">
      <div className="col-span-8 phones:col-span-12">
        <div className="flex rounded-2xl bg-white p-24 text-[24rem] ">
          {isLoading ? (
            <Loading />
          ) : (
            <Table
              data={getJadwal?.isi}
              columns={columnsListJadwal}
              containerClasses="w-full"
              loading={false}
            />
          )}
        </div>
      </div>
      <div className="col-span-4 phones:col-span-12">
        <Calendars />
      </div>
    </div>
  )
}
