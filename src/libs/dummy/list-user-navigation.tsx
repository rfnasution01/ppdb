import {
  CalendarClock,
  HelpCircle,
  Layout,
  Phone,
  Scroll,
  ShieldCheck,
  ShieldEllipsis,
  Speech,
} from 'lucide-react'

export const ListUserNavigation = [
  {
    title: 'Beranda',
    icon: <Layout size={16} />,
  },
  {
    title: 'Jadwal PPDB',
    icon: <CalendarClock size={16} />,
  },
  {
    title: 'Status Pendaftaran',
    icon: <ShieldEllipsis size={16} />,
  },
  {
    title: 'Verifikasi Sekolah',
    icon: <ShieldCheck size={16} />,
  },
  {
    title: 'Pengumuman',
    icon: <Speech size={16} />,
  },
  {
    title: 'Daftar Ulang',
    icon: <Scroll size={16} />,
  },
  {
    title: 'Pertanyaan',
    icon: <HelpCircle size={16} />,
  },
  {
    title: 'Hubungi Kami',
    icon: <Phone size={16} />,
  },
]
