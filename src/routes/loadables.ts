import loadable from '@loadable/component'

// ------------------
// ----- Layouts -----
// ------------------

export const RootLayout = loadable(() => import('@/layouts/root-layout'))
export const AppLayout = loadable(() => import('@/layouts/app-layout'))
export const UserLayout = loadable(() => import('@/layouts/user-layout'))
export const MainLayout = loadable(() => import('@/layouts/main-layout'))

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
export const LoginPage = loadable(() => import('@/pages/login'))
export const BiodataPage = loadable(() => import('@/pages/biodata'))
export const PendaftaranPage = loadable(() => import('@/pages/pendaftaran'))
export const ProfilPage = loadable(() => import('@/pages/profil'))
export const DaptarAkunPage = loadable(() => import('@/pages/daptar-akun'))
export const VerifikasiPage = loadable(() => import('@/pages/verifikasi'))
export const ValidasiPage = loadable(() => import('@/pages/validasi'))
export const KotakMasukPage = loadable(() => import('@/pages/kotak-masuk'))
export const GelombangPage = loadable(() => import('@/pages/gelombang'))
export const HubungiKamiPage = loadable(() => import('@/pages/hubungi-kami'))
