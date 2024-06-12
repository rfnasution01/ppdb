import { Column } from '@/components/atoms/Table'
import {
  DayaTampungIsi,
  JadwalIsiType,
  LokasiIsiType,
  PendaftarStatistik,
  PendaftarType,
} from '../types'
import { SeleksiType } from '../types/seleksi-type'

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

export const columnsListLokasi: Column<LokasiIsiType>[] = [
  { header: 'Lokasi', key: 'nama_sekolah', width: '!min-w-[12rem]' },
  { header: 'Alamat', key: 'alamat', width: '!min-w-[12rem]' },
  { header: 'Telepon', key: 'telepon', width: '!min-w-[12rem]' },
]

export const columnsListHubungiKami: Column<LokasiIsiType>[] = [
  { header: 'NPSN', key: 'npsn', width: '!min-w-[12rem]' },
  { header: 'Sekolah', key: 'nama_sekolah', width: '!min-w-[12rem]' },
  { header: 'Alamat', key: 'alamat', width: '!min-w-[12rem]' },
  { header: 'Telepon', key: 'telepon', width: '!min-w-[12rem]' },
]

export const columnsListStatistik: Column<PendaftarStatistik>[] = [
  { header: 'Nama Sekolah', key: 'nama_sekolah', width: '!min-w-[12rem]' },
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
          <p>{Math.round(Number(rowData?.terendah))}</p>
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
          <p>{Math.round(Number(rowData?.tertinggi))}</p>
        </div>
      )
    },
  },
  {
    header: 'Rata-rata',
    key: 'rata2',
    width: '!min-w-[12rem]',
    renderCell: (rowData) => {
      return (
        <div className="flex h-[4rem] items-center rounded-2xl border bg-background">
          <div
            className="h-full rounded-2xl bg-sky-500"
            style={{ width: `${rowData?.rata2}%` }}
          />
          <p>{Math.round(Number(rowData?.rata2))}</p>
        </div>
      )
    },
  },
]

export const columnsListDayaTampung: Column<DayaTampungIsi>[] = [
  {
    header: 'Sekolah',
    key: 'lokasi',
    width: '!w-[28rem]',
    renderCell: (rowData) => {
      return (
        <div className="flex items-center gap-8">
          <div className="flex items-center justify-center rounded-2xl bg-white p-8">
            <img src="/img/tutwuri.png" alt="Sekolah" className="w-[4rem]" />
          </div>
          <div className="flex flex-col gap-y-4">
            <p className="font-semibold">{rowData?.nama_sekolah}</p>
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
      return <div>{rowdata?.jumlah} Siswa</div>
    },
  },
]

export const columnsListPendaftar: Column<PendaftarType>[] = [
  {
    header: 'Nama',
    key: 'nama',
    width: '!w-[28rem]',
  },
  {
    header: 'No Peserta',
    key: 'nomor_peserta',
    width: '!w-[15%]',
  },
  {
    header: 'Asal Sekolah',
    key: 'asal_sekolah',
    width: '!w-[15%]',
  },
  {
    header: 'Skor',
    key: 'skor',
    width: '!w-[15%]',
  },
]

export const columnsListSeleksi: Column<SeleksiType>[] = [
  {
    header: 'Nama',
    key: 'nama',
    width: '!w-[28rem]',
  },
  {
    header: 'No Peserta',
    key: 'nomor_peserta',
    width: '!w-[15%]',
  },
  {
    header: 'NISN',
    key: 'nisn',
    width: '!w-[15%]',
  },
  {
    header: 'Asal Sekolah',
    key: 'asal_sekolah',
    width: '!w-[15%]',
  },
  {
    header: 'Skor',
    key: 'skor_lulus',
    width: '!w-[15%]',
  },
]

export const columnsListNun: Column<ListLokasiType>[] = [
  { header: 'Rentang', key: 'rentang', width: '!min-w-[12rem]' },
  { header: 'Jumlah', key: 'jumlah', width: '!min-w-[12rem]' },
  { header: 'Kumulatif', key: 'kumulatif', width: '!min-w-[12rem]' },
]

export const columnsListJadwal: Column<JadwalIsiType>[] = [
  { header: 'Kegiatan', key: 'kegiatan', width: '!min-w-[12rem]' },
  { header: 'lokasi', key: 'lokasi', width: '!min-w-[12rem]' },
  { header: 'tanggal', key: 'tanggal', width: '!min-w-[12rem]' },
  { header: 'waktu', key: 'waktu', width: '!min-w-[12rem]' },
]
