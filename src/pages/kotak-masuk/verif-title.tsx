import { enumVerifikasi } from '@/libs/enum/enum-verifikasi'
import { ProfilData } from '@/libs/types/pendaftaran-type'
import dayjs from 'dayjs'
import { MailOpen } from 'lucide-react'

export function VerifikasiTitle({ profil }: { profil: ProfilData }) {
  return (
    <div className="flex items-center justify-between rounded-lg border-l-4 border-rose-300 bg-white p-32 shadow hover:cursor-pointer hover:shadow-md">
      <div className="flex items-center gap-12">
        <MailOpen size={16} />
        {profil?.verifikasi?.status === enumVerifikasi.DISETUJUI
          ? 'Verifikasi data anda diterima'
          : profil?.verifikasi?.status === enumVerifikasi.DITOLAK
            ? 'Verifikasi data anda ditolak'
            : 'Menunggu Persetujuan'}
      </div>
      <p className="text-[2.4rem]">
        {dayjs(profil?.verifikasi?.tanggal_verifikasi)
          .locale('id')
          .format('DD MMMM YYYY hh:mm:ss')}
      </p>
    </div>
  )
}
