import { enumVerifikasi } from '@/libs/enum/enum-verifikasi'
import { ProfilData } from '@/libs/types/pendaftaran-type'
import { DataComponent } from './data-component'

export function VerifikasiContent({ profil }: { profil: ProfilData }) {
  return (
    <div className="flex flex-col gap-12">
      <p>
        {profil?.verifikasi?.status === enumVerifikasi.DISETUJUI
          ? 'Data anda telah di verifikasi'
          : profil?.verifikasi?.status === enumVerifikasi.DITOLAK
            ? 'Verifikasi data anda ditolak'
            : 'Menunggu Persetujuan'}
      </p>
      <div className="flex w-1/2 flex-col gap-8 rounded-lg border p-16 phones:w-full">
        <DataComponent
          value={profil?.verifikasi?.tanggal_verifikasi}
          label="Tanggal Verifikasi"
        />
        <DataComponent
          value={profil?.verifikasi?.sekolah_verifikasi}
          label="Verifikasi Sekolah"
        />
        <DataComponent
          value={profil?.verifikasi?.petugas}
          label="Petugas Verifikasi"
        />
        <DataComponent value={profil?.verifikasi?.komentar} label="Komentar" />
      </div>
    </div>
  )
}
