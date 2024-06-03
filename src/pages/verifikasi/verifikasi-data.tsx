import { ProfilData } from '@/libs/types/pendaftaran-type'
import { DataComponent } from './data-component'
import dayjs from 'dayjs'
import 'dayjs/locale/id'

export function VerifikasiData({ profil }: { profil: ProfilData }) {
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
        Detail Verifikasi
      </div>
      <div className="flex flex-col gap-16 bg-white p-32">
        <DataComponent
          label="Tanggal Verifikasi"
          value={
            profil?.verifikasi?.tanggal_verifikasi
              ? dayjs(profil?.verifikasi?.tanggal_verifikasi)
                  .locale('id')
                  .format('DD MMMM YYYY HH:mm:ss')
              : '-'
          }
        />
        <DataComponent
          label="Petugas Verifikasi"
          value={profil?.verifikasi?.petugas ?? '-'}
        />

        <DataComponent
          label="Komentar"
          value={profil?.verifikasi?.komentar ?? '-'}
        />
      </div>
    </div>
  )
}
