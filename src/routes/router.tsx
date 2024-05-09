import { createBrowserRouter } from 'react-router-dom'
import {
  AlurPage,
  ArsipPage,
  AturanPage,
  BerandaPage,
  BeritaPage,
  DaptarPage,
  DayaTampungPage,
  HomePage,
  LokasiPage,
  NUNPage,
  NotFoundPage,
  PesanPage,
  RootLayout,
  SMSPage,
  SeleksiPage,
  JadwalPage,
  StatistikPage,
} from './loadables'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'beranda',
        element: <BerandaPage />,
      },
      {
        path: 'aturan',
        element: <AturanPage />,
      },
      {
        path: 'jadwal',
        element: <JadwalPage />,
      },
      {
        path: 'lokasi',
        element: <LokasiPage />,
      },
      {
        path: 'alur',
        element: <AlurPage />,
      },
      {
        path: 'daptar',
        element: <DaptarPage />,
      },
      {
        path: 'seleksi',
        element: <SeleksiPage />,
      },
      {
        path: 'statistik',
        element: <StatistikPage />,
      },
      {
        path: 'daya-tampung',
        element: <DayaTampungPage />,
      },
      {
        path: 'nun',
        element: <NUNPage />,
      },
      {
        path: 'arsip',
        element: <ArsipPage />,
      },
      {
        path: 'berita',
        element: <BeritaPage />,
      },
      {
        path: 'pesan',
        element: <PesanPage />,
      },
      {
        path: 'sms',
        element: <SMSPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
