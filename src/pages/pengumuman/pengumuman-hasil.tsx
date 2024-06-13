import dayjs from 'dayjs'
import 'dayjs/locale/id'
import { PrintHasil } from './cetak-hasil'
import { LulusType } from '@/libs/types/seleksi-type'

export function PengumumanHasil({
  status,
  sekolah,
  pengumuman,
  lulus,
}: {
  status: number
  sekolah: string
  pengumuman: string
  lulus: LulusType
}) {
  // Hitung tanggal registrasi ulang
  const tgl_registrasi_mulai = dayjs(pengumuman)
    .add(1, 'day')
    .locale('id')
    .format('DD MMMM') // Format tanggal dalam bentuk tanggal dan bulan
  const tgl_registrasi_selesai = dayjs(lulus?.batas_registrasi_ulang)
    .locale('id')
    .format('DD MMMM') // Format tanggal dalam bentuk tanggal dan bulan

  // Hitung jam registrasi ulang
  const jam_registrasi_selesai = dayjs(lulus?.batas_registrasi_ulang)
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
        Pengumuman
      </div>
      {status === 1 ? (
        <div className="bg-white p-32">
          <div className="flex w-full items-center justify-center gap-32 rounded-2xl bg-emerald-300 p-32 text-emerald-700">
            <p>
              Selamat Anda{' '}
              <span className=" text-center font-bold uppercase">lulus</span> di{' '}
              {sekolah}
            </p>
            <PrintHasil
              sekolah={lulus?.nama_sekolah}
              alamat={lulus?.alamat_sekolah}
              noSurat={lulus?.nomor}
              nama={lulus?.nama}
              tempat_lahir={lulus?.tempat_lahir}
              tanggal_lahir={dayjs(lulus?.tanggal_lahir)
                .locale('id')
                .format('DD MMMM YYYY')}
              noPendaftaran={lulus?.nomor_pendaftaran}
              nisn={lulus?.nisn}
              tgl_daftarUlang={periode_registrasi}
              kepsek={lulus?.nama_kepsek}
              kadis={lulus?.nama_kadis}
              nip_kadis={lulus?.nip_kadis}
              nip_kepsek={lulus?.nip_kepsek}
              diterbitkan_di={lulus?.tempat}
              diterbitkan_tgl={dayjs(lulus?.tanggal)
                .locale('id')
                .format('DD MMMM YYYY')}
            />
          </div>
        </div>
      ) : status === 0 ? (
        <div className="bg-white p-32">
          <div className="flex w-full items-center justify-center gap-32 rounded-2xl bg-rose-300 p-32 text-rose-700">
            <p>
              Maaf anda dinyatakan{' '}
              <span className=" text-center font-bold uppercase">
                tidak lulus
              </span>{' '}
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-white p-32">
          <div className="text-oranges-700 flex w-full items-center justify-center gap-32 rounded-2xl bg-orange-300 p-32">
            <p>
              Tanggal pengumuman kelulusan{' '}
              {dayjs(pengumuman).locale('id').format('DD MMMM YYYY HH:mm:ss')}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
