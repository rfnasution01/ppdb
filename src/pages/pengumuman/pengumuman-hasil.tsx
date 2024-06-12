import { GelombangType } from '@/libs/types'
import { useGetGelombangQuery } from '@/store/slices/gelombangAPI'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { PrintHasil } from './cetak-hasil'

export function PengumumanHasil({ status }: { status: number }) {
  const jenjang = Cookies.get('jenjang')
  // --- Gelombang ---
  const [gelombang, setGekombang] = useState<GelombangType[]>([])
  const { data: getGelombang } = useGetGelombangQuery({
    jenjang: jenjang.toLowerCase(),
  })

  useEffect(() => {
    if (getGelombang?.data) {
      setGekombang(getGelombang?.data)
    }
  }, [getGelombang?.data])
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
              <span className=" text-center font-bold uppercase">lulus</span> di
              UPT. SMP Negeri 1 AIR PUTIH
            </p>
            <PrintHasil
              sekolah="UPTD. SMP Negeri 1 Kampung Rakyat"
              alamat="Kampung Rakyat"
              noSurat="420/0124/PPDB-BATUBARA"
              nama="John Doe"
              tempat_lahir="Batubara"
              tanggal_lahir="16 Juni 2012"
              noPendaftaran="01231414"
              nisn="9012310"
              tgl_daftarUlang="17-28 Juni 2023 Pukul: 08:00 - 16:00"
              kepsek="John Doe"
              kadis="John Doe"
              nip_kadis="098908403"
              nip_kepsek="990894089"
              diterbitkan_di="Batu Bara"
              diterbitkan_tgl="19 Juni 2024"
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
              di UPT. SMP Negeri 1 AIR PUTIH
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-white p-32">
          <div className="text-oranges-700 flex w-full items-center justify-center gap-32 rounded-2xl bg-orange-300 p-32">
            <p>
              Tanggal pengumuman kelulusan{' '}
              {dayjs(gelombang?.[0]?.tgl_pengumuman)
                .locale('id')
                .format('DD MMMM YYYY HH:mm:ss')}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
