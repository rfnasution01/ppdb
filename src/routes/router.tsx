import { createBrowserRouter, redirect } from 'react-router-dom'
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
  LoginPage,
  UserLayout,
  BiodataPage,
} from './loadables'
import Cookies from 'js-cookie'

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
        path: 'sebaran-nun',
        element: <NUNPage />,
      },
      {
        path: 'arsip-tahun-lalu',
        element: <ArsipPage />,
      },
      {
        path: 'berita',
        element: <BeritaPage />,
      },
      {
        path: 'pesan-anda',
        element: <PesanPage />,
      },
      {
        path: 'sms',
        element: <SMSPage />,
      },
    ],
  },
  {
    path: 'main',
    loader: async () => {
      const jwtPayload = Cookies.get('token')

      if (!jwtPayload) {
        return redirect('/login')
      }

      return null
    },
    element: <UserLayout />,
    children: [
      {
        path: '',
        element: <BiodataPage />,
      },
    ],
  },
  {
    path: 'login',
    loader: async () => {
      const jwtPayload = Cookies.get('token')

      if (jwtPayload) {
        return redirect('/main')
      }

      return null
    },
    element: <LoginPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
