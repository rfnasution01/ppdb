import {
  Activity,
  ArrowDown01,
  BarChart2,
  BookText,
  CalendarCheck,
  LayoutPanelLeft,
  Map,
  Pencil,
  Users2,
} from 'lucide-react'

export const ListHeaderNavigation = [
  {
    judul: 'Beranda',
    icon: <LayoutPanelLeft size={32} />,
  },
  {
    judul: 'Aturan',
    icon: <BookText size={32} />,
  },
  {
    judul: 'Jadwal',
    icon: <CalendarCheck size={32} />,
  },
  {
    judul: 'Lokasi',
    icon: <Map size={32} />,
  },
  {
    judul: 'Alur',
    icon: <Activity size={32} />,
  },
  {
    judul: 'Daftar',
    icon: <Pencil size={24} />,
  },
  {
    judul: 'Seleksi',
    icon: <ArrowDown01 size={32} />,
  },
  {
    judul: 'Statistik',
    icon: <BarChart2 size={32} />,
  },
  {
    judul: 'Daya Tampung',
    icon: <Users2 size={32} />,
  },
]
