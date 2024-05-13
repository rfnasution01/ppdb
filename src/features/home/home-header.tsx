import { InstansiData } from '@/libs/types'
import { useGetIdentitasQuery } from '@/store/slices/identitasAPI'
import { useEffect, useState } from 'react'

export function HomeHeader() {
  const [identitas, setIdentitas] = useState<InstansiData>()
  const {
    data: getIdentitas,
    isFetching: isFetchingIdentitas,
    isLoading: isLoadingIdentitas,
  } = useGetIdentitasQuery()

  const isLoading = isFetchingIdentitas || isLoadingIdentitas

  useEffect(() => {
    if (getIdentitas?.data) {
      setIdentitas(getIdentitas?.data)
    }
  }, [getIdentitas?.data])
  return (
    <div className="flex flex-col gap-32 text-center">
      {isLoading ? (
        <div className="h-[5.5rem] w-full animate-pulse rounded-full bg-slate-200 font-roboto text-[3rem] duration-100" />
      ) : (
        <p className="text-[4.8rem] font-medium phones:text-[3.2rem] phones:font-semibold">
          Selamat Datang {identitas?.welcome}
        </p>
      )}
      {/* <p className="block phones:hidden" style={{ lineHeight: '130%' }}>
        Situs DEMO ini dipersiapkan sebagai pengganti pusat informasi dan
        pengolahan seleksi data siswa peserta PPDB Kab. Deli Serdang Periode
        2024 / 2025 secara online real time process untuk pelaksanaan PPDB
        Online. Lihat Peserta PPDB di Kab / Kota lainnya
      </p> */}
      <p className="hidden phones:block">Situs PPDB Periode 2024-2025</p>
    </div>
  )
}
