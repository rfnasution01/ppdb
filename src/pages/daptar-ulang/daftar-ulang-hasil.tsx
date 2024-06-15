import { DashboardType } from '@/libs/types/dashboard-type'
import dayjs from 'dayjs'
import 'dayjs/locale/id'

export function DaftarUlangHasil({ profil }: { profil: DashboardType }) {
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
        Status Daftar Ulang
      </div>
      {profil?.status_pendaftaran?.registrasi_ulang === 1 ? (
        <div className="bg-white p-32">
          <div className="flex w-full items-center justify-center gap-32 rounded-2xl bg-emerald-300 p-32 text-emerald-700 phones:flex-col phones:items-start">
            <p>
              Terima kasih, anda sudah melakukan{' '}
              <span className=" text-center font-bold uppercase">
                Daftar Ulang
              </span>{' '}
              pada tanggal{' '}
              {profil?.status_pendaftaran?.tanggal_registrasi
                ? dayjs(profil?.status_pendaftaran?.tanggal_registrasi)
                    .locale('id')
                    .format('DD MMMM YYYY HH:mm:ss')
                : '-'}
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-white p-32">
          <div className="flex w-full items-center justify-center gap-32 rounded-2xl bg-rose-300 p-32 text-rose-700">
            <p>
              Anda{' '}
              <span className=" text-center font-bold uppercase">belum</span>{' '}
              melakukan daftar ulang
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
