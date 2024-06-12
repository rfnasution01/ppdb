import dayjs from 'dayjs'
import 'dayjs/locale/id'
import { Link } from 'react-router-dom'

export function PengumumanRegistrasiUlang({
  sekolah,
  batas_daftar_ulang,
  tgl_pengumuman,
}: {
  sekolah: string
  batas_daftar_ulang: string
  tgl_pengumuman: string
}) {
  // Hitung tanggal registrasi ulang
  const tgl_registrasi_mulai = dayjs(tgl_pengumuman)
    .add(1, 'day')
    .locale('id')
    .format('DD MMMM') // Format tanggal dalam bentuk tanggal dan bulan
  const tgl_registrasi_selesai = dayjs(batas_daftar_ulang)
    .locale('id')
    .format('DD MMMM') // Format tanggal dalam bentuk tanggal dan bulan

  // Hitung jam registrasi ulang
  const jam_registrasi_selesai = dayjs(batas_daftar_ulang)
    .locale('id')
    .format('HH:mm')

  // Gabungkan tanggal dan jam registrasi ulang dalam satu string
  const periode_registrasi = `${tgl_registrasi_mulai} - ${tgl_registrasi_selesai} Mulai Pukul 08:00 - ${jam_registrasi_selesai}`

  return (
    <div
      className="flex flex-col shadow"
      style={{
        borderBottomLeftRadius: '1rem',
        borderBottomRightRadius: '1rem',
      }}
    >
      <div
        className="bg-[#242a30] p-32 text-white"
        style={{ borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}
      >
        Registrasi Ulang
      </div>
      <div className="flex flex-col gap-24 bg-white p-32">
        <div className="flex w-full items-center justify-center gap-32 rounded-2xl bg-[#ff5b57] p-32 text-danger-tint-1">
          <p>
            Batas Registrasi Ulang tanggal{' '}
            {dayjs(batas_daftar_ulang).locale('id').format('DD/MM/YYYY HH:mm')}
          </p>
        </div>
        <ol className="ml-32 list-decimal">
          <li>
            Silahkan download Surat Kerangan Lulus pada laman{' '}
            <Link
              to={'https://ppdbonline-batubara.com/'}
              target="_blank"
              className="italic hover:text-primary"
            >
              https://ppdbonline-batubara.com/
            </Link>
          </li>
          <li>
            Silahkan daftar ulang ke sekolah tempat diterima / lulus pada
            tanggal {periode_registrasi}. Calon peserta didik yang tidak daftar
            ulang, dinyatakan <span className="font-bold uppercase">gugur</span>{' '}
            dan tidak di ijinkan mengikuti seleksi PPDB Gelombang ke 2.
          </li>
          <li>
            Apabila tidak registrasi ulang pada waktu yang sudah ditentukan,
            maka kelulusan anda di {sekolah} di{' '}
            <span className="font-bold uppercase">Batalkan</span>
          </li>
        </ol>
      </div>
    </div>
  )
}
