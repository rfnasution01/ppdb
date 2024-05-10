import { Table } from '@/components/atoms/Table'
import { DayaTampungContentHeader } from './daya-tampung-content-header'
import { ListLokasi } from '@/libs/dummy/list-lokasi'
import { columnsListDayaTampung } from '@/libs/dummy/table'

export function DayaTampungContent() {
  return (
    <div className="flex flex-col gap-24 rounded-lg border bg-white p-32 shadow-md">
      <DayaTampungContentHeader />
      <Table
        data={ListLokasi}
        columns={columnsListDayaTampung}
        containerClasses="w-full"
        loading={false}
        isStatistik
      />
    </div>
  )
}
