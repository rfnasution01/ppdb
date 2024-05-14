import { AlurContent, AlurHeader } from '@/features/alur'
import { AlurType } from '@/libs/types'
import { getJenjangSlice } from '@/store/reducer/stateJenjang'
import { useGetAlurQuery } from '@/store/slices/alurAPI'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function Alur() {
  const searchParams = new URLSearchParams(location.search)
  const jenjangParams = searchParams.get('jenjang')
  const kodeParams = searchParams.get('kode') ?? 'zn'
  const stateJenjang = useSelector(getJenjangSlice)?.tingkatan

  useEffect(() => {
    if (stateJenjang) {
      setJenjang(stateJenjang)
    }
  }, [stateJenjang])

  const [jenjang, setJenjang] = useState<string>(
    jenjangParams ?? stateJenjang ?? 'sd',
  )

  // --- Alur ---
  const [alur, setAlur] = useState<AlurType>()
  const {
    data: getAlur,
    isLoading: isLoadingAlur,
    isFetching: isFetchingAlur,
  } = useGetAlurQuery({ jenjang: jenjang, jalur: kodeParams })

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
