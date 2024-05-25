import { DayaTampungContent, DayaTampungHeader } from '@/features/daya-tampung'
import { DayaTampungType } from '@/libs/types'
import { getJalurSlice } from '@/store/reducer/stateJalur'
import { getJenjangSlice } from '@/store/reducer/stateJenjang'
import { useGetDayaTampungQuery } from '@/store/slices/dayaTampungAPI'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function DayaTampung() {
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

  console.log(showJenjang)

  // --- DayaTampung ---
  const [dayaTampung, setDayaTampung] = useState<DayaTampungType>()
  const {
    data: getDayaTampung,
    isLoading: isLoadingDayaTampung,
    isFetching: isFetchingDayaTampung,
  } = useGetDayaTampungQuery({ jenjang: jenjang, jalur: kode })

  const isLoading = isFetchingDayaTampung || isLoadingDayaTampung

  useEffect(() => {
    if (getDayaTampung?.data) {
      setDayaTampung(getDayaTampung?.data)
    }
  }, [getDayaTampung?.data])

  return (
    <div className="flex h-full w-full flex-col gap-32">
      <DayaTampungHeader getDayaTampung={dayaTampung} isLoading={isLoading} />
      <DayaTampungContent
        getDayaTampung={dayaTampung}
        isLoading={isLoading}
        jenjang={jenjangParams}
        kode={kode}
      />
    </div>
  )
}
