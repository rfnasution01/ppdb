import { LokasiHeader } from '@/features/lokasi'
import LokasiContent from '@/features/lokasi/lokasi-content'
import { LokasiType } from '@/libs/types'
import { getJenjangSlice } from '@/store/reducer/stateJenjang'
import { useGetLokasiQuery } from '@/store/slices/lokasiAPI'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function Lokasi() {
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

  // --- Lokasi ---
  const [lokasi, setLokasi] = useState<LokasiType>()
  const {
    data: getLokasi,
    isLoading: isLoadingLokasi,
    isFetching: isFetchingLokasi,
  } = useGetLokasiQuery({ jenjang: jenjang, jalur: kodeParams })

  const isLoading = isFetchingLokasi || isLoadingLokasi

  useEffect(() => {
    if (getLokasi?.data) {
      setLokasi(getLokasi?.data)
    }
  }, [getLokasi?.data])

  return (
    <div className="flex w-full flex-col gap-32">
      <LokasiHeader getLokasi={lokasi} isLoading={isLoading} />
      <LokasiContent getLokasi={lokasi} isLoading={isLoading} />
    </div>
  )
}
