import { CircleHelp } from 'lucide-react'
import { Link } from 'react-router-dom'

export function BerandaContent({ showJenjang }: { showJenjang: string }) {
  return (
    <div
      className="flex flex-col gap-24 rounded-lg border bg-white p-32 shadow-md"
      style={{ lineHeight: '130%' }}
    >
      {/* --- Title --- */}
      <div className="font-nunito">
        Bagi masyarakat dan calon siswa dapat memanfaatkan fasilitas{' '}
        <Link
          to={`/pesan-anda?jenjang=${showJenjang.toLowerCase()}`}
          className="text-primary-background hover:cursor-pointer"
        >
          Pesan Anda
        </Link>{' '}
        di situs ini untuk bantuan informasi lebih lanjut. Bagi anda calon
        peserta, harap membaca Aturan dan{' '}
        <Link
          to={`/alur?jenjang=${showJenjang.toLowerCase()}`}
          className="text-primary-background hover:cursor-pointer"
        >
          Prosedur pendaftaran
        </Link>{' '}
        dengan seksama sebelum melakukan proses pendaftaran. Demikian informasi
        ini dan terima kasih atas perhatian dan kerjasamanya.
      </div>
      {/* --- Alur --- */}
      <div className="grid grid-cols-12 gap-32">
        <Link
          to=""
          className="bg-warning-tint-2 col-span-4 flex flex-col gap-y-12 rounded-lg border border-warning-tint-1 p-32 shadow-md hover:cursor-pointer hover:shadow-lg phones:col-span-12"
        >
          <p className="text-[2.8rem] font-bold">Mengisi Formulir</p>
          <p>Mengisi Formulir di Sekolah Tujuan</p>
        </Link>
        <Link
          to=""
          className="bg-warning-tint-2 col-span-4 flex flex-col gap-y-12 rounded-lg border border-warning-tint-1 p-32 shadow-md hover:cursor-pointer hover:shadow-lg phones:col-span-12"
        >
          <p className="text-[2.8rem] font-bold">Input Pendaftaran</p>
          <p>Input Pendaftaran Oleh Operator PPDB Sekolah</p>
        </Link>
        <Link
          to="/seleksi"
          className="bg-warning-tint-2 col-span-4 flex flex-col gap-y-12 rounded-lg border border-warning-tint-1 p-32 shadow-md hover:cursor-pointer hover:shadow-lg phones:col-span-12"
        >
          <p className="text-[2.8rem] font-bold">Memantau Hasil Seleksi</p>
          <p>Memantau Hasil Seleksi Siswa Memantau Hasil Seleksi</p>
        </Link>
      </div>
      {/* --- Ask --- */}
      <div className="flex flex-col gap-y-8 font-helvetica text-primary-900">
        {[
          'Mendaftar sebagai Peserta?',
          'Bagaimana Cara dan Aturan Pendaftaran?',
          'Saya harus kemana dulu?',
          'Sampai kapan daftarnya?',
          'Lihat Lokasi Sekolah?',
          'Lihat Daya tampung Sekolah?',
          'Lihat Statistik hasil?',
        ].map((item, idx) => (
          <Link
            to=""
            className="flex gap-8 hover:text-primary-background"
            key={idx}
          >
            <CircleHelp size={16} />
            {item}
          </Link>
        ))}
      </div>
    </div>
  )
}
