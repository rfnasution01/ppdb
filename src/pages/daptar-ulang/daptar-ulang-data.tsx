import dayjs from 'dayjs'
import 'dayjs/locale/id'
import { DataComponent } from '../verifikasi/data-component'
import { DashboardType } from '@/libs/types/dashboard-type'

export function DaftarUlangData({ profil }: { profil: DashboardType }) {
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
        Detail Daftar Ulang
      </div>
      <div className="flex flex-col gap-16 bg-white p-32">
        <DataComponent
          label="Tanggal Daftar Ulang"
          value={
            profil?.status_pendaftaran?.tanggal_registrasi
              ? dayjs(profil?.status_pendaftaran?.tanggal_registrasi)
                  .locale('id')
                  .format('DD MMMM YYYY HH:mm:ss')
              : '-'
          }
        />
        <DataComponent
          label="User Registrasi"
          value={profil?.status_pendaftaran?.user_registrasi ?? '-'}
        />

        <DataComponent
          label="Status"
          value={
            profil?.status_pendaftaran?.registrasi_ulang === 1
              ? 'Sudah Registrasi Ulang'
              : 'Belum Registrasi Ulang'
          }
        />
      </div>
    </div>
  )
}
