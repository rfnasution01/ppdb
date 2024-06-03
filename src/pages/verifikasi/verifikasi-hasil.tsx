import { enumVerifikasi } from '@/libs/enum/enum-verifikasi'
import { HasilPendaftaran } from './cetak-hasil'
import { ProfilData } from '@/libs/types/pendaftaran-type'

export function VerifikasiHasil({
  status,
  jenjang,
  sekolah,
  profil,
}: {
  status: number
  jenjang: string
  sekolah: string
  profil: ProfilData
}) {
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
        Status Verifikasi
      </div>
      {status < enumVerifikasi.DISETUJUI ? (
        <div className="bg-white p-32">
          <div className="text-oranges-700 flex w-full items-center justify-center gap-32 rounded-2xl bg-orange-300 p-32">
            <p>Menunggu persetujuan dari admin</p>
          </div>
        </div>
      ) : status === enumVerifikasi.DISETUJUI ? (
        <div className="bg-white p-32">
          <div className="flex w-full items-center justify-center gap-32 rounded-2xl bg-emerald-300 p-32 text-emerald-700">
            <p>
              Selamat data anda{' '}
              <span className=" text-center font-bold uppercase">
                telah di verifikasi
              </span>{' '}
              oleh {sekolah}
            </p>
            {status === enumVerifikasi?.DISETUJUI && (
              <HasilPendaftaran jenjang={jenjang} profil={profil} />
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white p-32">
          <div className="flex w-full items-center justify-center gap-32 rounded-2xl bg-rose-300 p-32 text-rose-700">
            <p>
              Maaf verifikasi data anda{' '}
              <span className=" text-center font-bold uppercase">
                telah di tolak
              </span>{' '}
              oleh {sekolah}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
