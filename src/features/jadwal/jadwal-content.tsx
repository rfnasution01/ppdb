import { Table } from '@/components/atoms/Table'
import { Calendars } from './kalendar'
import { ListJadwal } from '@/libs/dummy/list-jadwal'
import { columnsListJadwal } from '@/libs/dummy/table'

export function JadwalContent() {
  return (
    <div className="grid grid-cols-12 gap-32">
      <div className="col-span-8 rounded-2xl bg-white p-24 text-[24rem] phones:col-span-12">
        <Table
          data={ListJadwal}
          columns={columnsListJadwal}
          containerClasses="w-full"
          loading={false}
        />
      </div>
      <div className="col-span-4 phones:col-span-12">
        <Calendars />
      </div>
    </div>
  )
}
