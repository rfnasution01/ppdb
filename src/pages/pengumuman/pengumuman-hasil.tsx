import { GelombangType } from '@/libs/types'
import { useGetGelombangQuery } from '@/store/slices/gelombangAPI'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import Cookies from 'js-cookie'
import { Printer } from 'lucide-react'
import { useEffect, useState } from 'react'

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
            <div className="flex items-center gap-8 text-emerald-950">
              <Printer size={16} />
              Cetak Keterangan Lulus
            </div>
          </div>
        </div>
      ) : status === 2 ? (
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
