import { StatistikHeader } from '@/features/statistik'
import { StatistikType } from '@/libs/types'
import { getJenjangSlice } from '@/store/reducer/stateJenjang'
import { useGetStatistikQuery } from '@/store/slices/statistikAPI'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function Statistik() {
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

  // --- Statistik ---
  const [statistik, setStatistik] = useState<StatistikType>()
  const {
    data: getStatistik,
    isLoading: isLoadingStatistik,
    isFetching: isFetchingStatistik,
  } = useGetStatistikQuery({ jenjang: jenjang, jalur: kodeParams })

  const isLoading = isFetchingStatistik || isLoadingStatistik

  useEffect(() => {
    if (getStatistik?.data) {
      setStatistik(getStatistik?.data)
    }
  }, [getStatistik?.data])

  return (
    <div className="flex h-full w-full flex-col gap-32">
      <StatistikHeader
        showJenjang={showJenjang}
        getStatistik={statistik}
        isLoading={isLoading}
      />
      {/* <StatistikContent />  */}
    </div>
  )
}
