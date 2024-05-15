import {
  BookMarked,
  Mail,
  ShieldCheck,
  SquareGanttChart,
  User,
} from 'lucide-react'

export const ListAsideNavigationLogin = [
  {
    title: 'Biodata',
    icon: <User size={16} />,
  },
  {
    title: 'View',
    icon: <SquareGanttChart size={16} />,
  },
  {
    title: 'Verifikasi',
    icon: <ShieldCheck size={16} />,
  },
  {
    title: 'Pengumuman',
    icon: <Mail size={16} />,
  },
  {
    title: 'Daftar Ulang',
    icon: <BookMarked size={16} />,
  },
]
