import { JadwalContent, JadwalHeader } from '@/features/jadwal'
import { JadwalType } from '@/libs/types'
import { getJalurSlice } from '@/store/reducer/stateJalur'
import { getJenjangSlice } from '@/store/reducer/stateJenjang'
import { useGetJadwalQuery } from '@/store/slices/jadwalAPI'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function Jadwal() {
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

  // --- Jadwal ---
  const [jadwal, setJadwal] = useState<JadwalType>()
  const {
    data: getJadwal,
    isLoading: isLoadingJadwal,
    isFetching: isFetchingJadwal,
  } = useGetJadwalQuery({ jenjang: jenjang, jalur: kode })

  const isLoading = isFetchingJadwal || isLoadingJadwal

  useEffect(() => {
    if (getJadwal?.data) {
      setJadwal(getJadwal?.data)
    }
  }, [getJadwal?.data])

  return (
    <div className="flex w-full flex-col gap-32">
      <JadwalHeader getJadwal={jadwal} isLoading={isLoading} />
      <JadwalContent getJadwal={jadwal} isLoading={isLoading} />
    </div>
  )
}
