import { BerandaContent, BerandaHeader } from '@/features/beranda'
import { JalurMasukType, SekilasType } from '@/libs/types'
import { getJalurSlice } from '@/store/reducer/stateJalur'
import { getJenjangSlice } from '@/store/reducer/stateJenjang'
import { useGetJalurMasukQuery } from '@/store/slices/jalurAPI'
import { useGetSekilasQuery } from '@/store/slices/sekilasAPI'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function Beranda() {
  const searchParams = new URLSearchParams(location.search)
  const jenjangParams = searchParams.get('jenjang')
  const kodeParams = searchParams.get('kode') ?? 'zn'
  const stateJenjang = useSelector(getJenjangSlice)?.tingkatan
  const stateKode = useSelector(getJalurSlice)?.kode

  useEffect(() => {
    if (stateJenjang) {
      setJenjang(stateJenjang)
    }
  }, [stateJenjang])

  useEffect(() => {
    if (stateKode) {
      setKode(stateKode)
    }
  }, [stateKode])

  const [jenjang, setJenjang] = useState<string>(
    jenjangParams ?? stateJenjang ?? 'sd',
  )

  const [kode, setKode] = useState<string>(kodeParams ?? stateKode ?? 'sd')

  const showJenjang = jenjang?.toLowerCase() === 'sd' ? 'SD' : 'SMP'

  // --- Beranda ---
  const [sekilas, setSekilas] = useState<SekilasType>()
  const {
    data: getSekilas,
    isLoading: isLoadingSekilas,
    isFetching: isFetchingSekilas,
  } = useGetSekilasQuery({ jenjang: jenjang, jalur: kode })

  const isLoading = isFetchingSekilas || isLoadingSekilas

  useEffect(() => {
    if (getSekilas?.data) {
      setSekilas(getSekilas?.data)
    }
  }, [getSekilas?.data])

  // --- Jalur Masuk ---
  const [jalurMasuk, setJalurMasuk] = useState<JalurMasukType[]>([])
  const { data: getJalurMasuk } = useGetJalurMasukQuery({ jenjang: jenjang })

  useEffect(() => {
    if (getJalurMasuk?.data) {
      setJalurMasuk(getJalurMasuk?.data)
    }
  }, [getJalurMasuk?.data])

  const kodeSekarang = jalurMasuk.find(
    (item) => item?.kode.toLowerCase() === kode,
  )?.nama

  return (
    <div className="flex w-full flex-col gap-32">
      <BerandaHeader
        showJenjang={showJenjang}
        getSekilas={sekilas}
        isLoading={isLoading}
        kode={kodeSekarang}
      />
      <BerandaContent
        showJenjang={showJenjang}
        getSekilas={sekilas}
        isLoading={isLoading}
      />
    </div>
  )
}
