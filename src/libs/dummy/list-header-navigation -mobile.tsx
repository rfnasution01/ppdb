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

export const ListHeaderNavigationMobile = [
  {
    judul: 'Beranda',
    icon: <LayoutPanelLeft size={16} />,
  },
  {
    judul: 'Aturan',
    icon: <BookText size={16} />,
  },
  {
    judul: 'Jadwal',
    icon: <CalendarCheck size={16} />,
  },
  {
    judul: 'Lokasi',
    icon: <Map size={16} />,
  },
  {
    judul: 'Alur',
    icon: <Activity size={16} />,
  },
  {
    judul: 'Daptar',
    icon: <Pencil size={16} />,
  },
  {
    judul: 'Seleksi',
    icon: <ArrowDown01 size={16} />,
  },
  {
    judul: 'Statistik',
    icon: <BarChart2 size={16} />,
  },
  {
    judul: 'Daya Tampung',
    icon: <Users2 size={16} />,
  },
]
