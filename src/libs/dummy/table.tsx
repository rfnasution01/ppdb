import { Column } from '@/components/atoms/Table'

type ListLokasiType = {
  lokasi: string
  alamat: string
  telepon: string
  terendah: number
  tertinggi: number
  rata_rata: number
  npsn: string
  total: number
  gambar: string
  rentang: number
  jumlah: number
  kumulatif: number
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

export const columnsListDayaTampung: Column<ListLokasiType>[] = [
  {
    header: 'Sekolah',
    key: 'lokasi',
    width: '!w-[28rem]',
    renderCell: (rowData) => {
      return (
        <div className="flex items-center gap-8">
          <div className="flex items-center justify-center rounded-2xl bg-white p-8">
            <img src={rowData?.gambar} alt="Sekolah" className="w-[4rem]" />
          </div>
          <div className="flex flex-col gap-y-4">
            <p className="font-semibold">{rowData?.lokasi}</p>
            <p className="text-[1.8rem]">{rowData?.npsn}</p>
            <p className="text-[2rem]">{rowData?.alamat}</p>
          </div>
        </div>
      )
    },
  },
  {
    header: 'Total',
    key: 'total',
    width: '!w-[15%]',
    renderCell: (rowdata) => {
      return <div>{rowdata?.total} Siswa</div>
    },
  },
]

export const columnsListNun: Column<ListLokasiType>[] = [
  { header: 'Rentang', key: 'rentang', width: '!min-w-[12rem]' },
  { header: 'Jumlah', key: 'jumlah', width: '!min-w-[12rem]' },
  { header: 'Kumulatif', key: 'kumulatif', width: '!min-w-[12rem]' },
]
