import { Table } from '@/components/atoms/Table'
import { ListLokasi } from '@/libs/dummy/list-lokasi'
import { columnsListStatistik } from '@/libs/dummy/table'

export function StatistikTable() {
  return (
    <Table
      data={ListLokasi}
      columns={columnsListStatistik}
      containerClasses="w-full"
      loading={false}
      isStatistik
    />
  )
}
