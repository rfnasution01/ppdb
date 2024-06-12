import { useEffect, useState } from 'react'
import { PengumumanHasil } from './pengumuman-hasil'
import { PengumumanRegistrasiUlang } from './registrasi-ulang'
import { HasilType } from '@/libs/types/seleksi-type'
import { useGetHasilQuery } from '@/store/slices/hasilAPI'
import { GelombangType } from '@/libs/types'
import { useGetGelombangQuery } from '@/store/slices/gelombangAPI'
import Cookies from 'js-cookie'

export default function Pengumuman() {
  const jenjang = Cookies.get('jenjang')

  // --- Hasil ---
  const [hasil, setHasil] = useState<HasilType>()
  const { data: getHasil } = useGetHasilQuery()

  useEffect(() => {
    if (getHasil?.data) {
      setHasil(getHasil?.data)
    }
  }, [getHasil?.data])

  const status = Number(hasil?.status)

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
    <div className="flex h-full w-full flex-col gap-32">
      {/* --- Header --- */}
      <div className="flex items-center justify-between gap-32">
        <p className="text-[3.2rem] font-bold phones:text-[3.6rem]">
          Pengumuman
        </p>
      </div>
      <PengumumanHasil
        status={status}
        sekolah={hasil?.sekolah}
        gelombang={gelombang}
      />
      {status === 1 && (
        <PengumumanRegistrasiUlang
          sekolah={hasil?.sekolah}
          batas_daftar_ulang={gelombang?.[0]?.batas_daftar_ulang}
          tgl_pengumuman={gelombang?.[0]?.tgl_pengumuman}
        />
      )}
    </div>
  )
}
