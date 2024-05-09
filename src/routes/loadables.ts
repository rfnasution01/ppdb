import loadable from '@loadable/component'

// ------------------
// ----- Layouts -----
// ------------------

export const RootLayout = loadable(() => import('@/layouts/root-layout'))

// ------------------
// ----- Pages -----
// ------------------

export const NotFoundPage = loadable(() => import('@/pages/not-found'))
export const ComingSoonPage = loadable(() => import('@/pages/coming-soon'))
export const HomePage = loadable(() => import('@/pages/home'))
export const AlurPage = loadable(() => import('@/pages/alur'))
export const ArsipPage = loadable(() => import('@/pages/arsip'))
export const AturanPage = loadable(() => import('@/pages/aturan'))
export const BerandaPage = loadable(() => import('@/pages/beranda'))
export const BeritaPage = loadable(() => import('@/pages/berita'))
export const DaptarPage = loadable(() => import('@/pages/daptar'))
export const DayaTampungPage = loadable(() => import('@/pages/daya-tampung'))
export const JadwalPage = loadable(() => import('@/pages/jadwal'))
export const LokasiPage = loadable(() => import('@/pages/lokasi'))
export const NUNPage = loadable(() => import('@/pages/nun'))
export const PesanPage = loadable(() => import('@/pages/pesan'))
export const SeleksiPage = loadable(() => import('@/pages/seleksi'))
export const SMSPage = loadable(() => import('@/pages/sms'))
export const StatistikPage = loadable(() => import('@/pages/statistik'))
