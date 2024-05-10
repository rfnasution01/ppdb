import { Column } from '@/components/atoms/Table'

type ListLokasiType = {
  lokasi: string
  alamat: string
  telepon: string
}

export const columnsListLokasi: Column<ListLokasiType>[] = [
  { header: 'Lokasi', key: 'lokasi', width: '!min-w-[12rem]' },
  { header: 'Alamat', key: 'alamat', width: '!min-w-[12rem]' },
  { header: 'Telepon', key: 'telepon', width: '!min-w-[12rem]' },
]
