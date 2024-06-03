import { enumValidasi } from '@/libs/enum/enum-validasi'
import { ProfilData } from '@/libs/types/pendaftaran-type'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import { DataComponent } from '../verifikasi/data-component'

export function ValidasiData({ profil }: { profil: ProfilData }) {
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
        Detail Validasi
      </div>
      <div className="flex flex-col gap-16 bg-white p-32">
        <DataComponent
          label="Tanggal Pendaftaran"
          value={
            profil?.validasi?.tanggal_daftar
              ? dayjs(profil?.validasi?.tanggal_daftar)
                  .locale('id')
                  .format('DD MMMM YYYY HH:mm:ss')
              : '-'
          }
        />
        <DataComponent
          label="Tanggal Verifikasi"
          value={
            profil?.validasi?.status
              ? dayjs(profil?.validasi?.tanggal_validasi)
                  .locale('id')
                  .format('DD MMMM YYYY HH:mm:ss')
              : '-'
          }
        />

        <DataComponent
          label="Status"
          value={
            profil?.validasi?.status === enumValidasi.SUDAHVALIDASI
              ? 'Sudah Validasi'
              : 'Belum Validasi' ?? '-'
          }
        />
      </div>
    </div>
  )
}
