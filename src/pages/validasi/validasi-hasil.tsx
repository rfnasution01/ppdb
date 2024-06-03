import { BuktiPendaftaran } from '@/features/profil/cetak-bukti'
import { enumValidasi } from '@/libs/enum/enum-validasi'
import { ProfilData } from '@/libs/types/pendaftaran-type'
import dayjs from 'dayjs'
import 'dayjs/locale/id'

export function ValidasiHasil({
  profil,
  jenjang,
}: {
  profil: ProfilData
  jenjang: string
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
        Status Validasi
      </div>
      {profil?.validasi?.status === enumValidasi.SUDAHVALIDASI ? (
        <div className="bg-white p-32">
          <div className="flex w-full items-center justify-center gap-32 rounded-2xl bg-emerald-300 p-32 text-emerald-700 phones:flex-col phones:items-start">
            <p>
              Terima kasih, anda sudah melakukan{' '}
              <span className=" text-center font-bold uppercase">validasi</span>{' '}
              data pendaftaran anda pada tanggal{' '}
              {dayjs(profil?.validasi?.tanggal_validasi)
                .locale('id')
                .format('DD MMMM YYYY HH:mm:ss')}
            </p>
            {profil?.validasi?.status === enumValidasi.SUDAHVALIDASI && (
              <BuktiPendaftaran jenjang={jenjang} profil={profil} />
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white p-32">
          <div className="flex w-full items-center justify-center gap-32 rounded-2xl bg-rose-300 p-32 text-rose-700">
            <p>
              Anda{' '}
              <span className=" text-center font-bold uppercase">
                belum memvalidasi
              </span>{' '}
              data anda
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
