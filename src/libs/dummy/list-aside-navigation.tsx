import {
  Home,
  Mail,
  MessageCircleMore,
  Newspaper,
  PieChart,
  Scroll,
} from 'lucide-react'

export const ListAsideNavigation = [
  {
    title: 'Beranda',
    icon: <Home size={16} />,
  },
  {
    title: 'Sebaran NUN',
    icon: <PieChart size={16} />,
  },
  {
    title: 'Arsip Tahun Lalu',
    icon: <Scroll size={16} />,
  },
  {
    title: 'Berita',
    icon: <Newspaper size={16} />,
  },
  {
    title: 'Pesan Anda',
    icon: <Mail size={16} />,
  },
  {
    title: 'SMS',
    icon: <MessageCircleMore size={16} />,
  },
]
