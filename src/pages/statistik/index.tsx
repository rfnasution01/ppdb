import { StatistikContent, StatistikHeader } from '@/features/statistik'
import { HeaderType, PendaftarStatistik, StatistikType } from '@/libs/types'
import { getJalurSlice } from '@/store/reducer/stateJalur'
import { getJenjangSlice } from '@/store/reducer/stateJenjang'
import { useGetStatistikQuery } from '@/store/slices/statistikAPI'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function Statistik() {
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

  // --- Statistik ---
  const [statistik, setStatistik] = useState<StatistikType>()
  const [pendaftar, setPendaftar] = useState<PendaftarStatistik[]>([])
  const [headerPendaftar, setHeaderPendaftar] = useState<HeaderType>()

  const {
    data: getStatistik,
    isLoading: isLoadingStatistik,
    isFetching: isFetchingStatistik,
  } = useGetStatistikQuery({ jenjang: jenjang, jalur: kode })

  const isLoading = isFetchingStatistik || isLoadingStatistik

  useEffect(() => {
    if (getStatistik) {
      setStatistik(getStatistik?.data)
      setPendaftar(getStatistik?.statistik)
      setHeaderPendaftar(getStatistik?.header)
    }
  }, [getStatistik])

  return (
    <div className="flex h-full w-full flex-col gap-32">
      <StatistikHeader
        showJenjang={showJenjang}
        getStatistik={statistik}
        isLoading={isLoading}
      />
      <StatistikContent
        showJenjang={showJenjang}
        pendaftar={pendaftar}
        header={headerPendaftar}
        isLoading={isLoading}
        kodeParams={kode}
        getStatistik={statistik}
      />
    </div>
  )
}
