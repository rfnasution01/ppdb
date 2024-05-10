import { Table } from '@/components/atoms/Table'
import { ListLokasi } from '@/libs/dummy/list-lokasi'
import { columnsListLokasi } from '@/libs/dummy/table'

export function LokasiTable() {
  return (
    <Table
      data={ListLokasi}
      columns={columnsListLokasi}
      containerClasses="w-full"
      loading={false}
    />
  )
}
