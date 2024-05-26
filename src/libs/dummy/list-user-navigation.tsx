import {
  CalendarClock,
  Layout,
  Mail,
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
    title: 'Jadwal',
    icon: <CalendarClock size={16} />,
  },
  {
    title: 'Validasi',
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
    title: 'Kotak Masuk',
    icon: <Mail size={16} />,
  },
  {
    title: 'Hubungi Kami',
    icon: <Phone size={16} />,
  },
]
