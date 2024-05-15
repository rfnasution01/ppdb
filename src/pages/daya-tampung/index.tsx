import { DayaTampungContent, DayaTampungHeader } from '@/features/daya-tampung'
import { DayaTampungType } from '@/libs/types'
import { getJenjangSlice } from '@/store/reducer/stateJenjang'
import { useGetDayaTampungQuery } from '@/store/slices/dayaTampungAPI'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function DayaTampung() {
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

  const showJenjang = jenjang?.toLowerCase() === 'sd' ? 'SD' : 'SMP'

  console.log(showJenjang)

  // --- DayaTampung ---
  const [dayaTampung, setDayaTampung] = useState<DayaTampungType>()
  const {
    data: getDayaTampung,
    isLoading: isLoadingDayaTampung,
    isFetching: isFetchingDayaTampung,
  } = useGetDayaTampungQuery({ jenjang: jenjang, jalur: kodeParams })

  const isLoading = isFetchingDayaTampung || isLoadingDayaTampung

  useEffect(() => {
    if (getDayaTampung?.data) {
      setDayaTampung(getDayaTampung?.data)
    }
  }, [getDayaTampung?.data])

  return (
    <div className="flex h-full w-full flex-col gap-32">
      <DayaTampungHeader getDayaTampung={dayaTampung} isLoading={isLoading} />
      <DayaTampungContent getDayaTampung={dayaTampung} isLoading={isLoading} />
    </div>
  )
}
