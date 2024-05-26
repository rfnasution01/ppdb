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
  BiodataPage,
  MainLayout,
  PendaftaranPage,
  ProfilPage,
  ComingSoonPage,
  VerifikasiPage,
  KotakMasukPage,
  GelombangPage,
  ValidasiPage,
  HubungiKamiPage,
} from './loadables'
import Cookies from 'js-cookie'
import DaptarAkun from '@/pages/daptar-akun'

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
        path: 'daftar',
        element: <DaptarPage />,
      },
      {
        path: 'daftar-akun',
        element: <DaptarAkun />,
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
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <BiodataPage />,
        children: [
          {
            path: '',
            element: <PendaftaranPage />,
          },
          {
            path: 'biodata',
            element: <ProfilPage />,
          },
        ],
      },
      {
        path: 'validasi',
        element: <ValidasiPage />,
      },
      {
        path: 'verifikasi-sekolah',
        element: <VerifikasiPage />,
      },
      {
        path: 'pengumuman',
        element: <ComingSoonPage />,
      },
      {
        path: 'daftar-ulang',
        element: <ComingSoonPage />,
      },
      {
        path: 'kotak-masuk',
        element: <KotakMasukPage />,
      },
      {
        path: 'jadwal',
        element: <GelombangPage />,
      },
      {
        path: 'hubungi-kami',
        element: <HubungiKamiPage />,
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
