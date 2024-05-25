import { AlurContent, AlurHeader } from '@/features/alur'
import { AlurType } from '@/libs/types'
import { getJalurSlice } from '@/store/reducer/stateJalur'
import { getJenjangSlice } from '@/store/reducer/stateJenjang'
import { useGetAlurQuery } from '@/store/slices/alurAPI'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function Alur() {
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

  // --- Alur ---
  const [alur, setAlur] = useState<AlurType>()
  const {
    data: getAlur,
    isLoading: isLoadingAlur,
    isFetching: isFetchingAlur,
  } = useGetAlurQuery({ jenjang: jenjang, jalur: kode })

  const isLoading = isFetchingAlur || isLoadingAlur

  useEffect(() => {
    if (getAlur?.data) {
      setAlur(getAlur?.data)
    }
  }, [getAlur?.data])

  return (
    <div className="flex w-full flex-col gap-32">
      <AlurHeader getAlur={alur} isLoading={isLoading} />
      <AlurContent getAlur={alur} isLoading={isLoading} />
    </div>
  )
}
