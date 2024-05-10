import { Table } from '@/components/atoms/Table'
import { ListLokasi } from '@/libs/dummy/list-lokasi'
import { columnsListNun } from '@/libs/dummy/table'

export function NunContent() {
  return (
    <div className="flex flex-col gap-24 rounded-lg border bg-white p-32 shadow-md">
      <div className="text-[2..4 rem] flex items-center justify-between gap-32 rounded-lg bg-background p-24">
        <p>
          Sebaran Nilai Hasil Ujian Nasional SD/MI Kab. Deli Serdang Tahun 2024
        </p>
      </div>
      <div className="flex gap-32">
        <Table
          data={ListLokasi}
          columns={columnsListNun}
          containerClasses="w-full flex-1"
          loading={false}
        />
        <Table
          data={ListLokasi}
          columns={columnsListNun}
          containerClasses="w-full flex-1"
          loading={false}
        />
      </div>
    </div>
  )
}
