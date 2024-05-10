import { Column } from '@/components/atoms/Table'

type ListLokasiType = {
  lokasi: string
  alamat: string
  telepon: string
  terendah: number
  tertinggi: number
  rata_rata: number
}

export const columnsListLokasi: Column<ListLokasiType>[] = [
  { header: 'Lokasi', key: 'lokasi', width: '!min-w-[12rem]' },
  { header: 'Alamat', key: 'alamat', width: '!min-w-[12rem]' },
  { header: 'Telepon', key: 'telepon', width: '!min-w-[12rem]' },
]

export const columnsListStatistik: Column<ListLokasiType>[] = [
  { header: 'Nama Sekolah', key: 'lokasi', width: '!min-w-[12rem]' },
  {
    header: 'Terendah',
    key: 'terendah',
    width: '!min-w-[12rem]',
    renderCell: (rowData) => {
      return (
        <div className="flex h-[4rem] items-center rounded-2xl border bg-background">
          <div
            className="h-full rounded-2xl bg-danger-tint-2"
            style={{ width: `${rowData?.terendah}%` }}
          />
          <p>{rowData?.terendah}</p>
        </div>
      )
    },
  },
  {
    header: 'Tertinggi',
    key: 'tertinggi',
    width: '!min-w-[12rem]',
    renderCell: (rowData) => {
      return (
        <div className="flex h-[4rem] items-center rounded-2xl border bg-background">
          <div
            className="h-full rounded-2xl bg-emerald-500"
            style={{ width: `${rowData?.tertinggi}%` }}
          />
          <p>{rowData?.tertinggi}</p>
        </div>
      )
    },
  },
  {
    header: 'Rata-rata',
    key: 'rata_rata',
    width: '!min-w-[12rem]',
    renderCell: (rowData) => {
      return (
        <div className="flex h-[4rem] items-center rounded-2xl border bg-background">
          <div
            className="h-full rounded-2xl bg-sky-500"
            style={{ width: `${rowData?.rata_rata}%` }}
          />
          <p>{rowData?.rata_rata}</p>
        </div>
      )
    },
  },
]
