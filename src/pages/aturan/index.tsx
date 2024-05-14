import { AturanContent, AturanHeader } from '@/features/aturan'
import { AturanType, JalurMasukType } from '@/libs/types'
import { getJenjangSlice } from '@/store/reducer/stateJenjang'
import { useGetAturanQuery } from '@/store/slices/aturanAPI'
import { useGetJalurMasukQuery } from '@/store/slices/jalurAPI'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function Aturan() {
  const searchParams = new URLSearchParams(location.search)
  const jenjangParams = searchParams.get('jenjang')
  const kodeParams = searchParams.get('kode')
  const stateJenjang = useSelector(getJenjangSlice)?.tingkatan

  useEffect(() => {
    if (stateJenjang) {
      setJenjang(stateJenjang)
    }
  }, [stateJenjang])

  const [jenjang, setJenjang] = useState<string>(
    jenjangParams ?? stateJenjang ?? 'sd',
  )

  const showJenjang = jenjang?.toLowerCase() === 'sd' ? 'SD' : 'SMP'

  console.log(showJenjang)

  // --- Beranda ---
  const [aturan, setAturan] = useState<AturanType>()
  const {
    data: getAturan,
    isLoading: isLoadingAturan,
    isFetching: isFetchingAturan,
  } = useGetAturanQuery({ jenjang: jenjang, jalur: kodeParams })

  const isLoading = isFetchingAturan || isLoadingAturan

  useEffect(() => {
    if (getAturan?.data) {
      setAturan(getAturan?.data)
    }
  }, [getAturan?.data])

  // --- Jalur Masuk ---
  const [jalurMasuk, setJalurMasuk] = useState<JalurMasukType[]>([])
  const { data: getJalurMasuk } = useGetJalurMasukQuery({ jenjang: jenjang })

  useEffect(() => {
    if (getJalurMasuk?.data) {
      setJalurMasuk(getJalurMasuk?.data)
    }
  }, [getJalurMasuk?.data])

  const kodeSekarang = jalurMasuk.find(
    (item) => item?.kode.toLowerCase() === kodeParams,
  )?.nama

  console.log(kodeSekarang)

  return (
    <div className="flex w-full flex-col gap-32">
      <AturanHeader getAturan={aturan} isLoading={isLoading} />
      <AturanContent getAturan={aturan} isLoading={isLoading} />
    </div>
  )
}
